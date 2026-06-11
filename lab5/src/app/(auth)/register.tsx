import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';

export default function RegisterScreen() {
  const { register } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirm) return;
    if (password !== confirm) {
      Alert.alert('Помилка', 'Паролі не співпадають');
      return;
    }
    register(email, password, name);
    router.replace('/');
  };

  const inputStyle = [styles.input, { backgroundColor: theme.backgroundElement, color: theme.text, borderColor: theme.backgroundSelected }];

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.four }]}>
      <ThemedText type="subtitle" style={styles.heading}>
        Реєстрація
      </ThemedText>

      <View style={styles.form}>
        <TextInput
          style={inputStyle}
          placeholder="Ім'я"
          placeholderTextColor={theme.textSecondary}
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          style={inputStyle}
          placeholder="Підтвердження паролю"
          placeholderTextColor={theme.textSecondary}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.8}>
          <ThemedText style={styles.buttonText}>Зареєструватися</ThemedText>
        </TouchableOpacity>

        <Link href="/login" style={styles.linkRow}>
          <ThemedText type="linkPrimary">Вже є акаунт? Увійти</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.three,
  },
  heading: {
    marginBottom: Spacing.four,
  },
  form: {
    gap: Spacing.two,
  },
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
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  linkRow: {
    alignSelf: 'center',
    marginTop: Spacing.two,
  },
});
