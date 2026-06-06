import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams, useNavigation } from 'expo-router';

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
  const navigation = useNavigation();
  const { uri } = useLocalSearchParams<{ uri: string }>();

  const [details, setDetails] = useState<FileDetails | null>(null);

  useEffect(() => {
    if (!uri) return;
    FileSystem.getInfoAsync(uri).then((info) => {
      if (!info.exists) return;
      const rawName = uri.replace(/\/$/, '').split('/').pop() ?? '';
      const extension = !info.isDirectory && rawName.includes('.') ? rawName.split('.').pop() : undefined;
      setDetails({
        name: rawName,
        type: info.isDirectory ? 'Папка' : getFileTypeLabel(extension),
        size: info.isDirectory ? '—' : formatSize((info as any).size ?? 0),
        modified: formatDate((info as any).modificationTime ?? 0),
        isDirectory: info.isDirectory ?? false,
      });
    });
  }, [uri]);

  useEffect(() => {
    navigation.setOptions({ title: details?.name ?? 'Інформація' });
  }, [details?.name, navigation]);

  if (!details) return <ThemedView style={styles.container} />;

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
