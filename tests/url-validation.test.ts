import { describe, it, expect } from 'vitest';
import { validateLectureUrl } from '../src/utils/urlValidation';

describe('Checkpoint 5: Video Links Processing & Security Safety', () => {
  it('accepts and identifies standard YouTube watch URLs', () => {
    const res = validateLectureUrl('https://www.youtube.com/watch?v=cbse-phys-thermo');
    expect(res.valid).toBe(true);
    expect(res.provider).toBe('youtube');
    expect(res.videoId).toBe('cbse-phys-thermo');
    expect(res.notice).toContain('Public and unlisted');
  });

  it('accepts short youtu.be links', () => {
    const res = validateLectureUrl('https://youtu.be/k42f8x91');
    expect(res.valid).toBe(true);
    expect(res.provider).toBe('youtube');
    expect(res.videoId).toBe('k42f8x91');
  });

  it('accepts Vimeo video links', () => {
    const res = validateLectureUrl('https://vimeo.com/76979871');
    expect(res.valid).toBe(true);
    expect(res.provider).toBe('vimeo');
  });

  it('accepts direct MP4 media links', () => {
    const res = validateLectureUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    expect(res.valid).toBe(true);
    expect(res.provider).toBe('direct');
  });

  it('rejects invalid or malformed URL strings', () => {
    const res = validateLectureUrl('not-a-valid-url');
    expect(res.valid).toBe(false);
    expect(res.error).toContain('Invalid URL format');
  });

  it('strictly blocks internal, localhost, and loopback IP addresses (SSRF prevention)', () => {
    const resLocalhost = validateLectureUrl('http://localhost:8080/lecture.mp4');
    expect(resLocalhost.valid).toBe(false);
    expect(resLocalhost.error).toContain('Security Error');

    const res127 = validateLectureUrl('http://127.0.0.1:3000/video');
    expect(res127.valid).toBe(false);
    expect(res127.error).toContain('Security Error');

    const resFile = validateLectureUrl('file:///C:/passwords.txt');
    expect(resFile.valid).toBe(false);
    expect(resFile.error).toContain('Security Error');
  });

  it('provides honest fallback message for unsupported domains', () => {
    const res = validateLectureUrl('https://random-unsupported-site.com/video');
    expect(res.valid).toBe(false);
    expect(res.error).toContain('not officially supported');
    expect(res.error).toContain('upload an MP4 recording');
  });
});
