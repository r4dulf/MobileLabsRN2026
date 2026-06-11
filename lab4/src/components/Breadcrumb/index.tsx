import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';

type Segment = {
  name: string;
  path: string;
};

type BreadcrumbProps = {
  currentPath: string;
  rootPath: string;
  onNavigate: (path: string) => void;
};

const Breadcrumb = ({ currentPath, rootPath, onNavigate }: BreadcrumbProps) => {
  const theme = useTheme();

  const relativePath = currentPath.replace(rootPath, '');
  const parts = relativePath.split('/').filter(Boolean);

  const segments: Segment[] = [
    { name: 'Головна', path: rootPath },
    ...parts.map((part, idx) => ({
      name: part,
      path: rootPath + parts.slice(0, idx + 1).join('/') + '/',
    })),
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundElement, borderBottomColor: theme.separator }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {segments.map((segment, idx) => (
          <View key={segment.path} style={styles.segment}>
            {idx > 0 && (
              <Ionicons name="chevron-forward" size={14} color={theme.textSecondary} />
            )}
            <TouchableOpacity
              onPress={() => onNavigate(segment.path)}
              disabled={idx === segments.length - 1}
            >
              <ThemedText
                type="small"
                themeColor={idx === segments.length - 1 ? 'text' : 'textSecondary'}
              >
                {segment.name}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scroll: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    flexDirection: 'row',
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
});

export default Breadcrumb;
