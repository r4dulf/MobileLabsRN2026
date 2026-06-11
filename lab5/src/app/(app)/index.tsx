import { Link } from 'expo-router';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { products, type Product } from '@/data/products';
import { useTheme } from '@/hooks/use-theme';

function ProductCard({ item }: { item: Product }) {
  const theme = useTheme();
  return (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity
        style={{...styles.card, backgroundColor: theme.backgroundElement}}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <ThemedText type="default" numberOfLines={2} style={styles.cardName}>
            {item.name}
          </ThemedText>
          <ThemedText type="smallBold" themeColor="textSecondary">
            {item.price.toLocaleString('uk-UA')} ₴
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function CatalogScreen() {
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <ThemedText type="subtitle">Каталог</ThemedText>
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: theme.backgroundElement }]}
          onPress={logout}
          activeOpacity={0.7}
        >
          <ThemedText type="small">Вийти</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + Spacing.three }]}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  logoutBtn: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 90,
    height: 90,
  },
  cardBody: {
    flex: 1,
    padding: Spacing.two,
    gap: 4,
  },
  cardName: {
    fontWeight: '600',
  },
});
