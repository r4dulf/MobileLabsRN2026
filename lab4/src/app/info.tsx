import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams, useNavigation } from 'expo-router';

import { ROOT } from '@/hooks/useFileSystem';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatDate, formatSize, getFileTypeLabel } from '@/utils/format';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type FileDetails = {
  name: string;
  type: string;
  size: string;
  modified: string;
  isDirectory: boolean;
};

type InfoRowProps = {
  label: string;
  value: string;
};

const InfoRow = ({ label, value }: InfoRowProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.row, { borderBottomColor: theme.separator }]}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>{label}</ThemedText>
      <ThemedText type="small" style={styles.value}>{value}</ThemedText>
    </View>
  );
};

const InfoScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  // Receive relative path (not full URI) to avoid expo-router encoding issues
  const { path } = useLocalSearchParams<{ path: string }>();
  const uri = ROOT + (Array.isArray(path) ? path[0] : path ?? '');

  const [details, setDetails] = useState<FileDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path || uri === ROOT) return;

    FileSystem.getInfoAsync(uri)
      .then((info) => {
        if (!info.exists) {
          setError('Файл не знайдено');
          return;
        }
        const rawName = uri.replace(/\/$/, '').split('/').pop() ?? '';
        const extension = !info.isDirectory && rawName.includes('.') ? rawName.split('.').pop() : undefined;
        setDetails({
          name: rawName,
          type: info.isDirectory ? 'Папка' : getFileTypeLabel(extension),
          size: info.isDirectory ? '—' : formatSize(info.size),
          modified: formatDate(info.modificationTime),
          isDirectory: info.isDirectory,
        });
      })
      .catch((e: Error) => setError(e.message));
  }, [uri]);

  useEffect(() => {
    navigation.setOptions({ title: details?.name ?? 'Інформація' });
  }, [details?.name, navigation]);

  if (error) {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <ThemedText themeColor="danger">{error}</ThemedText>
      </ThemedView>
    );
  }

  if (!details) {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <ActivityIndicator color={theme.accent} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <InfoRow label="Назва" value={details.name} />
        <InfoRow label="Тип" value={details.type} />
        {!details.isDirectory && <InfoRow label="Розмір" value={details.size} />}
        <InfoRow label="Остання зміна" value={details.modified} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: Spacing.three,
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    width: 130,
  },
  value: {
    flex: 1,
  },
});

export default InfoScreen;
