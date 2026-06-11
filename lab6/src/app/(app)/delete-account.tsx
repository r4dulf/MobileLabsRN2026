import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';

export default function DeleteAccountScreen() {
  const { deleteAccount } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    if (!password) return;
    Alert.alert(
      'Видалити акаунт?',
      'Цю дію неможливо скасувати. Всі ваші дані будуть видалені назавжди.',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await deleteAccount(password);
              router.replace('/login');
            } catch (e: any) {
              Alert.alert('Помилка', e.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const inputStyle = [
    styles.input,
    { backgroundColor: theme.backgroundElement, color: theme.text, borderColor: theme.backgroundSelected },
  ];

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.four }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <ThemedText type="linkPrimary">← Назад</ThemedText>
      </TouchableOpacity>

      <ThemedText type="subtitle" style={styles.heading}>
        Видалення акаунту
      </ThemedText>

      <View style={[styles.warningBox, { backgroundColor: '#FF3B301A', borderColor: '#FF3B30' }]}>
        <ThemedText type="small" style={styles.warningText}>
          Попередження: після видалення акаунту всі ваші дані буде безповоротно втрачено. Для підтвердження введіть
          ваш поточний пароль.
        </ThemedText>
      </View>

      <View style={styles.form}>
        <TextInput
          style={inputStyle}
          placeholder="Введіть пароль для підтвердження"
          placeholderTextColor={theme.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.deleteBtn, loading && styles.disabled]}
          onPress={handleDelete}
          disabled={loading}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.deleteBtnText}>
            {loading ? 'Видалення...' : 'Видалити акаунт'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.three },
  back: { marginBottom: Spacing.three },
  heading: { marginBottom: Spacing.three },
  warningBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  warningText: { lineHeight: 20 },
  form: { gap: Spacing.two },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  deleteBtnText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
  disabled: { opacity: 0.5 },
});
