import { useState, useEffect, useCallback } from 'react';
import type { StudyKit, NoteStyle } from './types';
import { loadSavedKits, saveKitsToStorage } from './services/storageService';
import { fetchStudyKitsFromSupabase } from './services/supabaseService';
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

  // Synchronize router state with window hash & popstate
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#' || hash === '#/' || hash === '#/home' || hash === '#home') {
        setCurrentView('home');
      } else if (
        hash.startsWith('#/auth/callback') ||
        hash.includes('access_token=') ||
        window.location.search.includes('code=')
      ) {
        // OAuth or Email confirmation callback detected
        (async () => {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              const profile = await syncUserProfile(session.user);
              setUser(profile);
              const isFirst = isFirstTimeUser(session.user.id, profile);
              window.location.hash = '#/dashboard';
              setCurrentView('dashboard');
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
      } else if (hash.startsWith('#/login') || hash.startsWith('#login')) {
        if (authInitialized && user) {
          window.location.hash = '#/dashboard';
          setCurrentView('dashboard');
        } else {
          setCurrentView('login');
        }
      } else if (hash.startsWith('#/signup') || hash.startsWith('#signup')) {
        if (authInitialized && user) {
          window.location.hash = '#/dashboard';
          setCurrentView('dashboard');
        } else {
          setCurrentView('signup');
        }
      } else if (hash.startsWith('#/forgot-password') || hash.startsWith('#forgot-password')) {
        setCurrentView('forgot-password');
      } else if (hash.startsWith('#/reset-password') || hash.startsWith('#reset-password')) {
        setCurrentView('reset-password');
      } else if (hash.startsWith('#/dashboard') || hash.startsWith('#dashboard')) {
        if (authInitialized && !user) {
          window.location.hash = '#/login?redirect=%2Fdashboard';
          setCurrentView('login');
          showToast('Please log in to access your dashboard');
        } else {
          setCurrentView('dashboard');
        }
      } else if (hash.startsWith('#/notes') || hash.startsWith('#notes')) {
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
  }, [authInitialized, user, showToast]);

  // Sync to local storage when studyKits change
  useEffect(() => {
    saveKitsToStorage(studyKits);
  }, [studyKits]);

  // Fetch cloud study kits from Supabase and merge
  useEffect(() => {
    async function syncCloudKits() {
      try {
        const { data, error } = await fetchStudyKitsFromSupabase();
        if (!error && data && data.length > 0) {
          setStudyKits((prev) => {
            const map = new Map<string, StudyKit>();
            data.forEach((k) => map.set(k.id, k));
            prev.forEach((k) => {
              if (!map.has(k.id)) map.set(k.id, k);
            });
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn('[Libnotes App] Remote sync deferred:', err);
      }
    }
    syncCloudKits();
  }, []);

  const activeKit = studyKits.find((k) => k.id === activeKitId) || studyKits[0];

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
    showToast('You have been logged out.');
    navigateTo('home');
  };

  const handleStartGenerationFromHero = (
    source: 'upload' | 'link',
    linkUrl: string,
    style: NoteStyle
  ) => {
    setUploadInitialLink(source === 'link' ? linkUrl : '');
    setUploadInitialStyle(style);
    setIsUploadOpen(true);
  };

  const handleSelectSample = (sampleId: string) => {
    navigateTo('notes', sampleId, 'full');
    showToast('Loaded sample study kit');
  };

  const handleFeatureCardClick = (cardType: 'learn' | 'exam' | 'quiz') => {
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
    setStudyKits((prev) => [generatedKit, ...prev]);
    handleCloseUploadModal();
    navigateTo('notes', generatedKit.id, 'full');
    showToast(`Generated study kit: ${generatedKit.chapter}`);
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
        onOpenUpload={() => setIsUploadOpen(true)}
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
        {currentView === 'home' && (
          <>
            <Hero
              onStartGeneration={handleStartGenerationFromHero}
              onSelectSample={handleSelectSample}
            />
            <FeatureCards onCardClick={handleFeatureCardClick} />
            <ProductPreview
              onOpenWorkspace={() => navigateTo('notes', 'kit-thermodynamics')}
            />
            <HowItWorks />
            <FinalCTA
              onOpenUpload={(source) => {
                setUploadInitialLink(source === 'link' ? 'https://www.youtube.com/watch?v=sample-lecture' : '');
                setIsUploadOpen(true);
              }}
            />
          </>
        )}

        {currentView === 'notes' && (
          <NotesView
            kit={activeKit}
            onBack={() => navigateTo('home')}
            onStyleChange={handleStyleChange}
            initialTab={notesActiveTab}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            studyKits={studyKits}
            onSelectKit={(kitId) => navigateTo('notes', kitId, 'full')}
            onOpenUpload={() => setIsUploadOpen(true)}
            onTakeQuiz={(kitId) => navigateTo('notes', kitId, 'quiz')}
          />
        )}

        {/* Auth: Sign Up View */}
        {currentView === 'signup' && (
          <SignUpView
            onNavigateLogin={() => navigateTo('login')}
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
              navigateTo('dashboard');
            }}
          />
        )}

        {/* Auth: Login View */}
        {currentView === 'login' && (
          <LoginView
            onNavigateSignUp={() => navigateTo('signup')}
            onNavigateForgotPassword={() => navigateTo('forgot-password')}
            onNavigateHome={() => navigateTo('home')}
            onLoginSuccess={(target) => {
              showToast('Welcome back to Libnotes!');
              navigateTo(target === 'dashboard' ? 'dashboard' : 'home');
            }}
            redirectTarget={
              window.location.hash.includes('redirect=%2Fdashboard') || window.location.hash.includes('redirect=/dashboard')
                ? 'dashboard'
                : 'dashboard'
            }
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
      </main>

      {/* Upload & Note Generation Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={handleCloseUploadModal}
        onSuccess={handleUploadSuccess}
        initialLink={uploadInitialLink}
        initialStyle={uploadInitialStyle}
      />

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
