export interface FileValidationResult {
  valid: boolean;
  error?: string;
  formattedSize?: string;
  mimeCategory?: 'video' | 'audio';
  extension?: string;
}

export const SUPPORTED_VIDEO_EXTENSIONS = ['mp4', 'mkv', 'mov', 'avi', 'webm'];
export const SUPPORTED_AUDIO_EXTENSIONS = ['mp3', 'wav', 'm4a', 'aac', 'ogg'];
export const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateEducationalFile(file: File): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'No file was provided.' };
  }

  // Check file size
  if (file.size === 0) {
    return { valid: false, error: 'The selected file is empty (0 bytes). Please select a valid recording.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 500 MB limit (${formatFileSize(file.size)}). Please compress the video or select a shorter clip.`,
      formattedSize: formatFileSize(file.size),
    };
  }

  // Extract extension
  const nameParts = file.name.split('.');
  if (nameParts.length < 2) {
    return {
      valid: false,
      error: 'File has no extension. Please select an MP4, MKV, MOV or MP3 educational file.',
    };
  }

  const extension = nameParts.pop()?.toLowerCase() || '';

  const isVideo = SUPPORTED_VIDEO_EXTENSIONS.includes(extension) || file.type.startsWith('video/');
  const isAudio = SUPPORTED_AUDIO_EXTENSIONS.includes(extension) || file.type.startsWith('audio/');

  if (!isVideo && !isAudio) {
    return {
      valid: false,
      error: `Unsupported format ".${extension}". Only video (.mp4, .mkv, .mov, .webm) and audio (.mp3, .wav, .m4a) recordings can be processed into notes.`,
      extension,
    };
  }

  return {
    valid: true,
    formattedSize: formatFileSize(file.size),
    mimeCategory: isVideo ? 'video' : 'audio',
    extension,
  };
}

