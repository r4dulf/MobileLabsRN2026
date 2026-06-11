import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth, type UserProfile } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const { user, profile, logout, saveProfile } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<UserProfile>({
    name: profile?.name ?? '',
    age: profile?.age ?? '',
    city: profile?.city ?? '',
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveProfile(form);
      setEditing(false);
      Alert.alert('Успіх', 'Профіль збережено');
    } catch (e: any) {
      Alert.alert('Помилка', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const inputStyle = [
    styles.input,
    { backgroundColor: theme.backgroundElement, color: theme.text, borderColor: theme.backgroundSelected },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + Spacing.four }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="subtitle">Профіль</ThemedText>
          <TouchableOpacity onPress={handleLogout} style={[styles.actionBtn, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="small">Вийти</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.email}>
          {user?.email}
        </ThemedText>

        {editing ? (
          <View style={styles.form}>
            <TextInput
              style={inputStyle}
              placeholder="Ім'я"
              placeholderTextColor={theme.textSecondary}
              value={form.name}
              onChangeText={(v) => setForm((f) => ({ ...f, name: v }))}
            />
            <TextInput
              style={inputStyle}
              placeholder="Вік"
              placeholderTextColor={theme.textSecondary}
              value={form.age}
              onChangeText={(v) => setForm((f) => ({ ...f, age: v }))}
              keyboardType="numeric"
            />
            <TextInput
              style={inputStyle}
              placeholder="Місто"
              placeholderTextColor={theme.textSecondary}
              value={form.city}
              onChangeText={(v) => setForm((f) => ({ ...f, city: v }))}
            />

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.button, { flex: 1, backgroundColor: theme.backgroundElement }]}
                onPress={() => setEditing(false)}
                activeOpacity={0.7}
              >
                <ThemedText type="small">Скасувати</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1, backgroundColor: '#208AEF' }]}
                onPress={handleSave}
                disabled={loading}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.buttonTextWhite}>{loading ? '...' : 'Зберегти'}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.profileCard}>
            {profile ? (
              <>
                <ProfileRow label="Ім'я" value={profile.name} />
                <ProfileRow label="Вік" value={profile.age} />
                <ProfileRow label="Місто" value={profile.city} />
              </>
            ) : (
              <ThemedText type="small" themeColor="textSecondary">
                Профіль ще не заповнений
              </ThemedText>
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#208AEF', marginTop: Spacing.two }]}
              onPress={() => {
                setForm({ name: profile?.name ?? '', age: profile?.age ?? '', city: profile?.city ?? '' });
                setEditing(true);
              }}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.buttonTextWhite}>Редагувати профіль</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.deleteBtn, { borderColor: '#FF3B30' }]}
          onPress={() => router.push('/delete-account')}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.deleteBtnText}>Видалити акаунт</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View style={rowStyles.container}>
      <ThemedText type="small" themeColor="textSecondary" style={rowStyles.label}>
        {label}
      </ThemedText>
      <ThemedText type="default">{value || '—'}</ThemedText>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  container: { gap: 2 },
  label: { textTransform: 'uppercase', letterSpacing: 0.5 },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.three, gap: Spacing.three },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  email: { marginTop: -Spacing.two },
  actionBtn: { paddingHorizontal: Spacing.two, paddingVertical: Spacing.one, borderRadius: 8 },
  profileCard: { gap: Spacing.two },
  form: { gap: Spacing.two },
  row: { flexDirection: 'row', gap: Spacing.two },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonTextWhite: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
  deleteBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  deleteBtnText: { color: '#FF3B30', fontWeight: '600', fontSize: 16 },
});
