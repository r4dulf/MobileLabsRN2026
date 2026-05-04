import { FlatList, View, StyleSheet, useWindowDimensions } from 'react-native';
import ScreenLayout from '@/components/ScreenLayout';

const GALLERY_ITEMS = Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) }));
const GAP = 12;
const COLUMNS = 2;

export default function GalleryScreen() {
  const { width } = useWindowDimensions();
  const itemSize = (width - GAP * (COLUMNS + 1)) / COLUMNS;

  return (
    <ScreenLayout>
      <FlatList
        data={GALLERY_ITEMS}
        keyExtractor={(item) => item.id}
        numColumns={COLUMNS}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={() => (
          <View style={[styles.tile, { width: itemSize, height: itemSize }]} />
        )}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: GAP,
  },
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  tile: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
