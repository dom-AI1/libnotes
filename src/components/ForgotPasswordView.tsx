import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../services/authService';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ForgotPasswordViewProps {
  onNavigateLogin: () => void;
  onNavigateHome: () => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  onNavigateLogin,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      // Regardless of whether account exists, show neutral confirmation (prevents email harvesting)
      await sendPasswordResetEmail(trimmedEmail);
      setIsSubmitted(true);
    } catch (err) {
      // Show generic non-sensitive message if network throws
      setErrorMessage(err instanceof Error ? err.message : 'Unable to send recovery email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F7F5EF] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="max-w-md w-full bg-[#FCFAF6] rounded-3xl border-2 border-[#141414] shadow-[6px_6px_0px_#141414] p-8 sm:p-10">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FCFAF6] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center font-mono-editorial font-bold text-sm text-[#141414] group-hover:bg-[#E8F2DC] transition-colors">
              L<span className="text-[#79A94A]">·</span>
            </div>
            <span className="font-mono-editorial text-lg font-bold tracking-tight text-[#141414]">
              Libnotes
            </span>
          </button>

          <button
            onClick={onNavigateLogin}
            className="text-xs font-mono text-[#5E5D57] hover:text-[#141414] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </button>
        </div>

        {isSubmitted ? (
          /* Neutral Confirmation Notice */
          <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#E8F2DC] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center mx-auto text-[#79A94A]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-mono-editorial text-2xl font-bold text-[#141414]">
              Check your inbox
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#5E5D57] leading-relaxed">
              If an account exists for <strong className="text-[#141414]">{email}</strong>, you will receive password reset instructions within a few minutes.
            </p>

            <div className="pt-4 border-t border-[#141414]/10 space-y-2">
              <button
                type="button"
                onClick={onNavigateLogin}
                className="w-full btn-primary-green py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-2"
              >
                <span>Return to Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="text-xs font-mono text-[#5E5D57] hover:text-[#141414] underline"
              >
                Send to a different email
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8F2DC] border border-[#79A94A]/40 text-[#79A94A] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                Account Recovery
              </span>
              <h1 className="font-mono-editorial text-2xl font-bold text-[#141414]">
                Forgot your password?
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-body text-[#5E5D57] leading-relaxed">
                No worries. Enter your email and we'll send you a password reset link.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-5 p-3 rounded-xl bg-[#FDEDE8] border-2 border-[#E05B49] text-[#141414] text-xs font-body flex items-start gap-2 shadow-[2px_2px_0px_#E05B49]"
              >
                <AlertCircle className="w-4 h-4 text-[#E05B49] shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141414] mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5E5D57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FFFFFF] border-2 border-[#141414] text-[#141414] placeholder:text-[#5E5D57]/50 focus:outline-none focus:ring-2 focus:ring-[#79A94A] transition-all font-body"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary-green py-3 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#141414] hover:shadow-[1px_1px_0px_#141414] transition-all disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

