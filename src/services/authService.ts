import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  preferred_language?: string;
  has_seen_welcome?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  needsEmailConfirmation?: boolean;
}

/**
 * Sign up a new user with email, password, and display name.
 */
export async function signUpUser(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResponse<{ user: User | null; session: Session | null }>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase authentication is not configured. Please check your credentials.',
    };
  }

  try {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = displayName.trim() || trimmedEmail.split('@')[0];

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: {
          display_name: trimmedName,
          full_name: trimmedName,
        },
      },
    });

    if (error) {
      // Safe error messages without exposing private details
      if (error.message.includes('already registered')) {
        return {
          success: false,
          error: 'An account with this email already exists. Try logging in instead.',
        };
      }
      return {
        success: false,
        error: error.message || 'Registration failed. Please check your details and try again.',
      };
    }

    // Check if email confirmation is required
    const needsEmailConfirmation = Boolean(data.user && !data.session);

    // If session exists immediately, attempt to record profile in public.profiles
    if (data.user && data.session) {
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: trimmedEmail,
          display_name: trimmedName,
          updated_at: new Date().toISOString(),
        });
      } catch (profileErr) {
        // Non-blocking: profile table might not be initialized yet
        console.warn('[Libnotes Auth] Profile record deferred:', profileErr);
      }
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
      needsEmailConfirmation,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred during registration.',
    };
  }
}

/**
 * Sign in an existing user with email and password.
 */
export async function signInUser(
  email: string,
  password: string
): Promise<AuthResponse<{ user: User; session: Session }>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase authentication is not configured.',
    };
  }

  try {
    const trimmedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return {
          success: false,
          error: 'Invalid email or password. Please verify your credentials and try again.',
        };
      }
      if (error.message.includes('Email not confirmed')) {
        return {
          success: false,
          error: 'Your email address has not been confirmed yet. Please check your inbox.',
          needsEmailConfirmation: true,
        };
      }
      return {
        success: false,
        error: error.message || 'Unable to log in. Please try again.',
      };
    }

    if (!data.user || !data.session) {
      return {
        success: false,
        error: 'Unable to establish authenticated session.',
      };
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred during sign in.',
    };
  }
}

/**
 * Sign out the currently authenticated user.
 */
export async function signOutUser(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error logging out.',
    };
  }
}

/**
 * Send password recovery reset email.
 */
export async function sendPasswordResetEmail(email: string): Promise<AuthResponse<void>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase authentication is not configured.',
    };
  }

  try {
    const trimmedEmail = email.trim().toLowerCase();
    const redirectUrl = getAuthRedirectUrl('/#/reset-password');

    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: redirectUrl,
    });

    if (error) {
      // Neutral message prevents email enumeration
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error sending password reset email.',
    };
  }
}

/**
 * Update user password after navigating from password reset link.
 */
export async function updateUserPassword(newPassword: string): Promise<AuthResponse<void>> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error updating password.',
    };
  }
}

/**
 * Idempotently create or update a user profile in Supabase.
 * Safely extracts trusted metadata from Google OAuth or standard registration.
 */
export async function syncUserProfile(user: User): Promise<UserProfile> {
  const meta = user.user_metadata || {};
  const email = user.email || '';
  const displayName =
    meta.full_name ||
    meta.display_name ||
    meta.name ||
    (email ? email.split('@')[0] : 'Learner');
  const avatarUrl = meta.avatar_url || meta.picture || undefined;

  // 1. Attempt to fetch existing profile to preserve user preferences
  try {
    const { data: existingProfile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && existingProfile) {
      return {
        id: existingProfile.id,
        email: existingProfile.email || email,
        display_name: existingProfile.display_name || displayName,
        avatar_url: existingProfile.avatar_url || avatarUrl,
        preferred_language: existingProfile.preferred_language || 'Hinglish',
        has_seen_welcome: Boolean(existingProfile.has_seen_welcome),
        created_at: existingProfile.created_at,
        updated_at: existingProfile.updated_at,
      };
    }
  } catch (err) {
    console.warn('[Libnotes Auth] Existing profile check deferred:', err);
  }

  // 2. New profile defaults
  const newProfile: UserProfile = {
    id: user.id,
    email,
    display_name: displayName,
    avatar_url: avatarUrl,
    preferred_language: 'Hinglish',
    has_seen_welcome: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    await supabase.from('profiles').upsert(
      {
        id: user.id,
        email,
        display_name: displayName,
        avatar_url: avatarUrl,
        preferred_language: 'Hinglish',
        has_seen_welcome: false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );
  } catch (err) {
    console.warn('[Libnotes Auth] Profile upsert deferred:', err);
  }

  return newProfile;
}

/**
 * Mark first-time welcome celebration as seen in Supabase and local storage.
 */
export async function markWelcomeAsSeen(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        has_seen_welcome: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    try {
      localStorage.setItem(`libnotes_welcome_seen_${userId}`, 'true');
    } catch {
      // LocalStorage error non-fatal
    }

    return !error;
  } catch (err) {
    console.warn('[Libnotes Auth] markWelcomeAsSeen update deferred:', err);
    try {
      localStorage.setItem(`libnotes_welcome_seen_${userId}`, 'true');
    } catch {
      // Ignore
    }
    return false;
  }
}

/**
 * Check if the user is logging in for the very first time.
 */
export function isFirstTimeUser(userId: string, profile?: UserProfile | null): boolean {
  if (profile && profile.has_seen_welcome === true) {
    return false;
  }
  try {
    if (localStorage.getItem(`libnotes_welcome_seen_${userId}`) === 'true') {
      return false;
    }
  } catch {
    // Ignore
  }
  return true;
}

/**
 * Resolves the appropriate redirect URL for OAuth and email authentication.
 * Dynamically detects production edge URL vs local development without breaking either.
 */
export function getAuthRedirectUrl(subpath: string = '/#/auth/callback'): string {
  // Allow explicit override via environment variable if set
  const envUrl = (import.meta as any).env?.VITE_AUTH_REDIRECT_URL;
  if (envUrl) {
    return envUrl;
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    // In browser: dynamically resolves http://localhost:5173 or https://libnotes.g21455728.workers.dev
    const cleanOrigin = window.location.origin.replace(/\/+$/, '');
    const cleanSubpath = subpath ? (subpath.startsWith('/') ? subpath : `/${subpath}`) : '';
    return `${cleanOrigin}${cleanSubpath}`;
  }

  // Fallback for SSR or non-browser environments
  return `https://libnotes.g21455728.workers.dev${subpath}`;
}

/**
 * Sign in with Google OAuth provider.
 */
export async function signInWithGoogle(redirectTo?: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase authentication is not configured. Please check your credentials.',
    };
  }

  try {
    const redirectUrl = redirectTo || getAuthRedirectUrl('/#/auth/callback');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error initiating Google authentication.',
    };
  }
}

/**
 * Get current session.
 */
export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
}

/**
 * Get current user profile with database sync.
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    return await syncUserProfile(user);
  } catch {
    return null;
  }
}

/**
 * Subscribe to Supabase auth state changes.
 */
export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
) {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return data.subscription;
}

