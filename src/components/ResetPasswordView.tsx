import React, { useState } from 'react';
import { updateUserPassword } from '../services/authService';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface ResetPasswordViewProps {
  onNavigateLogin: () => void;
  onNavigateHome: () => void;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({
  onNavigateLogin,
  onNavigateHome,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordStrong = hasMinLength && hasLetter && hasNumber;
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

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
      const res = await updateUserPassword(password);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to update password. Your reset link may have expired.');
        setIsLoading(false);
        return;
      }
      setIsSuccess(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error updating password.');
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
        </div>

        {isSuccess ? (
          /* Password Updated Success Screen */
          <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] shadow-xs flex items-center justify-center mx-auto text-[#486B54] dark:text-[#A8C5AD]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
              Password updated!
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
              Your password has been successfully reset. You can now log in with your new credentials.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={onNavigateLogin}
                className="w-full btn-primary-green py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] text-[#486B54] dark:text-[#A8C5AD] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                New Credentials
              </span>
              <h1 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
                Set a new password
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-body text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
                Choose a strong new password for your account.
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
              {/* New Password */}
              <div>
                <label
                  htmlFor="reset-password"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#24332D] dark:text-[#E8EEE9] mb-1.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reset-password"
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
                  htmlFor="reset-confirm-password"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#24332D] dark:text-[#E8EEE9] mb-1.5"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reset-confirm-password"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary-green py-3 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <span>Update Password</span>
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
