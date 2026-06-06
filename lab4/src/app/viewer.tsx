import { useCallback, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ROOT } from '@/hooks/useFileSystem';
import { useTheme } from '@/hooks/use-theme';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const ViewerScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  // Receive relative path (not full URI) to avoid expo-router encoding issues
  const { path, name } = useLocalSearchParams<{ path: string; name: string }>();
  const uri = ROOT + (Array.isArray(path) ? path[0] : path ?? '');

  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [loading, setLoading] = useState(true);

  const isDirty = content !== savedContent;

  useEffect(() => {
    navigation.setOptions({ title: name ?? 'Переглядач' });
  }, [name, navigation]);

  useEffect(() => {
    if (!uri || uri === ROOT) return;
    FileSystem.readAsStringAsync(uri)
      .then((text) => {
        setContent(text);
        setSavedContent(text);
      })
      .catch(() => {
        setContent('');
        setSavedContent('');
      })
      .finally(() => setLoading(false));
  }, [uri]);

  const handleSave = useCallback(async () => {
    if (!uri || uri === ROOT) return;
    try {
      await FileSystem.writeAsStringAsync(uri, content);
      setSavedContent(content);
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти файл');
    }
  }, [uri, content]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: isDirty
        ? () => (
            <TouchableOpacity onPress={handleSave} hitSlop={8}>
              <Ionicons name="save-outline" size={22} color={theme.accent} />
            </TouchableOpacity>
          )
        : undefined,
    });
  }, [isDirty, handleSave, navigation, theme.accent]);

  if (loading) return <ThemedView style={styles.container} />;

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput
          style={[styles.editor, { color: theme.text, backgroundColor: theme.background }]}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          scrollEnabled
        />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  editor: {
    flex: 1,
    padding: Spacing.three,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
});

export default ViewerScreen;
