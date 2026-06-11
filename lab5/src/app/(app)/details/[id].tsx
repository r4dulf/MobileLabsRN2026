import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { products } from '@/data/products';
import { useTheme } from '@/hooks/use-theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const product = products.find((p) => p.id === id);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.backgroundElement }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ThemedText type="small">← Назад</ThemedText>
        </TouchableOpacity>
      </View>

      {!product ? (
        <View style={styles.notFound}>
          <ThemedText type="subtitle">Товар не знайдено</ThemedText>
          <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
            <ThemedText type="linkPrimary">Повернутися до каталогу</ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.four }]}
          showsVerticalScrollIndicator={false}
        >
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.info}>
            <ThemedText type="subtitle">{product.name}</ThemedText>
            <ThemedText type="subtitle" style={styles.price}>
              {product.price.toLocaleString('uk-UA')} ₴
            </ThemedText>
            <ThemedText type="default" themeColor="textSecondary" style={styles.description}>
              {product.description}
            </ThemedText>
          </View>
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 8,
  },
  content: {
    gap: Spacing.three,
  },
  image: {
    width: '100%',
    height: 280,
  },
  info: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  price: {
    color: '#208AEF',
    fontSize: 24,
    lineHeight: 32,
  },
  description: {
    lineHeight: 26,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  backLink: {
    marginTop: Spacing.one,
  },
});
