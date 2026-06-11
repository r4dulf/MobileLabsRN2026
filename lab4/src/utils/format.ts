export const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
};

export const formatDate = (timestamp: number): string => {
  const ms = timestamp < 1e10 ? timestamp * 1000 : timestamp;
  return new Date(ms).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getFileTypeLabel = (extension?: string): string => {
  if (!extension) return 'Невідомий тип';
  const map: Record<string, string> = {
    txt: 'Текстовий файл (.txt)',
    pdf: 'PDF документ (.pdf)',
    jpg: 'Зображення JPEG (.jpg)',
    jpeg: 'Зображення JPEG (.jpeg)',
    png: 'Зображення PNG (.png)',
    json: 'JSON файл (.json)',
    js: 'JavaScript файл (.js)',
    ts: 'TypeScript файл (.ts)',
    html: 'HTML файл (.html)',
    css: 'CSS файл (.css)',
    md: 'Markdown файл (.md)',
  };
  return map[extension.toLowerCase()] ?? `Файл .${extension}`;
};
