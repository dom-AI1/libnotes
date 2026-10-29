import { useState } from 'react';
import { SparkleDoodle } from './SVGIcons';
import { Menu, X, BookOpen, Layers, HelpCircle, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenUpload: () => void;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  currentView: 'home' | 'notes' | 'dashboard';
}

export const Navbar = ({
  onOpenUpload,
  onNavigateHome,
  onNavigateDashboard,
  currentView,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#141414]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          aria-label="NoteAI Home"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FCFAF6] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center font-mono-editorial font-bold text-lg text-[#141414] group-hover:bg-[#E8F2DC] transition-colors">
            N<span className="text-[#79A94A]">·</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-editorial text-2xl font-bold tracking-tight text-[#141414] flex items-center gap-1.5">
              NoteAI
              <span className="w-2 h-2 rounded-full bg-[#79A94A] inline-block animate-pulse" />
            </span>
            <span className="text-[10px] uppercase tracking-wider font-mono text-[#5E5D57] -mt-1">
              Lecture to Exam
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#FCFAF6]/80 border border-[#141414]/15 shadow-sm">
          <button
            onClick={() => scrollToSection('features')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('resources')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all"
          >
            Resources
          </button>
          <span className="w-[1px] h-4 bg-[#141414]/20 mx-1" />
          <button
            onClick={onNavigateDashboard}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all flex items-center gap-1.5 ${
              currentView === 'dashboard'
                ? 'bg-[#141414] text-[#FFFFFF]'
                : 'text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#79A94A]" />
            Dashboard
          </button>
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="btn-secondary-outline px-5 py-2 text-sm font-medium hover:bg-[#E8F2DC]/70 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#79A94A]" />
            <span>Get Started</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenUpload}
            className="btn-primary-green px-3.5 py-1.5 text-xs font-semibold"
          >
            Start
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[#141414] bg-[#FCFAF6] shadow-[2px_2px_0px_#141414]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#141414] bg-[#FCFAF6] px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 font-medium text-base">
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between"
            >
              <span>Features</span>
              <BookOpen className="w-4 h-4 text-[#79A94A]" />
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between"
            >
              <span>How It Works</span>
              <SparkleDoodle className="w-4 h-4 text-[#79A94A]" />
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between"
            >
              <span>About Us</span>
              <HelpCircle className="w-4 h-4 text-[#79A94A]" />
            </button>
            <button
              onClick={onNavigateDashboard}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between text-[#79A94A] font-bold"
            >
              <span>My Study Dashboard</span>
              <Layers className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenUpload();
            }}
            className="w-full btn-primary-green py-3 text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Notes Now</span>
          </button>
        </div>
      )}
    </header>
  );
};
