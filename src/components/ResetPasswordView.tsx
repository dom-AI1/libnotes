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
        </div>

        {isSuccess ? (
          <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#E8F2DC] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center mx-auto text-[#79A94A]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-mono-editorial text-2xl font-bold text-[#141414]">
              Password updated
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#5E5D57] leading-relaxed">
              Your password has been reset successfully. You can now log in with your new credentials.
            </p>

            <div className="pt-4 border-t border-[#141414]/10">
              <button
                type="button"
                onClick={onNavigateLogin}
                className="w-full btn-primary-green py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-2"
              >
                <span>Proceed to Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8F2DC] border border-[#79A94A]/40 text-[#79A94A] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                Security Reset
              </span>
              <h1 className="font-mono-editorial text-2xl font-bold text-[#141414]">
                Set a new password
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-body text-[#5E5D57] leading-relaxed">
                Choose a strong password to secure your Libnotes account.
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
                  htmlFor="reset-new-password"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141414] mb-1.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5E5D57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reset-new-password"
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

              <div>
                <label
                  htmlFor="reset-confirm-password"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141414] mb-1.5"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5E5D57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reset-confirm-password"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary-green py-3 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#141414] hover:shadow-[1px_1px_0px_#141414] transition-all disabled:opacity-60"
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

