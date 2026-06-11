import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Не знайдено', headerShown: true }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.code}>
          404
        </ThemedText>
        <ThemedText type="subtitle">Екран не знайдено</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="linkPrimary">Повернутися на головну</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  code: {
    fontSize: 80,
    lineHeight: 80,
  },
  link: {
    marginTop: 8,
  },
});
