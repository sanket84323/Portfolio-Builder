export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function generateSlug(name: string): string {
  const base = slugify(name);
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getVideoEmbedUrl(url: string, type: 'youtube' | 'vimeo' | 'upload'): string {
  if (type === 'youtube') {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (type === 'vimeo') {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url;
}

export function getVideoThumbnail(url: string, type: 'youtube' | 'vimeo' | 'upload'): string {
  if (type === 'youtube') {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return '';
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
