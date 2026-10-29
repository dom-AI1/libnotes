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
    <div className="min-h-[calc(100vh-5rem)] bg-[#F7F5EF] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-[#FCFAF6] rounded-3xl border-2 border-[#141414] shadow-[6px_6px_0px_#141414] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Editorial Branding & Study Illustration (Desktop) */}
        <div className="lg:col-span-5 bg-[#FAF8F2] p-8 lg:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-[#141414] flex flex-col justify-between">
          <div>
            {/* Wordmark */}
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group text-left mb-6"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FCFAF6] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] flex items-center justify-center font-mono-editorial font-bold text-sm text-[#141414] group-hover:bg-[#E8F2DC] transition-colors">
                L<span className="text-[#79A94A]">·</span>
              </div>
              <span className="font-mono-editorial text-xl font-bold tracking-tight text-[#141414]">
                Libnotes
              </span>
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#E8F2DC] border border-[#79A94A]/40 text-[#79A94A] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              Free Student Account
            </span>

            <h1 className="font-mono-editorial text-2xl lg:text-3xl font-bold text-[#141414] leading-tight">
              Your smarter study journey starts here.
            </h1>

            <p className="mt-3 font-body text-xs sm:text-sm text-[#5E5D57] leading-relaxed">
              Create your free account and turn lectures into notes you'll actually love.
            </p>
          </div>

          {/* Hand-drawn SVG Illustration */}
          <div className="my-6 flex justify-center">
            <AuthIllustration className="w-full max-w-[280px] h-auto drop-shadow-sm" />
          </div>

          {/* Social Proof / Guarantee */}
          <div className="pt-4 border-t border-[#141414]/10 flex items-center gap-2 text-xs font-mono text-[#5E5D57]">
            <span className="w-2 h-2 rounded-full bg-[#79A94A]" />
            <span>₹0 forever for student core tools • No card required</span>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {isEmailConfirmationSent ? (
            /* Check Your Email Confirmation Screen */
            <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F2DC] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center mx-auto text-[#79A94A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-mono-editorial text-2xl font-bold text-[#141414]">
                Check your inbox
              </h2>
              <p className="font-body text-sm text-[#5E5D57] max-w-sm mx-auto leading-relaxed">
                We sent a confirmation link to <strong className="text-[#141414]">{email}</strong>. Please click the link in your email to verify your Libnotes account.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="btn-primary-green px-6 py-2.5 text-xs font-mono font-bold flex items-center gap-2"
                >
                  <span>Proceed to Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-mono-editorial text-2xl font-bold text-[#141414]">
                  Create an account
                </h2>
                <p className="text-xs sm:text-sm font-body text-[#5E5D57] mt-1">
                  Start generating structured notes, PYQs, and revision kits in seconds.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 rounded-xl bg-[#FDEDE8] border-2 border-[#E05B49] text-[#141414] text-xs font-body flex items-start gap-2.5 shadow-[2px_2px_0px_#E05B49] animate-in fade-in duration-150"
                >
                  <AlertCircle className="w-4 h-4 text-[#E05B49] shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="signup-name"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141414] mb-1.5"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#5E5D57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FFFFFF] border-2 border-[#141414] text-[#141414] placeholder:text-[#5E5D57]/50 focus:outline-none focus:ring-2 focus:ring-[#79A94A] transition-all font-body"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141414] mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#5E5D57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#FFFFFF] border-2 border-[#141414] text-[#141414] placeholder:text-[#5E5D57]/50 focus:outline-none focus:ring-2 focus:ring-[#79A94A] transition-all font-body"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141414] mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#5E5D57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-[#FFFFFF] border-2 border-[#141414] text-[#141414] placeholder:text-[#5E5D57]/50 focus:outline-none focus:ring-2 focus:ring-[#79A94A] transition-all font-body"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E5D57] hover:text-[#141414] p-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Requirements Guidance */}
                  {password.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${hasMinLength ? 'bg-[#79A94A]' : 'bg-[#D5D3CA]'}`} />
                        <span className={hasMinLength ? 'text-[#79A94A]' : 'text-[#5E5D57]'}>At least 6 characters</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${hasLetter && hasNumber ? 'bg-[#79A94A]' : 'bg-[#D5D3CA]'}`} />
                        <span className={hasLetter && hasNumber ? 'text-[#79A94A]' : 'text-[#5E5D57]'}>Contains letters and numbers</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="signup-confirm-password"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141414] mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#5E5D57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-[#FFFFFF] border-2 border-[#141414] text-[#141414] placeholder:text-[#5E5D57]/50 focus:outline-none focus:ring-2 focus:ring-[#79A94A] transition-all font-body"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E5D57] hover:text-[#141414] p-1"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="mt-1 text-[11px] font-mono text-[#E05B49]">
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 btn-primary-green py-3 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#141414] hover:shadow-[1px_1px_0px_#141414] transition-all disabled:opacity-60"
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
                  <div className="w-full border-t border-[#141414]/15" />
                </div>
                <div className="relative flex justify-center text-xs font-mono uppercase text-[#5E5D57]">
                  <span className="bg-[#FCFAF6] px-3">or continue with</span>
                </div>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl border-2 border-[#141414] bg-[#FFFFFF] hover:bg-[#FAF8F2] text-xs font-mono font-bold text-[#141414] flex items-center justify-center gap-2 shadow-[2px_2px_0px_#141414] active:translate-x-0.5 active:translate-y-0.5 transition-all"
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
              <div className="mt-6 text-center text-xs font-mono text-[#5E5D57]">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="font-bold text-[#141414] underline hover:text-[#79A94A] transition-colors"
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

