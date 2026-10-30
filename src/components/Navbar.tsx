import { useState } from 'react';
import { SparkleDoodle } from './SVGIcons';
import { Menu, X, BookOpen, Layers, HelpCircle, Sparkles, LogIn, LogOut, User as UserIcon, Film } from 'lucide-react';
import type { UserProfile } from '../services/authService';

interface NavbarProps {
  onOpenUpload: () => void;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onNavigateLogin?: () => void;
  onNavigateSignUp?: () => void;
  onSignOut?: () => void;
  onWatchVideo?: (type?: 'about' | 'tutorial') => void;
  currentView: string;
  user?: UserProfile | null;
  isAuthenticated?: boolean;
}

export const Navbar = ({
  onOpenUpload,
  onNavigateHome,
  onNavigateDashboard,
  onNavigateLogin,
  onNavigateSignUp,
  onSignOut,
  onWatchVideo,
  currentView,
  user,
  isAuthenticated = false,
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

  const getInitials = (name?: string) => {
    if (!name || !name.trim()) return 'U';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2 && parts[0][0] && parts[1][0]) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    if (parts.length >= 1 && parts[0].length > 0) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 cursor-pointer"
          aria-label="Libnotes Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0F172A] border border-[#0F172A] shadow-xs flex items-center justify-center font-mono-editorial font-bold text-base sm:text-lg text-[#FFFFFF] group-hover:bg-[#1E293B] transition-colors shrink-0">
            L<span className="text-[#10B981]">·</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] flex items-center gap-1.5">
              Libnotes
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse" />
            </span>
            <span className="text-[10px] uppercase tracking-wider font-mono text-[#64748B] -mt-0.5 hidden xs:inline-block font-semibold">
              Lecture to Exam
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs">
          <button
            onClick={() => scrollToSection('features')}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#FFFFFF] rounded-full transition-all cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#FFFFFF] rounded-full transition-all cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => onWatchVideo ? onWatchVideo('about') : scrollToSection('about')}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#FFFFFF] rounded-full transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>About Us</span>
          </button>
          <button
            onClick={() => scrollToSection('resources')}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#FFFFFF] rounded-full transition-all cursor-pointer"
          >
            Resources
          </button>
          {onWatchVideo && (
            <button
              onClick={() => onWatchVideo('tutorial')}
              className="px-3 py-1 text-xs font-mono font-bold text-[#065F46] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Watch AI Explainer Video"
            >
              <Film className="w-3.5 h-3.5 text-[#059669]" />
              <span>Watch Video</span>
            </button>
          )}
          <span className="w-[1px] h-4 bg-[#CBD5E1] mx-1" />
          <button
            onClick={onNavigateDashboard}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs'
                : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#FFFFFF]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#059669]" />
            Dashboard
          </button>
        </nav>

        {/* Right Action (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            /* Logged in state */
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="w-6 h-6 rounded-full bg-[#ECFDF5] text-[#059669] font-mono font-bold text-xs flex items-center justify-center border border-[#A7F3D0]">
                  {getInitials(user.display_name)}
                </div>
                <span className="text-xs font-mono font-semibold text-[#0F172A] max-w-[120px] truncate">
                  {user.display_name}
                </span>
              </div>
              <button
                onClick={onSignOut}
                title="Log Out"
                className="p-2 rounded-xl border border-[#E2E8F0] hover:border-[#EF4444] hover:bg-[#FEF2F2] text-[#64748B] hover:text-[#DC2626] transition-all cursor-pointer"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenUpload}
                className="btn-primary-green px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Notes</span>
              </button>
            </div>
          ) : (
            /* Logged out state */
            <div className="flex items-center gap-2">
              {onNavigateLogin && (
                <button
                  onClick={onNavigateLogin}
                  className="px-3.5 py-2 text-xs font-mono font-bold text-[#0F172A] hover:text-[#059669] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
              )}
              {onNavigateSignUp ? (
                <button
                  onClick={onNavigateSignUp}
                  className="btn-primary-green px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              ) : (
                <button
                  onClick={onOpenUpload}
                  className="btn-secondary-outline px-5 py-2 text-sm font-medium hover:bg-[#ECFDF5] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#059669]" />
                  <span>Get Started</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={onOpenUpload}
              className="btn-primary-green px-3.5 py-1.5 text-xs font-semibold"
            >
              New
            </button>
          ) : (
            <button
              onClick={onNavigateLogin || onOpenUpload}
              className="btn-primary-green px-3.5 py-1.5 text-xs font-semibold"
            >
              Log In
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-xs text-[#0F172A]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#141414] bg-[#FCFAF6] px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top duration-200">
          {isAuthenticated && user && (
            <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#141414]/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8F2DC] text-[#79A94A] font-mono font-bold text-xs flex items-center justify-center border border-[#79A94A]/40">
                  {getInitials(user.display_name)}
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-[#141414]">{user.display_name}</p>
                  <p className="text-[10px] font-mono text-[#5E5D57] truncate max-w-[160px]">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut?.();
                }}
                className="text-xs font-mono text-[#E05B49] flex items-center gap-1 hover:underline"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}

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
              onClick={() => {
                setMobileMenuOpen(false);
                onWatchVideo ? onWatchVideo('about') : scrollToSection('about');
              }}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between"
            >
              <span>About Us Video & Story</span>
              <HelpCircle className="w-4 h-4 text-[#79A94A]" />
            </button>
            {onWatchVideo && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onWatchVideo('tutorial');
                }}
                className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between text-[#141414] font-semibold bg-[#E8F2DC]/50 px-2 rounded-lg"
              >
                <span>▶ Watch AI Video Guide</span>
                <Film className="w-4 h-4 text-[#79A94A]" />
              </button>
            )}
            <button
              onClick={() => scrollToSection('resources')}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between"
            >
              <span>Resources</span>
              <BookOpen className="w-4 h-4 text-[#79A94A]" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateDashboard();
              }}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between text-[#79A94A] font-bold"
            >
              <span>My Study Dashboard</span>
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {!isAuthenticated && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateLogin?.();
                }}
                className="btn-secondary-outline py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateSignUp?.();
                }}
                className="btn-primary-green py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

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
