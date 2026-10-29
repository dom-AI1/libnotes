import { describe, it, expect } from 'vitest';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';

describe('Checkpoint 12: Smart Timestamps Synchronization', () => {
  const kit = SAMPLE_STUDY_KITS[0];

  it('stores all timestamps with real numerical seconds and formatted string', () => {
    expect(kit.timestamps.length).toBeGreaterThanOrEqual(4);

    kit.timestamps.forEach((t) => {
      expect(typeof t.seconds).toBe('number');
      expect(t.seconds).toBeGreaterThan(0);
      expect(t.time).toMatch(/^\d{2}:\d{2}$/);
      expect(t.title).toBeDefined();
      expect(t.summary).toBeDefined();

      // Check conversion formula: mm * 60 + ss === seconds
      const [mm, ss] = t.time.split(':').map(Number);
      expect(mm * 60 + ss).toBe(t.seconds);
    });
  });

  it('ensures timestamps are sorted chronologically through the lecture', () => {
    for (let i = 1; i < kit.timestamps.length; i++) {
      expect(kit.timestamps[i].seconds).toBeGreaterThan(kit.timestamps[i - 1].seconds);
    }
  });
});

