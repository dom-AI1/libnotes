import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AIVideoSection } from '../src/components/AIVideoSection';
import { AIVideoModal } from '../src/components/AIVideoModal';
import { Hero } from '../src/components/Hero';

describe('Libnotes — AI Video Explainer & Quickstart Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock speechSynthesis
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        speak: vi.fn(),
        cancel: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders AIVideoSection with "About Us" video scenes by default', () => {
    render(<AIVideoSection initialVideo="about" />);
    
    // Check title and scene badge
    expect(screen.getByText(/Libnotes AI Video Studio/i)).toBeTruthy();
    expect(screen.getByText(/SCENE 1 · THE PAIN POINT/i)).toBeTruthy();
    expect(screen.getByText(/Students spend 80% of study time pausing videos/i)).toBeTruthy();
  });

  it('switches between "About Us" and "Login & Chatbot Notes" video modes', async () => {
    render(<AIVideoSection initialVideo="about" />);
    
    // Find mode buttons
    const tutorialBtn = screen.getByText(/2. Login & Chatbot Notes/i);
    await act(async () => {
      fireEvent.click(tutorialBtn);
    });

    // Check tutorial scene badge and content
    expect(screen.getByText(/STEP 1 · 1-CLICK AUTH/i)).toBeTruthy();
    expect(screen.getByText(/Log in with Google or Email in 5 Seconds/i)).toBeTruthy();
  });

  it('supports playback pause, resume, and voice narration toggle', async () => {
    render(<AIVideoSection initialVideo="tutorial" />);
    
    // Pause button
    const pauseBtn = screen.getByTitle('Pause');
    expect(pauseBtn).toBeTruthy();

    await act(async () => {
      fireEvent.click(pauseBtn);
    });

    // Should now show Play
    expect(screen.getByTitle('Play')).toBeTruthy();

    // Toggle mute
    const soundBtn = screen.getByTitle(/Turn Sound On/i);
    await act(async () => {
      fireEvent.click(soundBtn);
    });
    expect(screen.getByText(/Voice ON/i)).toBeTruthy();
  });

  it('renders Hero with direct AI Video triggers to avoid heavy scrolling text', () => {
    const handleWatch = vi.fn();
    render(
      <Hero
        onStartGeneration={vi.fn()}
        onSelectSample={vi.fn()}
        isAuthenticated={false}
        onWatchVideo={handleWatch}
      />
    );

    const watchBtn = screen.getByText(/▶ Watch 60s Guide: Login to Chatbot Notes/i);
    expect(watchBtn).toBeTruthy();

    fireEvent.click(watchBtn);
    expect(handleWatch).toHaveBeenCalledWith('tutorial');
  });

  it('opens and closes AIVideoModal correctly', () => {
    const handleClose = vi.fn();
    const { rerender } = render(
      <AIVideoModal
        isOpen={false}
        onClose={handleClose}
        initialVideo="tutorial"
      />
    );

    // Modal closed: null
    expect(screen.queryByText(/Libnotes Interactive Video Guide/i)).toBeNull();

    // Rerender open
    rerender(
      <AIVideoModal
        isOpen={true}
        onClose={handleClose}
        initialVideo="tutorial"
      />
    );

    expect(screen.getByText(/Libnotes Interactive Video Guide/i)).toBeTruthy();

    // Click close button
    const closeBtn = screen.getByLabelText('Close video player');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
