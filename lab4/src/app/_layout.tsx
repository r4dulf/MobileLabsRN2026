import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="viewer" options={{ title: 'Переглядач' }} />
        <Stack.Screen name="info" options={{ title: 'Інформація про файл' }} />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
