import React, { useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { generateNewsItems, type NewsItem } from '../data/newsData';
import type { NewsStackParamList } from '../types/navigation';

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;

type Nav = NativeStackNavigationProp<NewsStackParamList, 'MainScreen'>;

function NewsCard({ item, onPress }: { item: NewsItem; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
        <Text style={styles.readMore}>Читати далі →</Text>
      </View>
    </TouchableOpacity>
  );
}

function ListHeader() {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}>Останні новини</Text>
      <Text style={styles.listHeaderSub}>Потягніть вниз для оновлення</Text>
    </View>
  );
}

function ListFooter({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <View style={styles.listFooter}>
      <ActivityIndicator size="small" color="#0a7ea4" />
      <Text style={styles.listFooterText}>Завантаження...</Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export default function MainScreen() {
  const navigation = useNavigation<Nav>();
  const [news, setNews] = useState<NewsItem[]>(() => generateNewsItems(INITIAL_COUNT));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(generateNewsItems(INITIAL_COUNT));
      setRefreshing(false);
    }, 1500);
  }, []);

  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setNews(prev => [...prev, ...generateNewsItems(LOAD_MORE_COUNT, prev.length)]);
      setLoadingMore(false);
    }, 1000);
  }, [loadingMore]);

  return (
    <FlatList
      data={news}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <NewsCard
          item={item}
          onPress={() => navigation.navigate('DetailsScreen', { item })}
        />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={<ListFooter loading={loadingMore} />}
      ItemSeparatorComponent={ItemSeparator}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 16,
  },
  listHeader: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listHeaderTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  listHeaderSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 4,
  },
  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  listFooterText: {
    color: '#666',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 12,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    fontSize: 13,
    color: '#0a7ea4',
    fontWeight: '600',
  },
});
