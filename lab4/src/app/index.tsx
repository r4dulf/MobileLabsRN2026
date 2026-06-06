import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useFileSystem } from '@/hooks/useFileSystem';
import { CreateType, FileSystemItem } from '@/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Breadcrumb from '@/components/Breadcrumb';
import CreateModal from '@/components/CreateModal';
import FileItem from '@/components/FileItem';
import StorageStats from '@/components/StorageStats';

const FileManagerScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [createType, setCreateType] = useState<CreateType>(null);

  const {
    items,
    currentPath,
    loading,
    error,
    isRoot,
    rootPath,
    navigateTo,
    navigateUp,
    refresh,
    createFolder,
    createFile,
    deleteItem,
  } = useFileSystem();

  // Override hardware back to navigate up in directory tree
  useFocusEffect(
    useCallback(() => {
      if (isRoot) return;
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigateUp();
        return true;
      });
      return () => handler.remove();
    }, [isRoot, navigateUp])
  );

  const handleItemPress = useCallback(
    (item: FileSystemItem) => {
      if (item.isDirectory) {
        navigateTo(item.uri);
      } else if (item.extension === 'txt') {
        router.push({ pathname: '/viewer', params: { uri: item.uri, name: item.name } });
      } else {
        Alert.alert('Увага', 'Відкрити можна лише .txt файли');
      }
    },
    [navigateTo, router]
  );

  const handleInfo = useCallback(
    (item: FileSystemItem) => {
      router.push({ pathname: '/info', params: { uri: item.uri } });
    },
    [router]
  );

  const handleCreate = useCallback(
    async (name: string, content: string) => {
      if (createType === 'folder') await createFolder(name);
      else if (createType === 'file') await createFile(name, content);
    },
    [createType, createFolder, createFile]
  );

  const renderItem = useCallback(
    ({ item }: { item: FileSystemItem }) => (
      <FileItem
        item={item}
        onPress={() => handleItemPress(item)}
        onDelete={() => deleteItem(item.uri)}
        onInfo={() => handleInfo(item)}
      />
    ),
    [handleItemPress, deleteItem, handleInfo]
  );

  const folderName = isRoot
    ? 'Файловий менеджер'
    : (currentPath.replace(/\/$/, '').split('/').pop() ?? 'Файловий менеджер');

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <ThemedView type="backgroundElement" style={styles.header}>
        {!isRoot && (
          <TouchableOpacity onPress={navigateUp} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
        )}
        <ThemedText type="subtitle" numberOfLines={1} style={styles.headerTitle}>
          {folderName}
        </ThemedText>
        <TouchableOpacity onPress={refresh} hitSlop={8}>
          <Ionicons name="refresh" size={22} color={theme.textSecondary} />
        </TouchableOpacity>
      </ThemedView>

      {isRoot && <StorageStats />}

      <Breadcrumb currentPath={currentPath} rootPath={rootPath} onNavigate={navigateTo} />

      {/* Content */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.accent} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <ThemedText themeColor="danger">{error}</ThemedText>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="folder-open-outline" size={64} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">Папка порожня</ThemedText>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Bottom action bar */}
      <ThemedView
        type="backgroundElement"
        style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.two }]}
      >
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme.folderColor }]}
          onPress={() => setCreateType('folder')}
        >
          <Ionicons name="folder-open-outline" size={20} color="#fff" />
          <ThemedText type="smallBold" style={styles.btnText}>Нова папка</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme.accent }]}
          onPress={() => setCreateType('file')}
        >
          <Ionicons name="document-text-outline" size={20} color="#fff" />
          <ThemedText type="smallBold" style={styles.btnText}>Новий файл</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <CreateModal
        type={createType}
        onClose={() => setCreateType(null)}
        onConfirm={handleCreate}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  headerTitle: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  list: {
    flexGrow: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: Spacing.three,
    gap: Spacing.two,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
  btnText: {
    color: '#fff',
  },
});

export default FileManagerScreen;
