import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';

export default function ForgotPasswordScreen() {
  const { sendPasswordReset } = useAuth();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (e: any) {
      Alert.alert('Помилка', e.message);
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
        Відновлення паролю
      </ThemedText>

      {sent ? (
        <View style={styles.successBox}>
          <ThemedText type="default" style={styles.successText}>
            Лист із посиланням для відновлення надіслано на {email}
          </ThemedText>
          <Link href="/login" style={styles.linkRow}>
            <ThemedText type="linkPrimary">Повернутися до входу</ThemedText>
          </Link>
        </View>
      ) : (
        <View style={styles.form}>
          <ThemedText type="small" themeColor="textSecondary">
            Введіть email вашого акаунту. Ми надішлемо посилання для відновлення паролю.
          </ThemedText>

          <TextInput
            style={inputStyle}
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading} activeOpacity={0.8}>
            <ThemedText style={styles.buttonText}>{loading ? 'Надсилання...' : 'Надіслати лист'}</ThemedText>
          </TouchableOpacity>

          <Link href="/login" style={styles.linkRow}>
            <ThemedText type="linkPrimary">Повернутися до входу</ThemedText>
          </Link>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.three },
  heading: { marginBottom: Spacing.four },
  form: { gap: Spacing.two },
  successBox: { gap: Spacing.three },
  successText: { lineHeight: 24 },
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
