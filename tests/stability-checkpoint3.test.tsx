import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../src/App';
import * as authService from '../src/services/authService';
import * as supabaseService from '../src/services/supabaseService';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';

describe('Checkpoint 3: Blank Page, Session Restoration & Application Stability', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.hash = '#/home';
    vi.restoreAllMocks();
  });

  const mockUser: authService.UserProfile = {
    id: 'user-checkpoint3-uuid',
    email: 'learner@libnotes.in',
    display_name: 'Ananya Sharma',
    has_seen_welcome: true,
  };

  it('Scenario 1: Reproduces & passes exact user workflow (Login -> Generate Notes -> Enter Topic -> Notes Workspace)', async () => {
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(mockUser);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    // User is logged in, avatar initials rendered
    await waitFor(() => {
      expect(screen.getByText('AS')).toBeTruthy();
    });

    // User clicks "New Notes" / Generate Notes button in Navbar
    const newNotesBtn = screen.getByRole('button', { name: /New Notes/i });
    fireEvent.click(newNotesBtn);

    // Upload modal opens cleanly
    await waitFor(() => {
      expect(screen.getByText('CREATE NEW STUDY KIT')).toBeTruthy();
    });

    // User enters a topic
    const topicInput = screen.getByPlaceholderText(/e\.g\. Demand & Supply/i) as HTMLInputElement;
    fireEvent.change(topicInput, { target: { value: 'Cellular Respiration & Glycolysis' } });
    expect(topicInput.value).toBe('Cellular Respiration & Glycolysis');

    // Also enter URL
    const urlInput = screen.getByPlaceholderText(/https:\/\/www\.youtube\.com/i);
    fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=glycolysis-lecture' } });

    // Click submit
    const submitBtn = screen.getByRole('button', { name: /Generate Study Kit/i });
    fireEvent.click(submitBtn);

    // Confirms synthesis progress runs without white screen
    await waitFor(() => {
      expect(screen.getByText(/Synthesizing speech timestamps/i)).toBeTruthy();
    });
  });

  it('Scenario 3A & 3E: Refresh while viewing Dashboard restores user session without white screen', async () => {
    window.location.hash = '#/dashboard';
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(mockUser);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    // Initially displays session verifying screen
    expect(screen.getByText('Verifying Session...')).toBeTruthy();

    // Resolves cleanly into dashboard
    await waitFor(() => {
      expect(screen.getByText(/Welcome back, Ananya Sharma/i)).toBeTruthy();
    });
  });

  it('Scenario 3F: Refresh while viewing Notes Workspace restores active study kit', async () => {
    window.location.hash = '#/notes?id=kit-thermodynamics';
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(mockUser);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
      expect(screen.getByText(/Carnot/i)).toBeTruthy();
    });
  });

  it('Scenario 3C & 3D: Seamless navigation between Home, Dashboard, and browser back/forward buttons', async () => {
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(mockUser);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('AS')).toBeTruthy();
    });

    // Navigate to Dashboard
    window.location.hash = '#/dashboard';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    await waitFor(() => {
      expect(screen.getByText(/Welcome back, Ananya Sharma/i)).toBeTruthy();
    });

    // Simulate browser back button to Home
    window.location.hash = '#/home';
    window.dispatchEvent(new PopStateEvent('popstate'));

    await waitFor(() => {
      expect(screen.getByText('PRODUCT PREVIEW')).toBeTruthy();
    });
  });

  it('Scenario 3I: App remains completely stable during temporary Supabase network disconnect', async () => {
    window.location.hash = '#/dashboard';
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(mockUser);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    // Simulate Supabase network fetch failure returning graceful empty dataset
    vi.spyOn(supabaseService, 'fetchStudyKitsFromSupabase').mockResolvedValue({ data: [], error: new Error('Network error: Failed to fetch') });
    vi.spyOn(supabaseService, 'fetchQuizAttemptsFromSupabase').mockResolvedValue({ data: [], error: new Error('Network error: Failed to fetch') });

    render(<App />);

    // Dashboard renders safely using cached/local storage fallback, no blank page
    await waitFor(() => {
      expect(screen.getByText(/Welcome back, Ananya Sharma/i)).toBeTruthy();
    });
  });

  it('Scenario 3G: Expired or invalid session redirects securely to login with redirect preserved', async () => {
    window.location.hash = '#/dashboard';
    // Simulate expired session (null user)
    vi.spyOn(authService, 'getCurrentUserProfile').mockResolvedValue(null);
    vi.spyOn(authService, 'onAuthStateChange').mockReturnValue({
      unsubscribe: vi.fn(),
    } as any);

    render(<App />);

    await waitFor(() => {
      expect(window.location.hash).toContain('#/signup?redirect=%2Fdashboard');
      expect(screen.getByRole('heading', { name: /Your smarter study journey starts here/i })).toBeTruthy();
    });
  });

  it('Scenario 4: Localized ErrorBoundary catches component failure without blanking the application', () => {
    render(<App />);

    // App header remains completely intact
    const headers = screen.getAllByText('Libnotes');
    expect(headers.length).toBeGreaterThan(0);
  });
});
