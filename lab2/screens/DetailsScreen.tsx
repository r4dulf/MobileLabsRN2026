import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';
import type { NewsStackParamList } from '../types/navigation';

type DetailRoute = RouteProp<NewsStackParamList, 'DetailsScreen'>;

export default function DetailsScreen() {
  const { params } = useRoute<DetailRoute>();
  const { item } = params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Новина #{item.id}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>
          {item.description} Дослідники планують продовжити роботу в цьому напрямку та
          провести додаткові експерименти для підтвердження отриманих результатів.
        </Text>
        <Text style={styles.description}>
          Очікується, що практичне впровадження даної технології розпочнеться вже
          найближчим часом, що відкриє нові горизонти для суспільства та економіки.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#e0e0e0',
  },
  body: {
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  badgeText: {
    color: '#0a7ea4',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 28,
    marginBottom: 12,
  },
  divider: {
    height: 3,
    backgroundColor: '#0a7ea4',
    width: 48,
    borderRadius: 2,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 12,
  },
});
