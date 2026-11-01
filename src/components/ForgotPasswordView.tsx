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
      await sendPasswordResetEmail(trimmedEmail);
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to send recovery email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F4F5F2] dark:bg-[#171C1A] flex items-center justify-center py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-md w-full bg-[#FFFFFF] dark:bg-[#242D28] rounded-3xl border border-[#E2E7E1] dark:border-[#354139] shadow-xs p-8 sm:p-10">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#24332D] dark:bg-[#E8EEE9] border border-[#24332D] dark:border-[#E8EEE9] flex items-center justify-center font-editorial font-bold text-sm text-[#FFFFFF] dark:text-[#171C1A] group-hover:opacity-90 transition-opacity">
              L<span className="text-[#486B54] dark:text-[#24332D]">·</span>
            </div>
            <span className="font-editorial text-lg font-bold tracking-tight text-[#24332D] dark:text-[#E8EEE9]">
              Libnotes
            </span>
          </button>

          <button
            onClick={onNavigateLogin}
            className="text-xs font-mono text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </button>
        </div>

        {isSubmitted ? (
          /* Neutral Confirmation Notice */
          <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] shadow-xs flex items-center justify-center mx-auto text-[#486B54] dark:text-[#A8C5AD]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
              Check your inbox
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
              If an account exists for <strong className="text-[#24332D] dark:text-[#E8EEE9]">{email}</strong>, you will receive password reset instructions within a few minutes.
            </p>

            <div className="pt-4 border-t border-[#E2E7E1] dark:border-[#354139] space-y-2">
              <button
                type="button"
                onClick={onNavigateLogin}
                className="w-full btn-primary-green py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
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
                className="text-xs font-mono text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9] underline cursor-pointer"
              >
                Send to a different email
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] text-[#486B54] dark:text-[#A8C5AD] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                Account Recovery
              </span>
              <h1 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
                Forgot your password?
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-body text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
                No worries. Enter your email and we'll send you a password reset link.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-5 p-3 rounded-xl bg-[#FEF2F2] dark:bg-[#3B1E1E] border border-[#FCA5A5] dark:border-[#EF4444] text-[#991B1B] dark:text-[#FCA5A5] text-xs font-body flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#24332D] dark:text-[#E8EEE9] mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FFFFFF] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-[#24332D] dark:text-[#E8EEE9] placeholder:text-[#647168]/60 dark:placeholder:text-[#B2BDB5]/60 focus:outline-none focus:ring-2 focus:ring-[#486B54] dark:focus:ring-[#A8C5AD] transition-all font-body"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary-green py-3 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all disabled:opacity-60"
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
