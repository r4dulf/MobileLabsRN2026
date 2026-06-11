import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Помилка входу', e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = [
    styles.input,
    { backgroundColor: theme.backgroundElement, color: theme.text, borderColor: theme.backgroundSelected },
  ];

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.six }]}>
      <ThemedText type="subtitle" style={styles.heading}>
        Вхід
      </ThemedText>

      <View style={styles.form}>
        <TextInput
          style={inputStyle}
          placeholder="Email"
          placeholderTextColor={theme.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={inputStyle}
          placeholder="Пароль"
          placeholderTextColor={theme.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading} activeOpacity={0.8}>
          <ThemedText style={styles.buttonText}>{loading ? 'Завантаження...' : 'Увійти'}</ThemedText>
        </TouchableOpacity>

        <Link href="/forgot-password" style={styles.linkRow}>
          <ThemedText type="linkPrimary">Забули пароль?</ThemedText>
        </Link>

        <Link href="/register" style={styles.linkRow}>
          <ThemedText type="linkPrimary">Немає акаунту? Зареєструватися</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.three },
  heading: { marginBottom: Spacing.four },
  form: { gap: Spacing.two },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#208AEF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
  linkRow: { alignSelf: 'center', marginTop: Spacing.one },
});
