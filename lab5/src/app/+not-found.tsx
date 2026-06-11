import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Не знайдено', headerShown: true }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          404
        </ThemedText>
        <ThemedText type="subtitle" style={styles.message}>
          Екран не знайдено
        </ThemedText>
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
  title: {
    fontSize: 80,
    lineHeight: 80,
  },
  message: {
    textAlign: 'center',
  },
  link: {
    marginTop: 8,
  },
});
