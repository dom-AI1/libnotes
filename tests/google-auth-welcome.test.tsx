import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import {
  signInWithGoogle,
  syncUserProfile,
  isFirstTimeUser,
  markWelcomeAsSeen,
  UserProfile,
} from '../src/services/authService';
import { ChatpataWelcomeModal } from '../src/components/ChatpataWelcomeModal';
import { supabase } from '../src/services/supabaseClient';
import type { User } from '@supabase/supabase-js';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => {
  return {
    default: vi.fn(),
  };
});

describe('Libnotes Google Auth & Chatpata Welcome Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Google OAuth Sign-In', () => {
    it('initiates Google sign-in with offline access and account selection prompt', async () => {
      const signInSpy = vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValueOnce({
        data: { provider: 'google', url: 'https://accounts.google.com/o/oauth2' },
        error: null,
      });

      const result = await signInWithGoogle();
      expect(result.success).toBe(true);
      expect(signInSpy).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: expect.stringContaining('/#/auth/callback'),
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
    });

    it('handles Google sign-in error gracefully', async () => {
      vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValueOnce({
        data: { provider: 'google', url: null },
        error: { name: 'AuthApiError', message: 'Popup closed by user' } as any,
      });

      const result = await signInWithGoogle();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Popup closed by user');
    });
  });

  describe('User Profile Sync (Idempotent)', () => {
    it('returns existing profile without overwriting preferences if profile already exists', async () => {
      const existingDbProfile = {
        id: 'usr-123',
        email: 'priya.sharma@example.com',
        display_name: 'Priya Sharma',
        avatar_url: 'https://lh3.googleusercontent.com/a/photo123',
        preferred_language: 'Hinglish',
        has_seen_welcome: true,
        created_at: '2026-10-25T10:00:00Z',
        updated_at: '2026-10-28T12:00:00Z',
      };

      vi.spyOn(supabase, 'from').mockReturnValueOnce({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValueOnce({
          data: existingDbProfile,
          error: null,
        }),
      } as any);

      const fakeUser: Partial<User> = {
        id: 'usr-123',
        email: 'priya.sharma@example.com',
        user_metadata: {
          full_name: 'Priya S.',
          picture: 'https://new-avatar.com/img.png',
        },
      };

      const profile = await syncUserProfile(fakeUser as User);

      expect(profile.id).toBe('usr-123');
      expect(profile.display_name).toBe('Priya Sharma');
      expect(profile.has_seen_welcome).toBe(true);
    });

    it('creates new profile with has_seen_welcome: false when user has no existing record', async () => {
      // maybeSingle returns null
      const upsertMock = vi.fn().mockResolvedValueOnce({ data: null, error: null });

      vi.spyOn(supabase, 'from')
        .mockReturnValueOnce({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValueOnce({
            data: null,
            error: null,
          }),
        } as any)
        .mockReturnValueOnce({
          upsert: upsertMock,
        } as any);

      const fakeNewUser: Partial<User> = {
        id: 'new-usr-456',
        email: 'kabir.mehta@example.com',
        user_metadata: {
          full_name: 'Kabir Mehta',
          picture: 'https://lh3.googleusercontent.com/kabir.jpg',
        },
      };

      const profile = await syncUserProfile(fakeNewUser as User);

      expect(profile.id).toBe('new-usr-456');
      expect(profile.display_name).toBe('Kabir Mehta');
      expect(profile.avatar_url).toBe('https://lh3.googleusercontent.com/kabir.jpg');
      expect(profile.has_seen_welcome).toBe(false);
      expect(upsertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'new-usr-456',
          has_seen_welcome: false,
          preferred_language: 'Hinglish',
        }),
        { onConflict: 'id' }
      );
    });
  });

  describe('First Time User Determination & Welcome Dismissal', () => {
    it('identifies brand new user as first-time user', () => {
      const profile: UserProfile = {
        id: 'user-789',
        email: 'test@libnotes.com',
        display_name: 'Test Student',
        has_seen_welcome: false,
      };

      expect(isFirstTimeUser('user-789', profile)).toBe(true);
    });

    it('identifies returning user as NOT first-time user when profile.has_seen_welcome is true', () => {
      const profile: UserProfile = {
        id: 'user-789',
        email: 'test@libnotes.com',
        display_name: 'Test Student',
        has_seen_welcome: true,
      };

      expect(isFirstTimeUser('user-789', profile)).toBe(false);
    });

    it('identifies returning user as NOT first-time user if localStorage flag is present', () => {
      localStorage.setItem('libnotes_welcome_seen_user-789', 'true');
      expect(isFirstTimeUser('user-789', null)).toBe(false);
    });

    it('markWelcomeAsSeen updates Supabase profiles and local storage', async () => {
      const updateMock = vi.fn().mockReturnValueOnce({
        eq: vi.fn().mockResolvedValueOnce({ data: null, error: null }),
      });

      vi.spyOn(supabase, 'from').mockReturnValueOnce({
        update: updateMock,
      } as any);

      const success = await markWelcomeAsSeen('user-789');

      expect(success).toBe(true);
      expect(updateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          has_seen_welcome: true,
        })
      );
      expect(localStorage.getItem('libnotes_welcome_seen_user-789')).toBe('true');
    });
  });

  describe('Chatpata Welcome Modal UI', () => {
    it('renders exact headline, body, and button copy', () => {
      const onDismiss = vi.fn();
      render(
        <ChatpataWelcomeModal
          isOpen={true}
          user={{
            id: 'u1',
            email: 'aarav@example.com',
            display_name: 'Aarav Sharma',
          }}
          onDismiss={onDismiss}
        />
      );

      // Exact primary headline
      expect(
        screen.getByText("Arre wah! 🎉 You're officially a Libnotes learner!")
      ).toBeTruthy();

      // Exact supporting text
      expect(
        screen.getByText(/Ab lectures ka load kam, smart notes ka scene on!/i)
      ).toBeTruthy();

      // Exact button copy
      const ctaBtn = screen.getByRole('button', { name: /Let's Get Learning/i });
      expect(ctaBtn).toBeTruthy();

      // Click CTA triggers onDismiss
      fireEvent.click(ctaBtn);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does not render when isOpen is false', () => {
      const { container } = render(
        <ChatpataWelcomeModal
          isOpen={false}
          user={{
            id: 'u1',
            email: 'aarav@example.com',
            display_name: 'Aarav Sharma',
          }}
          onDismiss={vi.fn()}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('displays user avatar image if provided', () => {
      render(
        <ChatpataWelcomeModal
          isOpen={true}
          user={{
            id: 'u1',
            email: 'aarav@example.com',
            display_name: 'Aarav Sharma',
            avatar_url: 'https://example.com/avatar.jpg',
          }}
          onDismiss={vi.fn()}
        />
      );

      const avatar = screen.getByAltText('Aarav Sharma');
      expect(avatar).toBeTruthy();
      expect(avatar.getAttribute('src')).toBe('https://example.com/avatar.jpg');
    });
  });
});
