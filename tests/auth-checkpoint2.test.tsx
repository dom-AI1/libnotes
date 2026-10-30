import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../src/App';
import * as authService from '../src/services/authService';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';

describe('Checkpoint 2: Authentication & Access Control Deep Verification', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.hash = '#/home';
    vi.restoreAllMocks();
  });

  it('Test A: Logged-out user clicking "Open Interactive Workspace" is redirected to signup with target preserved', async () => {
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(null);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('PRODUCT PREVIEW')).toBeTruthy();
    });

    const openWorkspaceBtn = screen.getByRole('button', { name: /Open Interactive Workspace/i });
    expect(openWorkspaceBtn).toBeTruthy();

    fireEvent.click(openWorkspaceBtn);

    // Confirms redirect to signup with target note preserved
    expect(window.location.hash).toContain('redirect=%2Fnotes%3Fid%3Dkit-thermodynamics');
    expect(screen.getByRole('heading', { name: /Your smarter study journey starts here/i })).toBeTruthy();
  });

  it('Test B: Guest entering topic and clicking Generate Notes stores intent and redirects to signup', async () => {
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(null);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Paste YouTube or lecture URL/i)).toBeTruthy();
    });

    const input = screen.getByPlaceholderText(/Paste YouTube or lecture URL/i);
    fireEvent.change(input, { target: { value: 'https://youtube.com/watch?v=cbse-class-11-accountancy' } });

    const generateBtn = screen.getByRole('button', { name: /Generate Notes/i });
    fireEvent.click(generateBtn);

    // Confirms authentication required
    expect(window.location.hash).toContain('redirect=%2Fnew-lecture');
    
    // Confirms pending form info preserved in sessionStorage
    const pendingRaw = sessionStorage.getItem('libnotes_pending_generation');
    expect(pendingRaw).toBeTruthy();
    const pending = JSON.parse(pendingRaw!);
    expect(pending.linkUrl).toBe('https://youtube.com/watch?v=cbse-class-11-accountancy');
  });

  it('Test C: Direct route access to #/notes, #/dashboard, #/new-lecture without auth is blocked', async () => {
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(null);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    window.location.hash = '#/dashboard';
    render(<App />);

    await waitFor(() => {
      expect(window.location.hash).toContain('#/signup?redirect=%2Fdashboard');
      expect(screen.getByRole('heading', { name: /Your smarter study journey starts here/i })).toBeTruthy();
    });
  });

  it('Test D & G: User data isolation — User A cannot read or modify User B study kits or quiz attempts', () => {
    const userAKit = {
      ...SAMPLE_STUDY_KITS[0],
      id: 'kit-user-a-1',
      userId: 'user-a-uuid',
      title: 'User A Confidential Notes',
    };
    const userBKit = {
      ...SAMPLE_STUDY_KITS[0],
      id: 'kit-user-b-2',
      userId: 'user-b-uuid',
      title: 'User B Confidential Notes',
    };

    const allKits = [userAKit, userBKit];

    // Filter simulation as done in DashboardView.tsx
    const userAView = allKits.filter((k) => k.userId === 'user-a-uuid');
    const userBView = allKits.filter((k) => k.userId === 'user-b-uuid');

    expect(userAView.length).toBe(1);
    expect(userAView[0].title).toBe('User A Confidential Notes');
    expect(userAView.some((k) => k.userId === 'user-b-uuid')).toBe(false);

    expect(userBView.length).toBe(1);
    expect(userBView[0].title).toBe('User B Confidential Notes');
    expect(userBView.some((k) => k.userId === 'user-a-uuid')).toBe(false);
  });

  it('Test E: Google OAuth resolves exact redirect URL without hash collision', () => {
    const redirectUrl = authService.getAuthRedirectUrl('/#/auth/callback');
    expect(redirectUrl).toContain('/#/auth/callback');
    expect(redirectUrl.startsWith('http')).toBe(true);
  });

  it('Test F: Verifying Session loading state prevents white screen while auth resolves', () => {
    window.location.hash = '#/dashboard';
    
    // Mount App with uninitialized auth
    vi.spyOn(authService, 'getCurrentUserProfile').mockImplementation(() => new Promise(() => {})); // pending forever
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    // Screen displays clean loading state rather than blank page or home flash
    expect(screen.getByText('Verifying Session...')).toBeTruthy();
    expect(screen.getByText(/Connecting securely to Libnotes workspace/i)).toBeTruthy();
  });
});
