import { useState, useEffect } from 'react';
import type { StudyKit, NoteStyle } from './types';
import { loadSavedKits, saveKitsToStorage } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { HowItWorks } from './components/HowItWorks';
import { ProductPreview } from './components/ProductPreview';
import { FinalCTA } from './components/FinalCTA';
import { UploadModal } from './components/UploadModal';
import { NotesView } from './components/NotesView';
import { DashboardView } from './components/DashboardView';
import { Footer } from './components/Footer';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'notes' | 'dashboard' | 'not-found'>('home');
  const [studyKits, setStudyKits] = useState<StudyKit[]>(() => loadSavedKits());
  const [activeKitId, setActiveKitId] = useState<string>('kit-thermodynamics');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadInitialLink, setUploadInitialLink] = useState('');
  const [uploadInitialStyle, setUploadInitialStyle] = useState<NoteStyle>('topper');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Synchronize router state with window hash & popstate
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#' || hash === '#/' || hash === '#/home' || hash === '#home') {
        setCurrentView('home');
      } else if (hash.startsWith('#/dashboard') || hash.startsWith('#dashboard')) {
        setCurrentView('dashboard');
      } else if (hash.startsWith('#/notes') || hash.startsWith('#notes')) {
        const urlParams = new URLSearchParams(hash.split('?')[1] || '');
        const id = urlParams.get('id');
        if (id) {
          setActiveKitId(id);
        }
        setCurrentView('notes');
      } else if (hash.startsWith('#/new-lecture') || hash.startsWith('#new-lecture')) {
        setIsUploadOpen(true);
      } else {
        // Unknown route
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
  }, []);

  // Sync to storage when studyKits change
  useEffect(() => {
    saveKitsToStorage(studyKits);
  }, [studyKits]);

  const activeKit = studyKits.find((k) => k.id === activeKitId) || studyKits[0];

  const navigateTo = (view: 'home' | 'notes' | 'dashboard', kitId?: string) => {
    if (view === 'home') {
      window.location.hash = '#/home';
      setCurrentView('home');
    } else if (view === 'dashboard') {
      window.location.hash = '#/dashboard';
      setCurrentView('dashboard');
    } else if (view === 'notes') {
      const targetId = kitId || activeKitId;
      window.location.hash = `#/notes?id=${targetId}`;
      setActiveKitId(targetId);
      setCurrentView('notes');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    navigateTo('notes', sampleId);
    showToast('Loaded sample study kit');
  };

  const handleFeatureCardClick = (cardType: 'learn' | 'exam' | 'quiz') => {
    if (cardType === 'learn') {
      navigateTo('notes', 'kit-thermodynamics');
    } else if (cardType === 'exam') {
      setStudyKits((prev) =>
        prev.map((k) =>
          k.id === 'kit-thermodynamics' ? { ...k, noteStyle: 'exam' } : k
        )
      );
      navigateTo('notes', 'kit-thermodynamics');
    } else if (cardType === 'quiz') {
      navigateTo('notes', 'kit-thermodynamics');
    }
  };

  const handleUploadSuccess = (generatedKit: StudyKit) => {
    setStudyKits((prev) => [generatedKit, ...prev]);
    setIsUploadOpen(false);
    navigateTo('notes', generatedKit.id);
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
        currentView={currentView === 'not-found' ? 'home' : currentView}
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
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            studyKits={studyKits}
            onSelectKit={(kitId) => navigateTo('notes', kitId)}
            onOpenUpload={() => setIsUploadOpen(true)}
            onTakeQuiz={(kitId) => navigateTo('notes', kitId)}
          />
        )}

        {/* 404 Useful Not-Found View */}
        {currentView === 'not-found' && (
          <div className="py-24 px-4 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#FDEDE8] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-[#E05B49]" />
            </div>
            <h2 className="font-mono-editorial text-3xl font-bold text-[#141414]">
              Study Route Not Found
            </h2>
            <p className="font-body text-sm text-[#5E5D57] mt-2 leading-relaxed">
              The lecture or destination route you requested does not exist or may have been archived.
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="mt-6 btn-primary-green px-6 py-2.5 text-xs font-mono font-bold inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to NoteAI Home</span>
            </button>
          </div>
        )}
      </main>

      {/* Upload & Note Generation Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={handleUploadSuccess}
        initialLink={uploadInitialLink}
        initialStyle={uploadInitialStyle}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
