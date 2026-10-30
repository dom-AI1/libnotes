import { useState, useEffect, useCallback } from 'react';
import type { StudyKit, NoteStyle } from './types';
import { SAMPLE_STUDY_KITS } from './data/mockData';
import { loadSavedKits, saveKitsToStorage } from './services/storageService';
import { fetchStudyKitsFromSupabase, syncStudyKitToSupabase } from './services/supabaseService';
import { 
  getCurrentUserProfile, 
  onAuthStateChange, 
  signOutUser, 
  syncUserProfile, 
  markWelcomeAsSeen, 
  isFirstTimeUser,
  getCurrentSession,
  type UserProfile 
} from './services/authService';
import { supabase } from './services/supabaseClient';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { HowItWorks } from './components/HowItWorks';
import { ProductPreview } from './components/ProductPreview';
import { FinalCTA } from './components/FinalCTA';
import { UploadModal } from './components/UploadModal';
import { NotesView } from './components/NotesView';
import { DashboardView } from './components/DashboardView';
import { SignUpView } from './components/SignUpView';
import { LoginView } from './components/LoginView';
import { ForgotPasswordView } from './components/ForgotPasswordView';
import { ResetPasswordView } from './components/ResetPasswordView';
import { NotFoundView } from './components/NotFoundView';
import { ChatpataWelcomeModal } from './components/ChatpataWelcomeModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';

