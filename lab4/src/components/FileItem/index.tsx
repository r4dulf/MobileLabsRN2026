import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { FileSystemItem } from '@/types';
import { formatSize } from '@/utils/format';
import { ThemedText } from '@/components/themed-text';

type FileItemProps = {
  item: FileSystemItem;
  onPress: () => void;
  onDelete: () => void;
  onInfo: () => void;
};

const FileItem = ({ item, onPress, onDelete, onInfo }: FileItemProps) => {
  const theme = useTheme();

  const handleDelete = () => {
    Alert.alert(
      'Видалити',
      `Ви впевнені, що хочете видалити "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: theme.separator }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={item.isDirectory ? 'folder' : 'document-text'}
          size={28}
          color={item.isDirectory ? theme.folderColor : theme.fileColor}
        />
      </View>

      <View style={styles.info}>
        <ThemedText type="default" numberOfLines={1}>{item.name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {item.isDirectory ? 'Папка' : item.size !== undefined ? formatSize(item.size) : ''}
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onInfo} hitSlop={8} style={styles.actionBtn}>
          <Ionicons name="information-circle-outline" size={22} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} hitSlop={8} style={styles.actionBtn}>
          <Ionicons name="trash-outline" size={22} color={theme.danger} />
        </TouchableOpacity>
        {item.isDirectory && (
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.two,
  },
  iconContainer: {
    width: 36,
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  actionBtn: {
    padding: Spacing.one,
  },
});

export default FileItem;
