import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getStorageInfo } from '@/hooks/useFileSystem';
import { StorageInfo } from '@/types';
import { formatSize } from '@/utils/format';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const StorageStats = () => {
  const theme = useTheme();
  const [stats, setStats] = useState<StorageInfo | null>(null);

  useEffect(() => {
    getStorageInfo().then(setStats).catch(() => {});
  }, []);

  if (!stats) return null;

  const usedPercent = stats.total > 0 ? stats.used / stats.total : 0;

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="smallBold">Пам'ять пристрою</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {Math.round(usedPercent * 100)}% використано
        </ThemedText>
      </View>

      <View style={[styles.barTrack, { backgroundColor: theme.storageBar }]}>
        <View
          style={[
            styles.barFill,
            { backgroundColor: theme.accent, width: `${Math.round(usedPercent * 100)}%` },
          ]}
        />
      </View>

      <View style={styles.row}>
        <StatItem label="Загалом" value={formatSize(stats.total)} />
        <StatItem label="Зайнято" value={formatSize(stats.used)} />
        <StatItem label="Вільно" value={formatSize(stats.free)} />
      </View>
    </ThemedView>
  );
};

type StatItemProps = {
  label: string;
  value: string;
};

const StatItem = ({ label, value }: StatItemProps) => (
  <View style={styles.statItem}>
    <ThemedText type="small" themeColor="textSecondary">{label}</ThemedText>
    <ThemedText type="smallBold">{value}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
});

export default StorageStats;
