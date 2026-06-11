import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CreateType } from '@/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type CreateModalProps = {
  type: CreateType;
  onClose: () => void;
  onConfirm: (name: string, content: string) => Promise<void>;
};

const CreateModal = ({ type, onClose, onConfirm }: CreateModalProps) => {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const isFile = type === 'file';
  const title = isFile ? 'Новий файл .txt' : 'Нова папка';

  const handleConfirm = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onConfirm(name.trim(), content);
      setName('');
      setContent('');
      onClose();
    } catch (e) {
      Alert.alert('Помилка', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setContent('');
    onClose();
  };

  return (
    <Modal
      visible={type !== null}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity style={[StyleSheet.absoluteFill, styles.backdrop]} activeOpacity={1} onPress={handleClose} />
        <ThemedView type="backgroundElement" style={styles.modal}>
          <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>

          <View style={styles.field}>
            <ThemedText type="small" themeColor="textSecondary">Назва</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.separator, backgroundColor: theme.background }]}
              value={name}
              onChangeText={setName}
              placeholder={isFile ? 'назва_файлу' : 'назва_папки'}
              placeholderTextColor={theme.textSecondary}
              autoFocus
              autoCapitalize="none"
            />
          </View>

          {isFile && (
            <View style={styles.field}>
              <ThemedText type="small" themeColor="textSecondary">Початковий вміст</ThemedText>
              <TextInput
                style={[styles.input, styles.contentInput, { color: theme.text, borderColor: theme.separator, backgroundColor: theme.background }]}
                value={content}
                onChangeText={setContent}
                placeholder="Введіть текст..."
                placeholderTextColor={theme.textSecondary}
                multiline
                textAlignVertical="top"
              />
            </View>
          )}

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, { borderWidth: 1, borderColor: theme.separator }]}
              onPress={handleClose}
            >
              <ThemedText type="small">Скасувати</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: theme.accent, opacity: !name.trim() || loading ? 0.5 : 1 }]}
              onPress={handleConfirm}
              disabled={loading || !name.trim()}
            >
              <ThemedText type="smallBold" style={styles.confirmText}>
                {loading ? 'Створення...' : 'Створити'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '85%',
    maxWidth: 400,
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    textAlign: 'center',
  },
  field: {
    gap: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.one,
    padding: Spacing.two,
    fontSize: 16,
  },
  contentInput: {
    height: 100,
    paddingTop: Spacing.two,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  btn: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
  },
});

export default CreateModal;
