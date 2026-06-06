export type FileSystemItem = {
  name: string;
  uri: string;
  isDirectory: boolean;
  size?: number;
  modificationTime?: number;
  extension?: string;
};

export type StorageInfo = {
  total: number;
  free: number;
  used: number;
};

export type CreateType = 'folder' | 'file' | null;
