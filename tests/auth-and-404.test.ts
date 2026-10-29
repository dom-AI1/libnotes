import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { signUpUser, signInUser, sendPasswordResetEmail, updateUserPassword, signOutUser } from '../src/services/authService';
import { supabase } from '../src/services/supabaseClient';

describe('Checkpoint 24: Libnotes Authentication & 404 Page Development', () => {
  const signUpViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/SignUpView.tsx'), 'utf-8');
  const loginViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/LoginView.tsx'), 'utf-8');
  const forgotPasswordViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/ForgotPasswordView.tsx'), 'utf-8');
  const resetPasswordViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/ResetPasswordView.tsx'), 'utf-8');
  const notFoundViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/NotFoundView.tsx'), 'utf-8');
  const appTsx = fs.readFileSync(path.resolve(__dirname, '../src/App.tsx'), 'utf-8');
  const navbarTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Navbar.tsx'), 'utf-8');
  const schemaSql = fs.readFileSync(path.resolve(__dirname, '../supabase_schema.sql'), 'utf-8');

  it('preserves Libnotes brand identity across all authentication views and 404 page', () => {
    expect(signUpViewTsx).toContain('Libnotes');
    expect(signUpViewTsx).not.toContain('NoteAI');
    expect(loginViewTsx).toContain('Libnotes');
    expect(loginViewTsx).not.toContain('NoteAI');
    expect(forgotPasswordViewTsx).toContain('Libnotes');
    expect(forgotPasswordViewTsx).not.toContain('NoteAI');
    expect(resetPasswordViewTsx).toContain('Libnotes');
    expect(resetPasswordViewTsx).not.toContain('NoteAI');
    expect(notFoundViewTsx).not.toContain('NoteAI');
  });

  it('implements Sign Up page with required layout, validation, and Supabase integration', () => {
    // Heading & Subheading from requirements
    expect(signUpViewTsx).toContain('Your smarter study journey starts here.');
    expect(signUpViewTsx).toContain("Create your free account and turn lectures into notes you'll actually love.");
    
    // Required form fields
    expect(signUpViewTsx).toContain('Full Name');
    expect(signUpViewTsx).toContain('Email Address');
    expect(signUpViewTsx).toContain('Password');
    expect(signUpViewTsx).toContain('Confirm Password');

    // Editorial and UI tokens
    expect(signUpViewTsx).toContain('AuthIllustration');
    expect(signUpViewTsx).toContain('Create Free Account');
    expect(signUpViewTsx).toContain('Already have an account?');
    expect(signUpViewTsx).toContain('Check your inbox'); // Confirmation screen
    expect(signUpViewTsx).toContain('Continue with Google');
  });

  it('implements Login page with required layout, credentials handling, and navigation', () => {
    // Heading & Subheading
    expect(loginViewTsx).toContain('Welcome back.');
    expect(loginViewTsx).toContain('Your notes, lectures, and learning journey are waiting.');

    // Fields and links
    expect(loginViewTsx).toContain('login-email');
    expect(loginViewTsx).toContain('login-password');
    expect(loginViewTsx).toContain('Forgot Password?');
    expect(loginViewTsx).toContain('Remember my session on this device');
    expect(loginViewTsx).toContain('Log In');
    expect(loginViewTsx).toContain('New to Libnotes?');
    expect(loginViewTsx).toContain('Create an Account');
    expect(loginViewTsx).toContain('Continue with Google');
  });

  it('implements Forgot Password flow with anti-enumeration neutral confirmation', () => {
    expect(forgotPasswordViewTsx).toContain('Forgot your password?');
    expect(forgotPasswordViewTsx).toContain("No worries. Enter your email and we'll send you a password reset link.");
    expect(forgotPasswordViewTsx).toContain('Send Reset Link');
    expect(forgotPasswordViewTsx).toContain('Check your inbox');
    // Notice that does not expose whether account exists
    expect(forgotPasswordViewTsx).toContain('If an account exists for');
  });

  it('implements Reset Password flow with password strength indicators', () => {
    expect(resetPasswordViewTsx).toContain('Set a new password');
    expect(resetPasswordViewTsx).toContain('Update Password');
    expect(resetPasswordViewTsx).toContain('At least 6 characters');
    expect(resetPasswordViewTsx).toContain('Contains letters and numbers');
    expect(resetPasswordViewTsx).toContain('Password updated');
  });

  it('implements editorial 404 page with custom illustration, copy, and navigation links', () => {
    expect(notFoundViewTsx).toContain('404');
    expect(notFoundViewTsx).toContain('NotFoundIllustration');
    expect(notFoundViewTsx).toContain('Looks like this page skipped class.');
    expect(notFoundViewTsx).toContain('Go Home');
    expect(notFoundViewTsx).toContain('Go Back');
    expect(notFoundViewTsx).toContain('Go to Dashboard');
    expect(notFoundViewTsx).toContain('Create New Notes');
  });

  it('configures App routing and route protection for dashboard', () => {
    expect(appTsx).toContain('#/login');
    expect(appTsx).toContain('#/signup');
    expect(appTsx).toContain('#/forgot-password');
    expect(appTsx).toContain('#/reset-password');
    expect(appTsx).toContain('#/dashboard');
    expect(appTsx).toContain('redirect=%2Fdashboard');
    expect(appTsx).toContain('setCurrentView(\'not-found\')');
    expect(appTsx).toContain('<SignUpView');
    expect(appTsx).toContain('<LoginView');
    expect(appTsx).toContain('<ForgotPasswordView');
    expect(appTsx).toContain('<ResetPasswordView');
    expect(appTsx).toContain('<NotFoundView');
  });

  it('updates Navbar to support authenticated user badges and logout', () => {
    expect(navbarTsx).toContain('Log In');
    expect(navbarTsx).toContain('Sign Up');
    expect(navbarTsx).toContain('Log Out');
    expect(navbarTsx).toContain('getInitials');
  });

  it('defines profiles table schema with RLS and signup trigger in supabase_schema.sql', () => {
    expect(schemaSql).toContain('CREATE TABLE IF NOT EXISTS public.profiles');
    expect(schemaSql).toContain('ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY');
    expect(schemaSql).toContain('CREATE POLICY "Allow users to read their own profile"');
    expect(schemaSql).toContain('CREATE OR REPLACE FUNCTION public.handle_new_user()');
    expect(schemaSql).toContain('CREATE TRIGGER on_auth_user_created');
  });

  it('authService executes sign in and sign up operations with Supabase client', async () => {
    // Mock Supabase Auth calls
    const signUpSpy = vi.spyOn(supabase.auth, 'signUp').mockResolvedValueOnce({
      data: {
        user: { id: 'usr-123', email: 'test@libnotes.edu', app_metadata: {}, user_metadata: {}, aud: 'authenticated', created_at: '' },
        session: null,
      },
      error: null,
    });

    const res = await signUpUser('test@libnotes.edu', 'Secret123', 'Test Student');
    expect(signUpSpy).toHaveBeenCalled();
    expect(res.success).toBe(true);
    expect(res.needsEmailConfirmation).toBe(true);

    const signInSpy = vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValueOnce({
      data: {
        // @ts-expect-error mock session object
        user: { id: 'usr-123', email: 'test@libnotes.edu' },
        // @ts-expect-error mock session object
        session: { access_token: 'fake-token' },
      },
      error: null,
    });

    const loginRes = await signInUser('test@libnotes.edu', 'Secret123');
    expect(signInSpy).toHaveBeenCalled();
    expect(loginRes.success).toBe(true);
    expect(loginRes.data?.session).toBeDefined();

    const signOutSpy = vi.spyOn(supabase.auth, 'signOut').mockResolvedValueOnce({
      error: null,
    });

    const signOutRes = await signOutUser();
    expect(signOutSpy).toHaveBeenCalled();
    expect(signOutRes.success).toBe(true);

    const resetSpy = vi.spyOn(supabase.auth, 'resetPasswordForEmail').mockResolvedValueOnce({
      data: {},
      error: null,
    });

    const resetRes = await sendPasswordResetEmail('test@libnotes.edu');
    expect(resetSpy).toHaveBeenCalled();
    expect(resetRes.success).toBe(true);

    const updateSpy = vi.spyOn(supabase.auth, 'updateUser').mockResolvedValueOnce({
      data: {
        // @ts-expect-error mock user object
        user: { id: 'usr-123' },
      },
      error: null,
    });

    const updateRes = await updateUserPassword('NewPass123');
    expect(updateSpy).toHaveBeenCalled();
    expect(updateRes.success).toBe(true);
  });
});

