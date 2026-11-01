import React, { useState } from 'react';
import { AuthIllustration } from './SVGIcons';
import { signUpUser, signInWithGoogle } from '../services/authService';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ArrowRight, Mail, Lock, User as UserIcon } from 'lucide-react';

interface SignUpViewProps {
  onNavigateLogin: () => void;
  onNavigateHome: () => void;
  onSignUpSuccess: () => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({
  onNavigateLogin,
  onNavigateHome,
  onSignUpSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEmailConfirmationSent, setIsEmailConfirmationSent] = useState(false);

  // Validation states
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordStrong = hasMinLength && hasLetter && hasNumber;
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!isPasswordStrong) {
      setErrorMessage('Password must be at least 6 characters and include letters and numbers.');
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await signUpUser(email, password, fullName);

      if (!res.success) {
        setErrorMessage(res.error || 'Failed to create account. Please try again.');
        setIsLoading(false);
        return;
      }

      if (res.needsEmailConfirmation) {
        setIsEmailConfirmationSent(true);
      } else {
        onSignUpSuccess();
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const res = await signInWithGoogle();
      if (!res.success && res.error) {
        setErrorMessage(res.error);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Google sign in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F4F5F2] dark:bg-[#171C1A] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl w-full bg-[#FFFFFF] dark:bg-[#242D28] rounded-3xl border border-[#E2E7E1] dark:border-[#354139] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Branding & Illustration */}
        <div className="lg:col-span-5 bg-[#F4F5F2]/60 dark:bg-[#1F2622]/60 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#E2E7E1] dark:border-[#354139] flex flex-col justify-between">
          <div>
            {/* Wordmark */}
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group text-left mb-6 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#24332D] dark:bg-[#E8EEE9] border border-[#24332D] dark:border-[#E8EEE9] flex items-center justify-center font-editorial font-bold text-sm text-[#FFFFFF] dark:text-[#171C1A] group-hover:opacity-90 transition-opacity">
                L<span className="text-[#486B54] dark:text-[#24332D]">·</span>
              </div>
              <span className="font-editorial text-xl font-bold tracking-tight text-[#24332D] dark:text-[#E8EEE9]">
                Libnotes
              </span>
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] text-[#486B54] dark:text-[#A8C5AD] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              Free Student Account
            </span>

            <h1 className="font-editorial text-2xl lg:text-3xl font-bold text-[#24332D] dark:text-[#E8EEE9] leading-tight">
              Your smarter study journey starts here.
            </h1>

            <p className="mt-3 font-body text-xs sm:text-sm text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
              Create your free account and turn lectures into notes you'll actually love.
            </p>
          </div>

          {/* Line Illustration */}
          <div className="my-6 flex justify-center">
            <AuthIllustration className="w-full max-w-[260px] h-auto drop-shadow-xs" />
          </div>

          {/* Guarantee */}
          <div className="pt-4 border-t border-[#E2E7E1] dark:border-[#354139] flex items-center gap-2 text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
            <span className="w-2 h-2 rounded-full bg-[#486B54] dark:bg-[#A8C5AD]" />
            <span>₹0 forever for student core tools • No card required</span>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {isEmailConfirmationSent ? (
            /* Check Your Email Confirmation Screen */
            <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] shadow-xs flex items-center justify-center mx-auto text-[#486B54] dark:text-[#A8C5AD]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
                Check your inbox
              </h2>
              <p className="font-body text-sm text-[#647168] dark:text-[#B2BDB5] max-w-sm mx-auto leading-relaxed">
                We sent a confirmation link to <strong className="text-[#24332D] dark:text-[#E8EEE9]">{email}</strong>. Please click the link in your email to verify your Libnotes account.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="btn-primary-green px-6 py-2.5 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
                  Create an account
                </h2>
                <p className="text-xs sm:text-sm font-body text-[#647168] dark:text-[#B2BDB5] mt-1">
                  Start generating structured notes, PYQs, and revision kits in seconds.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 rounded-xl bg-[#FEF2F2] dark:bg-[#3B1E1E] border border-[#FCA5A5] dark:border-[#EF4444] text-[#991B1B] dark:text-[#FCA5A5] text-xs font-body flex items-start gap-2.5 animate-in fade-in duration-150"
                >
                  <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="signup-name"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#24332D] dark:text-[#E8EEE9] mb-1.5"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FFFFFF] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-[#24332D] dark:text-[#E8EEE9] placeholder:text-[#647168]/60 dark:placeholder:text-[#B2BDB5]/60 focus:outline-none focus:ring-2 focus:ring-[#486B54] dark:focus:ring-[#A8C5AD] transition-all font-body"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#24332D] dark:text-[#E8EEE9] mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FFFFFF] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-[#24332D] dark:text-[#E8EEE9] placeholder:text-[#647168]/60 dark:placeholder:text-[#B2BDB5]/60 focus:outline-none focus:ring-2 focus:ring-[#486B54] dark:focus:ring-[#A8C5AD] transition-all font-body"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#24332D] dark:text-[#E8EEE9] mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-[#FFFFFF] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-[#24332D] dark:text-[#E8EEE9] placeholder:text-[#647168]/60 dark:placeholder:text-[#B2BDB5]/60 focus:outline-none focus:ring-2 focus:ring-[#486B54] dark:focus:ring-[#A8C5AD] transition-all font-body"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9] p-1 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Requirements Guidance */}
                  {password.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${hasMinLength ? 'bg-[#486B54] dark:bg-[#A8C5AD]' : 'bg-[#E2E7E1] dark:bg-[#354139]'}`} />
                        <span className={hasMinLength ? 'text-[#486B54] dark:text-[#A8C5AD]' : 'text-[#647168] dark:text-[#B2BDB5]'}>At least 6 characters</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${hasLetter && hasNumber ? 'bg-[#486B54] dark:bg-[#A8C5AD]' : 'bg-[#E2E7E1] dark:bg-[#354139]'}`} />
                        <span className={hasLetter && hasNumber ? 'text-[#486B54] dark:text-[#A8C5AD]' : 'text-[#647168] dark:text-[#B2BDB5]'}>Contains letters and numbers</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="signup-confirm-password"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#24332D] dark:text-[#E8EEE9] mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-[#FFFFFF] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-[#24332D] dark:text-[#E8EEE9] placeholder:text-[#647168]/60 dark:placeholder:text-[#B2BDB5]/60 focus:outline-none focus:ring-2 focus:ring-[#486B54] dark:focus:ring-[#A8C5AD] transition-all font-body"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9] p-1 cursor-pointer"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="mt-1 text-[11px] font-mono text-[#DC2626]">
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 btn-primary-green py-3 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Free Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Or separator */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E7E1] dark:border-[#354139]" />
                </div>
                <div className="relative flex justify-center text-xs font-mono uppercase text-[#647168] dark:text-[#B2BDB5]">
                  <span className="bg-[#FFFFFF] dark:bg-[#242D28] px-3">or continue with</span>
                </div>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] hover:bg-[#F4F5F2] dark:hover:bg-[#1F2622] text-xs font-mono font-bold text-[#24332D] dark:text-[#E8EEE9] flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Login Switch Link */}
              <div className="mt-6 text-center text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="font-bold text-[#24332D] dark:text-[#E8EEE9] underline hover:text-[#486B54] dark:hover:text-[#A8C5AD] transition-colors cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
