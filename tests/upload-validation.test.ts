import { describe, it, expect } from 'vitest';
import { validateEducationalFile, formatFileSize } from '../src/utils/fileValidation';

describe('Checkpoint 4: Video Upload File Validation', () => {
  it('accepts valid video formats (.mp4, .mkv, .mov, .webm)', () => {
    const mp4File = new File(['dummy video content'], 'lecture.mp4', { type: 'video/mp4' });
    const res = validateEducationalFile(mp4File);
    expect(res.valid).toBe(true);
    expect(res.mimeCategory).toBe('video');
    expect(res.extension).toBe('mp4');
  });

  it('accepts valid audio formats (.mp3, .wav, .m4a)', () => {
    const mp3File = new File(['dummy audio content'], 'recording.mp3', { type: 'audio/mpeg' });
    const res = validateEducationalFile(mp3File);
    expect(res.valid).toBe(true);
    expect(res.mimeCategory).toBe('audio');
    expect(res.extension).toBe('mp3');
  });

  it('rejects unsupported and potentially dangerous formats (.exe, .zip, .pdf)', () => {
    const exeFile = new File(['bad'], 'malware.exe', { type: 'application/x-msdownload' });
    const res = validateEducationalFile(exeFile);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('Unsupported format ".exe"');

    const zipFile = new File(['zip'], 'archive.zip', { type: 'application/zip' });
    const zipRes = validateEducationalFile(zipFile);
    expect(zipRes.valid).toBe(false);
  });

  it('rejects empty 0-byte files with helpful guidance', () => {
    const emptyFile = new File([], 'empty.mp4', { type: 'video/mp4' });
    const res = validateEducationalFile(emptyFile);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('0 bytes');
  });

  it('enforces the 500 MB file size limit', () => {
    // Create mock object with size > 500 MB
    const largeFile = {
      name: 'large_lecture.mp4',
      size: 550 * 1024 * 1024,
      type: 'video/mp4',
    } as File;

    const res = validateEducationalFile(largeFile);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('exceeds the 500 MB limit');
  });

  it('formats file sizes accurately into human-readable units', () => {
    expect(formatFileSize(500)).toBe('500 B');
    expect(formatFileSize(1024 * 250)).toBe('250.0 KB');
    expect(formatFileSize(1024 * 1024 * 42.5)).toBe('42.5 MB');
  });
});
