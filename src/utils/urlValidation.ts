export interface UrlValidationResult {
  valid: boolean;
  provider?: 'youtube' | 'vimeo' | 'direct' | 'unsupported';
  providerLabel?: string;
  videoId?: string;
  error?: string;
  notice?: string;
}

export function validateLectureUrl(rawUrl: string): UrlValidationResult {
  const trimmed = rawUrl.trim();

  if (!trimmed) {
    return { valid: false, error: 'Please enter a lecture video URL.' };
  }

  // Parse URL
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { valid: false, error: 'Invalid URL format. Please include https:// or http:// in the address.' };
  }

  // Security checks: Block internal IP addresses, loopback and private ranges to prevent SSRF
  const hostname = parsed.hostname.toLowerCase();
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.endsWith('.local') ||
    parsed.protocol === 'file:' ||
    parsed.protocol === 'ftp:' ||
    parsed.protocol === 'javascript:'
  ) {
    return {
      valid: false,
      error: 'Security Error: Local and non-HTTP address fetching is strictly prohibited for external video processing.',
    };
  }

  // YouTube match
  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
    let videoId = '';
    if (hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1);
    } else {
      videoId = parsed.searchParams.get('v') || '';
    }

    if (!videoId && !parsed.pathname.includes('/live/')) {
      return {
        valid: false,
        error: 'YouTube URL does not specify a valid video ID (e.g. ?v=...).',
      };
    }

    return {
      valid: true,
      provider: 'youtube',
      providerLabel: 'YouTube Lecture',
      videoId,
      notice: 'Public and unlisted YouTube lectures supported. Private links require local MP4 upload.',
    };
  }

  // Vimeo match
  if (hostname.includes('vimeo.com')) {
    const videoId = parsed.pathname.split('/').filter(Boolean)[0] || '';
    return {
      valid: true,
      provider: 'vimeo',
      providerLabel: 'Vimeo Recording',
      videoId,
      notice: 'Public Vimeo lectures supported.',
    };
  }

  // Direct MP4 / WebM / Media match
  if (parsed.pathname.endsWith('.mp4') || parsed.pathname.endsWith('.webm') || parsed.pathname.endsWith('.m3u8')) {
    return {
      valid: true,
      provider: 'direct',
      providerLabel: 'Direct Media Link',
      notice: 'Direct public streaming link supported.',
    };
  }

  // Other domains
  return {
    valid: false,
    provider: 'unsupported',
    error: `Provider "${hostname}" is not officially supported for direct web stream extraction. Please upload an MP4 recording of your lecture instead.`,
  };
}

/**
 * Attempt to fetch the public video title from YouTube or Vimeo via oEmbed with timeout.
 */
export async function fetchVideoTitleFromUrl(rawUrl: string): Promise<string | null> {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();

    // 1. YouTube oEmbed
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      try {
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(trimmed)}&format=json`;
        const res = await fetch(oembedUrl, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) return data.title as string;
        }
      } catch {
        clearTimeout(timer);
      }
    }

    // 2. Vimeo oEmbed
    if (hostname.includes('vimeo.com')) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      try {
        const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(trimmed)}`;
        const res = await fetch(oembedUrl, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) return data.title as string;
        }
      } catch {
        clearTimeout(timer);
      }
    }

    // 3. Fallback: Parse query parameters or pathname slug if present
    const searchParams = parsed.searchParams;
    const queryTitle = searchParams.get('title') || searchParams.get('topic') || searchParams.get('q');
    if (queryTitle) return decodeURIComponent(queryTitle);

    // If pathname has slug keywords like /watch/photosynthesis-light-reaction
    const pathSegments = parsed.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment && lastSegment.length > 5 && (lastSegment.includes('-') || lastSegment.includes('_'))) {
      const cleanSlug = lastSegment.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]/g, ' ');
      if (cleanSlug.includes(' ') && !/^[a-zA-Z0-9]{11}$/.test(cleanSlug)) {
        return cleanSlug;
      }
    }
  } catch {
    return null;
  }

  return null;
}

