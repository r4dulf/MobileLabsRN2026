import { FlatList, Text, StyleSheet } from 'react-native';
import ScreenLayout from '@/components/ScreenLayout';
import NewsItem from '@/components/NewsItem';

const NEWS_DATA = [
  { id: '1', title: 'Заголовок новини', date: '01.05.2026', preview: 'Короткий текст новини' },
  { id: '2', title: 'Заголовок новини', date: '30.04.2026', preview: 'Короткий текст новини' },
  { id: '3', title: 'Заголовок новини', date: '29.04.2026', preview: 'Короткий текст новини' },
  { id: '4', title: 'Заголовок новини', date: '28.04.2026', preview: 'Короткий текст новини' },
  { id: '5', title: 'Заголовок новини', date: '27.04.2026', preview: 'Короткий текст новини' },
  { id: '6', title: 'Заголовок новини', date: '26.04.2026', preview: 'Короткий текст новини' },
  { id: '7', title: 'Заголовок новини', date: '25.04.2026', preview: 'Короткий текст новини' },
  { id: '8', title: 'Заголовок новини', date: '24.04.2026', preview: 'Короткий текст новини' },
];

export default function HomeScreen() {
  return (
    <ScreenLayout>
      <FlatList
        data={NEWS_DATA}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.heading}>Новини</Text>}
        renderItem={({ item }) => (
          <NewsItem title={item.title} date={item.date} preview={item.preview} />
        )}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
    color: '#11181C',
  },
});
