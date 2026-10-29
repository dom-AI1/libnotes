import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  checkAndConsumePdfQuota, 
  getRemainingDailyPdfQuota,
  getCurrentUtcDateString,
  getNextUtcMidnightIso 
} from '../src/services/quotaService';

describe('Phase 9: Free-Plan Resource Protection & PDF Quota', () => {
  const testUserId = 'user-test-uuid-123';
  const testKitId1 = 'kit-physics-thermo';
  const testKitId2 = 'kit-chemistry-kinetics';

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('correctly calculates current UTC date string and next UTC midnight ISO', () => {
    const utcDate = getCurrentUtcDateString();
    expect(utcDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const nextMidnight = getNextUtcMidnightIso();
    expect(nextMidnight).toMatch(/^\d{4}-\d{2}-\d{2}T00:00:00.000Z$/);
    const dateObj = new Date(nextMidnight);
    expect(dateObj.getUTCHours()).toBe(0);
    expect(dateObj.getUTCMinutes()).toBe(0);
  });

  it('allows the first new PDF generation of the UTC calendar day', async () => {
    const result = await checkAndConsumePdfQuota(testUserId, testKitId1, 'topper');
    expect(result.allowed).toBe(true);
    expect(result.isRedownload).toBe(false);
    expect(result.remainingGenerations).toBe(0);
    expect(result.message).toContain('approved');
  });

  it('permits unlimited re-downloads of the SAME previously generated PDF without consuming quota', async () => {
    // First generation
    const first = await checkAndConsumePdfQuota(testUserId, testKitId1, 'topper');
    expect(first.allowed).toBe(true);
    expect(first.isRedownload).toBe(false);

    // Re-download same kit and same mode
    const redownload = await checkAndConsumePdfQuota(testUserId, testKitId1, 'topper');
    expect(redownload.allowed).toBe(true);
    expect(redownload.isRedownload).toBe(true);
    expect(redownload.message).toContain('previously generated');

    // A third re-download of the same kit
    const third = await checkAndConsumePdfQuota(testUserId, testKitId1, 'topper');
    expect(third.allowed).toBe(true);
    expect(third.isRedownload).toBe(true);
  });

  it('blocks a SECOND NEW PDF generation in the same UTC calendar day', async () => {
    // Generate first kit
    await checkAndConsumePdfQuota(testUserId, testKitId1, 'topper');

    // Try to generate a different kit in the same UTC day
    const second = await checkAndConsumePdfQuota(testUserId, testKitId2, 'quick');
    expect(second.allowed).toBe(false);
    expect(second.isRedownload).toBe(false);
    expect(second.remainingGenerations).toBe(0);
    expect(second.message).toContain('Daily Limit Reached');
  });

  it('correctly reports remaining daily quota via getRemainingDailyPdfQuota', async () => {
    const initial = getRemainingDailyPdfQuota(testUserId);
    expect(initial.remaining).toBe(1);

    await checkAndConsumePdfQuota(testUserId, testKitId1, 'chatpata');

    const afterOne = getRemainingDailyPdfQuota(testUserId);
    expect(afterOne.remaining).toBe(0);
  });

  it('resets daily quota when calendar day advances to the next UTC day', async () => {
    // Simulate quota consumed yesterday
    const yesterdayUtc = '2026-10-28';
    const fakeRecord = {
      utcDate: yesterdayUtc,
      userId: testUserId,
      generatedKitModes: [`${testKitId1}:topper`],
      count: 1,
    };
    localStorage.setItem(`libnotes_pdf_quota_v1_${testUserId}`, JSON.stringify(fakeRecord));

    // When checking today (2026-10-29 UTC), quota should be refreshed to 1
    const quotaState = getRemainingDailyPdfQuota(testUserId);
    expect(quotaState.remaining).toBe(1);

    // Generating a new kit today should be allowed
    const result = await checkAndConsumePdfQuota(testUserId, testKitId2, 'exam');
    expect(result.allowed).toBe(true);
    expect(result.isRedownload).toBe(false);

    // But yesterday's kit can still be re-downloaded free of charge
    const redownloadYesterday = await checkAndConsumePdfQuota(testUserId, testKitId1, 'topper');
    expect(redownloadYesterday.allowed).toBe(true);
    expect(redownloadYesterday.isRedownload).toBe(true);
  });

  it('handles anonymous guest users safely with isolated local quota', async () => {
    const res1 = await checkAndConsumePdfQuota(null, testKitId1, 'quick');
    expect(res1.allowed).toBe(true);

    const res2 = await checkAndConsumePdfQuota(null, testKitId2, 'topper');
    expect(res2.allowed).toBe(false);
    expect(res2.message).toContain('Daily Limit Reached');
  });
});
