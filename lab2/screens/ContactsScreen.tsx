import React from 'react';
import { SectionList, View, Text, StyleSheet } from 'react-native';
import { contactsData, type Contact } from '../data/contactsData';

function ContactItem({ item }: { item: Contact }) {
  return (
    <View style={styles.item}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPhone}>{item.phone}</Text>
      </View>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contactsData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ContactItem item={item} />}
      renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
      ItemSeparatorComponent={Separator}
      stickySectionHeadersEnabled
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
  sectionHeader: {
    backgroundColor: '#e8f4f8',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a7ea4',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  itemPhone: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 72,
  },
});