export type AppView =
  | 'home'
  | 'notes'
  | 'dashboard'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'not-found';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [studyKits, setStudyKits] = useState<StudyKit[]>(() => loadSavedKits());
  const [activeKitId, setActiveKitId] = useState<string>('kit-thermodynamics');
  const [notesActiveTab, setNotesActiveTab] = useState<'full' | 'revision' | 'exam' | 'cards' | 'quiz'>('full');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadInitialLink, setUploadInitialLink] = useState('');
  const [uploadInitialStyle, setUploadInitialStyle] = useState<NoteStyle>('topper');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication state
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Listen to Supabase auth state changes and initial session
  useEffect(() => {
    let mounted = true;
    async function initAuth() {
      try {
        const profile = await getCurrentUserProfile();
        if (mounted) {
          setUser(profile);
          setAuthInitialized(true);
        }
      } catch {
        if (mounted) {
          setAuthInitialized(true);
        }
      }
    }
    initAuth();

    const subscription = onAuthStateChange(async (event, session) => {
      if (mounted) {
        if (session?.user) {
          const profile = await syncUserProfile(session.user);
          setUser(profile);
          // If a new session was initiated via OAuth or confirmation, verify first-time status
          if (event === 'SIGNED_IN') {
            const isFirst = isFirstTimeUser(session.user.id, profile);
            if (isFirst) {
              setIsWelcomeModalOpen(true);
            }
          }
        } else {
          setUser(null);
        }
        setAuthInitialized(true);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Helper to extract sanitized redirect target from URL hash or query params
  const extractSafeRedirect = useCallback((urlHash: string, searchStr: string): string | null => {
    try {
      const search = urlHash.includes('?') ? urlHash.split('?')[1] : searchStr.replace(/^\?/, '');
      const params = new URLSearchParams(search);
      const redirect = params.get('redirect');
      if (!redirect) return null;
      const decoded = decodeURIComponent(redirect);
      // Ensure redirect is internal and relative to prevent open-redirect vulnerabilities
      if (decoded.startsWith('/') && !decoded.startsWith('//') && !decoded.includes('://')) {
        return decoded;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Synchronize router state with window hash & popstate
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash;
      const search = window.location.search;

      // 1. Check for OAuth callback, PKCE code, or access tokens FIRST
      const isOAuthCallback =
        search.includes('code=') ||
        hash.includes('code=') ||
        hash.includes('access_token=') ||
        hash.startsWith('#/auth/callback') ||
        hash.startsWith('#auth/callback');

      if (isOAuthCallback) {
        (async () => {
          try {
            // Give Supabase client a tick to finalize PKCE code exchange if in progress
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              const profile = await syncUserProfile(session.user);
              setUser(profile);
              const isFirst = isFirstTimeUser(session.user.id, profile);
              
              // Clear code/token parameters from search/hash without reload
              const safeRedirect = extractSafeRedirect(hash, search);
              const destination = safeRedirect || '/dashboard';
              
              if (window.location.search) {
                window.history.replaceState(null, '', window.location.pathname + `#${destination}`);
              } else {
                window.location.hash = `#${destination}`;
              }

              if (destination.startsWith('/notes')) {
                const urlParams = new URLSearchParams(destination.split('?')[1] || '');
                const id = urlParams.get('id');
                if (id) setActiveKitId(id);
                setCurrentView('notes');
              } else {
                setCurrentView('dashboard');
              }

              if (isFirst) {
                setIsWelcomeModalOpen(true);
              } else {
                showToast(`Welcome back, ${profile.display_name}!`);
              }
            } else {
              window.location.hash = '#/login';
              setCurrentView('login');
            }
          } catch (err) {
            console.warn('[Libnotes Auth] Callback processing error:', err);
            window.location.hash = '#/login';
            setCurrentView('login');
          }
        })();
        return;
      }

      // 2. Public Home route
      if (!hash || hash === '#' || hash === '#/' || hash === '#/home' || hash === '#home') {
        setCurrentView('home');
      } else if (hash.startsWith('#/login') || hash.startsWith('#login')) {
        if (authInitialized && user) {
          const safeRedirect = extractSafeRedirect(hash, search);
          const target = safeRedirect || '/dashboard';
          window.location.hash = `#${target}`;
          setCurrentView(target.startsWith('/notes') ? 'notes' : 'dashboard');
        } else {
          setCurrentView('login');
        }
      } else if (hash.startsWith('#/signup') || hash.startsWith('#signup')) {
        if (authInitialized && user) {
          const safeRedirect = extractSafeRedirect(hash, search);
          const target = safeRedirect || '/dashboard';
          window.location.hash = `#${target}`;
          setCurrentView(target.startsWith('/notes') ? 'notes' : 'dashboard');
        } else {
          setCurrentView('signup');
        }
      } else if (hash.startsWith('#/forgot-password') || hash.startsWith('#forgot-password')) {
        setCurrentView('forgot-password');
      } else if (hash.startsWith('#/reset-password') || hash.startsWith('#reset-password')) {
        setCurrentView('reset-password');
      } else if (hash.startsWith('#/dashboard') || hash.startsWith('#dashboard')) {
        if (!authInitialized) {
          return;
        }
        if (!user) {
          window.location.hash = '#/signup?redirect=%2Fdashboard';
          setCurrentView('signup');
          showToast('Please sign up or log in to access your dashboard');
        } else {
          setCurrentView('dashboard');
        }
      } else if (hash.startsWith('#/notes') || hash.startsWith('#notes')) {
        if (!authInitialized) {
          return;
        }
        if (!user) {
          const rawHash = hash.replace(/^#\/?/, '');
          window.location.hash = `#/signup?redirect=%2F${encodeURIComponent(rawHash)}`;
          setCurrentView('signup');
          showToast('Please sign up or log in to access study workspace');
          return;
        }
        const urlParams = new URLSearchParams(hash.split('?')[1] || '');
        const id = urlParams.get('id');
        if (id) {
          setActiveKitId(id);
        }
        const tab = urlParams.get('tab') as 'full' | 'revision' | 'exam' | 'cards' | 'quiz' | null;
        if (tab && ['full', 'revision', 'exam', 'cards', 'quiz'].includes(tab)) {
          setNotesActiveTab(tab);
        } else {
          setNotesActiveTab('full');
        }
        setCurrentView('notes');
      } else if (hash.startsWith('#/new-lecture') || hash.startsWith('#new-lecture')) {
        if (!authInitialized) {
          return;
        }
        if (!user) {
          window.location.hash = '#/signup?redirect=%2Fnew-lecture';
          setCurrentView('signup');
          showToast('Please sign up or log in to generate notes');
          return;
        }
        setIsUploadOpen(true);
      } else {
        // Unknown route -> 404 page
        setCurrentView('not-found');
      }
    };

    parseHashRoute();
    window.addEventListener('hashchange', parseHashRoute);
    window.addEventListener('popstate', parseHashRoute);

    return () => {
      window.removeEventListener('hashchange', parseHashRoute);
      window.removeEventListener('popstate', parseHashRoute);
    };
  }, [authInitialized, user, showToast, extractSafeRedirect]);

  // Sync to local storage when studyKits change
  useEffect(() => {
    saveKitsToStorage(studyKits, user?.id);
  }, [studyKits, user?.id]);

  // Fetch cloud study kits from Supabase scoped to current user
  useEffect(() => {
    async function syncCloudKits() {
      if (!authInitialized) return;

      if (user?.id) {
        // Authenticated user: load only this user's kits from local storage
        const userLocalKits = loadSavedKits(user.id);
        setStudyKits(userLocalKits);

        try {
          const { data, error } = await fetchStudyKitsFromSupabase(user.id);
          if (!error && data) {
            setStudyKits(data);
            saveKitsToStorage(data, user.id);
          }
        } catch (err) {
          console.warn('[Libnotes App] Remote sync deferred:', err);
        }
      } else {
        // Guest user: load default / sample kits
        setStudyKits(loadSavedKits());
      }
    }
    syncCloudKits();
  }, [user?.id, authInitialized]);

  const activeKit = studyKits.find((k) => k.id === activeKitId) || (studyKits.length > 0 ? studyKits[0] : SAMPLE_STUDY_KITS[0]);

  // Check for pending lecture generation to resume after login
  useEffect(() => {
    if (user && authInitialized) {
      const pending = sessionStorage.getItem('libnotes_pending_generation');
      if (pending) {
        try {
          const parsed = JSON.parse(pending);
          sessionStorage.removeItem('libnotes_pending_generation');
          setUploadInitialLink(parsed.linkUrl || '');
          setUploadInitialStyle(parsed.style || 'topper');
          setIsUploadOpen(true);
          showToast(`Welcome back, ${user.display_name}! Ready to generate notes.`);
        } catch {
          sessionStorage.removeItem('libnotes_pending_generation');
        }
      }
    }
  }, [user, authInitialized, showToast]);

  const handleRequireAuth = (
    pendingData?: { source: 'upload' | 'link'; linkUrl: string; style: NoteStyle },
    customRedirectTarget?: string
  ) => {
    if (pendingData) {
      sessionStorage.setItem('libnotes_pending_generation', JSON.stringify(pendingData));
    }
    setIsUploadOpen(false);
    const target = customRedirectTarget || (pendingData ? '%2Fnew-lecture' : '%2Fdashboard');
    window.location.hash = `#/signup?redirect=${target}`;
    setCurrentView('signup');
    showToast('Please create a free account or log in to continue.');
  };

  const navigateTo = (
    view: 'home' | 'notes' | 'dashboard' | 'login' | 'signup' | 'forgot-password' | 'reset-password',
    kitId?: string,
    tab?: 'full' | 'revision' | 'exam' | 'cards' | 'quiz'
  ) => {
    if (view === 'home') {
      window.location.hash = '#/home';
      setCurrentView('home');
    } else if (view === 'login') {
      window.location.hash = '#/login';
      setCurrentView('login');
    } else if (view === 'signup') {
      window.location.hash = '#/signup';
      setCurrentView('signup');
    } else if (view === 'forgot-password') {
      window.location.hash = '#/forgot-password';
      setCurrentView('forgot-password');
    } else if (view === 'reset-password') {
      window.location.hash = '#/reset-password';
      setCurrentView('reset-password');
    } else if (view === 'dashboard') {
      if (authInitialized && !user) {
        window.location.hash = '#/login?redirect=%2Fdashboard';
        setCurrentView('login');
        showToast('Please log in to access your dashboard');
        return;
      }
      window.location.hash = '#/dashboard';
      setCurrentView('dashboard');
    } else if (view === 'notes') {
      const targetId = kitId || activeKitId;
      const targetTab = tab || 'full';
      setNotesActiveTab(targetTab);
      window.location.hash =
        targetTab === 'full'
          ? `#/notes?id=${targetId}`
          : `#/notes?id=${targetId}&tab=${targetTab}`;
      setActiveKitId(targetId);
      setCurrentView('notes');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDismissWelcome = async () => {
    if (user?.id) {
      await markWelcomeAsSeen(user.id);
      setUser((prev) => (prev ? { ...prev, has_seen_welcome: true } : null));
    }
    setIsWelcomeModalOpen(false);
    navigateTo('dashboard');
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    setStudyKits(loadSavedKits());
    showToast('You have been logged out.');
    navigateTo('home');
  };

  const handleStartGenerationFromHero = (
    source: 'upload' | 'link',
    linkUrl: string,
    style: NoteStyle
  ) => {
    if (!user) {
      handleRequireAuth({ source, linkUrl, style });
      return;
    }
    setUploadInitialLink(source === 'link' ? linkUrl : '');
    setUploadInitialStyle(style);
    setIsUploadOpen(true);
  };

  const handleSelectSample = (sampleId: string) => {
    if (!user) {
      handleRequireAuth({ source: 'link', linkUrl: 'https://www.youtube.com/watch?v=sample-lecture', style: 'topper' });
      return;
    }
    navigateTo('notes', sampleId, 'full');
    showToast('Loaded sample study kit');
  };

  const handleFeatureCardClick = (cardType: 'learn' | 'exam' | 'quiz') => {
    if (!user) {
      handleRequireAuth({ source: 'link', linkUrl: 'https://www.youtube.com/watch?v=sample-lecture', style: 'topper' });
      return;
    }
    if (cardType === 'learn') {
      navigateTo('notes', 'kit-thermodynamics', 'full');
    } else if (cardType === 'exam') {
      navigateTo('notes', 'kit-thermodynamics', 'exam');
    } else if (cardType === 'quiz') {
      navigateTo('notes', 'kit-thermodynamics', 'quiz');
    }
  };

  const handleCloseUploadModal = () => {
    setIsUploadOpen(false);
    if (window.location.hash.includes('new-lecture')) {
      window.location.hash = currentView === 'dashboard' ? '#/dashboard' : '#/home';
    }
  };

  const handleUploadSuccess = (generatedKit: StudyKit) => {
    const kitWithUser: StudyKit = {
      ...generatedKit,
      userId: user?.id || undefined,
    };
    setStudyKits((prev) => [kitWithUser, ...prev.filter((k) => k.id !== kitWithUser.id)]);
    setActiveKitId(kitWithUser.id);
    if (user?.id) {
      const owned = [kitWithUser, ...studyKits.filter((k) => k.userId === user.id && k.id !== kitWithUser.id)];
      saveKitsToStorage(owned, user.id);
      syncStudyKitToSupabase(kitWithUser, user.id).catch((err: unknown) => {
        console.warn('[Libnotes App] Supabase sync deferred:', err);
      });
    } else {
      saveKitsToStorage([kitWithUser, ...studyKits]);
    }
    handleCloseUploadModal();
    navigateTo('notes', kitWithUser.id, 'full');
    showToast(`Generated study kit: ${kitWithUser.chapter}`);
  };

  const handleStyleChange = (newStyle: NoteStyle) => {
    setStudyKits((prev) =>
      prev.map((k) => (k.id === activeKitId ? { ...k, noteStyle: newStyle } : k))
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#141414] font-body flex flex-col selection:bg-[#79A94A]/25 selection:text-[#111111]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141414] text-[#FFFFFF] border-2 border-[#79A94A] px-4 py-3 rounded-xl shadow-[4px_4px_0px_#79A94A] text-xs font-mono font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#79A94A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation */}
      <Navbar
        onOpenUpload={() => {
          if (!user) {
            handleRequireAuth();
          } else {
            setIsUploadOpen(true);
          }
        }}
        onNavigateHome={() => navigateTo('home')}
        onNavigateDashboard={() => navigateTo('dashboard')}
        onNavigateLogin={() => navigateTo('login')}
        onNavigateSignUp={() => navigateTo('signup')}
        onSignOut={handleSignOut}
        currentView={currentView}
        user={user}
        isAuthenticated={Boolean(user)}
      />

      {/* Body Views */}
      <main className="flex-1">
        {!authInitialized && (
          window.location.hash.startsWith('#/dashboard') ||
          window.location.hash.startsWith('#/notes') ||
          window.location.hash.startsWith('#/new-lecture') ||
          window.location.hash.includes('auth/callback') ||
          window.location.search.includes('code=')
        ) ? (
          <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
            <div className="text-center p-8 bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl shadow-[4px_4px_0px_#141414] max-w-sm w-full">
              <div className="w-10 h-10 border-3 border-[#79A94A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="font-mono-editorial text-lg font-bold text-[#141414]">Verifying Session...</h3>
              <p className="text-xs font-mono text-[#5E5D57] mt-1">Connecting securely to Libnotes workspace</p>
            </div>
          </div>
        ) : (
          <>
            {currentView === 'home' && (
              <>
                <Hero
                  onStartGeneration={handleStartGenerationFromHero}
                  onSelectSample={handleSelectSample}
                  isAuthenticated={Boolean(user)}
                  onRequireAuth={handleRequireAuth}
                />
                <FeatureCards onCardClick={handleFeatureCardClick} />
                <ProductPreview
                  onOpenWorkspace={() => {
                    if (!user) {
                      handleRequireAuth(undefined, '%2Fnotes%3Fid%3Dkit-thermodynamics');
                    } else {
                      navigateTo('notes', 'kit-thermodynamics');
                    }
                  }}
                />
                <HowItWorks />
                <FinalCTA
                  onOpenUpload={(source) => {
                    if (!user) {
                      handleRequireAuth({ source, linkUrl: source === 'link' ? 'https://www.youtube.com/watch?v=sample-lecture' : '', style: 'topper' });
                    } else {
                      setUploadInitialLink(source === 'link' ? 'https://www.youtube.com/watch?v=sample-lecture' : '');
                      setIsUploadOpen(true);
                    }
                  }}
                  isAuthenticated={Boolean(user)}
                  onRequireAuth={handleRequireAuth}
                />
              </>
            )}

            {currentView === 'notes' && (
              <ErrorBoundary inline onReset={() => navigateTo('dashboard')}>
                <NotesView
                  kit={activeKit}
                  onBack={() => navigateTo('home')}
                  onStyleChange={handleStyleChange}
                  initialTab={notesActiveTab}
                  userId={user?.id}
                />
              </ErrorBoundary>
            )}

            {currentView === 'dashboard' && (
              <ErrorBoundary inline onReset={() => navigateTo('home')}>
                <DashboardView
                  studyKits={studyKits}
                  user={user}
                  onSelectKit={(kitId) => navigateTo('notes', kitId, 'full')}
                  onOpenUpload={() => setIsUploadOpen(true)}
                  onTakeQuiz={(kitId) => navigateTo('notes', kitId, 'quiz')}
                />
              </ErrorBoundary>
            )}

            {/* Auth: Sign Up View */}
            {currentView === 'signup' && (
              <SignUpView
                onNavigateLogin={() => {
                  const redirect = extractSafeRedirect(window.location.hash, window.location.search);
                  const suffix = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';
                  window.location.hash = `#/login${suffix}`;
                  setCurrentView('login');
                }}
                onNavigateHome={() => navigateTo('home')}
                onSignUpSuccess={async () => {
                  const session = await getCurrentSession();
                  if (session?.user) {
                    const profile = await syncUserProfile(session.user);
                    setUser(profile);
                    if (isFirstTimeUser(session.user.id, profile)) {
                      setIsWelcomeModalOpen(true);
                      return;
                    }
                  }
                  showToast('Account created successfully! Welcome to Libnotes.');
                  const redirect = extractSafeRedirect(window.location.hash, window.location.search);
                  if (redirect) {
                    if (redirect === '/new-lecture') {
                      setIsUploadOpen(true);
                      navigateTo('dashboard');
                    } else if (redirect.startsWith('/notes')) {
                      const urlParams = new URLSearchParams(redirect.split('?')[1] || '');
                      const id = urlParams.get('id') || 'kit-thermodynamics';
                      const tab = (urlParams.get('tab') as any) || 'full';
                      navigateTo('notes', id, tab);
                    } else {
                      navigateTo('dashboard');
                    }
                  } else {
                    navigateTo('dashboard');
                  }
                }}
              />
            )}

            {/* Auth: Login View */}
            {currentView === 'login' && (
              <LoginView
                onNavigateSignUp={() => {
                  const redirect = extractSafeRedirect(window.location.hash, window.location.search);
                  const suffix = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';
                  window.location.hash = `#/signup${suffix}`;
                  setCurrentView('signup');
                }}
                onNavigateForgotPassword={() => navigateTo('forgot-password')}
                onNavigateHome={() => navigateTo('home')}
                onLoginSuccess={(target) => {
                  showToast('Welcome back to Libnotes!');
                  const redirect = extractSafeRedirect(window.location.hash, window.location.search);
                  const dest = redirect || target;
                  if (dest) {
                    if (dest === '/new-lecture' || dest === 'new-lecture') {
                      setIsUploadOpen(true);
                      navigateTo('dashboard');
                    } else if (dest.startsWith('/notes') || dest.startsWith('notes')) {
                      const searchStr = dest.includes('?') ? dest.split('?')[1] : '';
                      const urlParams = new URLSearchParams(searchStr);
                      const id = urlParams.get('id') || 'kit-thermodynamics';
                      const tab = (urlParams.get('tab') as any) || 'full';
                      navigateTo('notes', id, tab);
                    } else {
                      navigateTo('dashboard');
                    }
                  } else {
                    navigateTo('dashboard');
                  }
                }}
                redirectTarget={extractSafeRedirect(window.location.hash, window.location.search) || 'dashboard'}
              />
            )}

            {/* Auth: Forgot Password View */}
            {currentView === 'forgot-password' && (
              <ForgotPasswordView
                onNavigateLogin={() => navigateTo('login')}
                onNavigateHome={() => navigateTo('home')}
              />
            )}

            {/* Auth: Reset Password View */}
            {currentView === 'reset-password' && (
              <ResetPasswordView
                onNavigateLogin={() => navigateTo('login')}
                onNavigateHome={() => navigateTo('home')}
              />
            )}

            {/* 404 Custom Editorial Not Found Page */}
            {currentView === 'not-found' && (
              <NotFoundView
                onNavigateHome={() => navigateTo('home')}
                onNavigateDashboard={() => navigateTo('dashboard')}
                onOpenUpload={() => setIsUploadOpen(true)}
                onOpenSampleNotes={() => navigateTo('notes', 'kit-thermodynamics', 'full')}
                isAuthenticated={Boolean(user)}
              />
            )}
          </>
        )}
      </main>

      {/* Upload & Note Generation Modal */}
      <ErrorBoundary inline onReset={handleCloseUploadModal}>
        <UploadModal
          isOpen={isUploadOpen}
          onClose={handleCloseUploadModal}
          onSuccess={handleUploadSuccess}
          initialLink={uploadInitialLink}
          initialStyle={uploadInitialStyle}
          isAuthenticated={Boolean(user)}
          onRequireAuth={handleRequireAuth}
        />
      </ErrorBoundary>

      {/* First-Time Chatpata Welcome Celebratory Modal */}
      <ChatpataWelcomeModal
        isOpen={isWelcomeModalOpen}
        user={user}
        onProceed={handleDismissWelcome}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
