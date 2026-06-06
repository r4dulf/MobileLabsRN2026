import * as FileSystem from 'expo-file-system/legacy';
import { useCallback, useEffect, useState } from 'react';

import { FileSystemItem, StorageInfo } from '@/types';

const ROOT = FileSystem.documentDirectory!;

export const useFileSystem = () => {
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [currentPath, setCurrentPath] = useState(ROOT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDirectory = useCallback(async (path: string) => {
    setLoading(true);
    setError(null);
    try {
      const names = await FileSystem.readDirectoryAsync(path);
      const infos = await Promise.all(
        names.map(async (name) => {
          const rawUri = `${path}${name}`;
          const info = await FileSystem.getInfoAsync(rawUri);
          const isDir = info.isDirectory ?? false;
          return {
            name,
            uri: isDir ? `${rawUri}/` : rawUri,
            isDirectory: isDir,
            size: info.exists && !isDir ? (info as any).size : undefined,
            modificationTime: info.exists ? (info as any).modificationTime : undefined,
            extension: !isDir && name.includes('.') ? name.split('.').pop()?.toLowerCase() : undefined,
          } as FileSystemItem;
        })
      );
      infos.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      setItems(infos);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath, loadDirectory]);

  const navigateTo = useCallback((path: string) => setCurrentPath(path), []);

  const navigateUp = useCallback(() => {
    const withoutTrailing = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    const parent = withoutTrailing.slice(0, withoutTrailing.lastIndexOf('/') + 1);
    setCurrentPath(parent.startsWith(ROOT) ? parent : ROOT);
  }, [currentPath]);

  const refresh = useCallback(() => loadDirectory(currentPath), [currentPath, loadDirectory]);

  const createFolder = useCallback(
    async (name: string) => {
      await FileSystem.makeDirectoryAsync(`${currentPath}${name}`, { intermediates: false });
      await loadDirectory(currentPath);
    },
    [currentPath, loadDirectory]
  );

  const createFile = useCallback(
    async (name: string, content: string) => {
      const fileName = name.endsWith('.txt') ? name : `${name}.txt`;
      await FileSystem.writeAsStringAsync(`${currentPath}${fileName}`, content);
      await loadDirectory(currentPath);
    },
    [currentPath, loadDirectory]
  );

  const deleteItem = useCallback(
    async (uri: string) => {
      await FileSystem.deleteAsync(uri, { idempotent: true });
      await loadDirectory(currentPath);
    },
    [currentPath, loadDirectory]
  );

  return {
    items,
    currentPath,
    loading,
    error,
    isRoot: currentPath === ROOT,
    rootPath: ROOT,
    navigateTo,
    navigateUp,
    refresh,
    createFolder,
    createFile,
    deleteItem,
  };
};

export const getStorageInfo = async (): Promise<StorageInfo> => {
  const [free, total] = await Promise.all([
    FileSystem.getFreeDiskStorageAsync(),
    FileSystem.getTotalDiskCapacityAsync(),
  ]);
  return {
    total: total ?? 0,
    free: free ?? 0,
    used: (total ?? 0) - (free ?? 0),
  };
};
