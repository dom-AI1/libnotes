import { useState } from 'react';
import { SparkleDoodle } from './SVGIcons';
import { Menu, X, BookOpen, Layers, HelpCircle, Sparkles, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import type { UserProfile } from '../services/authService';

interface NavbarProps {
  onOpenUpload: () => void;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onNavigateLogin?: () => void;
  onNavigateSignUp?: () => void;
  onSignOut?: () => void;
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
    <header className="sticky top-0 z-40 w-full bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#141414]/15">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-left group transition-transform active:scale-95 cursor-pointer"
          aria-label="Libnotes Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FCFAF6] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center font-mono-editorial font-bold text-base sm:text-lg text-[#141414] group-hover:bg-[#E8F2DC] transition-colors shrink-0">
            L<span className="text-[#79A94A]">·</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#141414] flex items-center gap-1.5">
              Libnotes
              <span className="w-2 h-2 rounded-full bg-[#79A94A] inline-block animate-pulse" />
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono text-[#5E5D57] -mt-1 hidden xs:inline-block">
              Lecture to Exam
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#FCFAF6]/80 border border-[#141414]/15 shadow-sm">
          <button
            onClick={() => scrollToSection('features')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('resources')}
            className="px-3.5 py-1.5 text-sm font-medium text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60 rounded-full transition-all cursor-pointer"
          >
            Resources
          </button>
          <span className="w-[1px] h-4 bg-[#141414]/20 mx-1" />
          <button
            onClick={onNavigateDashboard}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-[#141414] text-[#FFFFFF]'
                : 'text-[#2A2A2A] hover:text-[#141414] hover:bg-[#E8F2DC]/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#79A94A]" />
            Dashboard
          </button>
        </nav>

        {/* Right Action (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            /* Logged in state */
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FCFAF6] border border-[#141414]/20">
                <div className="w-6 h-6 rounded-full bg-[#E8F2DC] text-[#79A94A] font-mono font-bold text-xs flex items-center justify-center border border-[#79A94A]/40">
                  {getInitials(user.display_name)}
                </div>
                <span className="text-xs font-mono font-semibold text-[#141414] max-w-[120px] truncate">
                  {user.display_name}
                </span>
              </div>
              <button
                onClick={onSignOut}
                title="Log Out"
                className="p-2 rounded-xl border border-[#141414]/20 hover:border-[#E05B49] hover:bg-[#FDEDE8] text-[#5E5D57] hover:text-[#E05B49] transition-all cursor-pointer"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenUpload}
                className="btn-primary-green px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#141414]"
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
                  className="px-3.5 py-2 text-xs font-mono font-bold text-[#141414] hover:text-[#79A94A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
              )}
              {onNavigateSignUp ? (
                <button
                  onClick={onNavigateSignUp}
                  className="btn-primary-green px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#141414]"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              ) : (
                <button
                  onClick={onOpenUpload}
                  className="btn-secondary-outline px-5 py-2 text-sm font-medium hover:bg-[#E8F2DC]/70 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#79A94A]" />
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
              onClick={() => scrollToSection('about')}
              className="text-left py-2 border-b border-[#DFDBCF] flex items-center justify-between"
            >
              <span>About Us</span>
              <HelpCircle className="w-4 h-4 text-[#79A94A]" />
            </button>
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
