import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, type DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MENU_ITEMS = [
  { key: 'News', label: 'Новини', icon: '📰' },
  { key: 'Contacts', label: 'Контакти', icon: '📋' },
] as const;

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { navigation, state } = props;
  const { bottom } = useSafeAreaInsets();
  const activeRouteName = state.routes[state.index]?.name;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>СБЮ</Text>
        </View>
        <Text style={styles.name}>Стецюк Богдан Юрійович</Text>
        <Text style={styles.group}>ІПЗ-22-2</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.menu}>
        {MENU_ITEMS.map(({ key, label, icon }) => {
          const isActive = activeRouteName === key;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => navigation.navigate(key)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.footer, { paddingBottom: bottom + 8 }]}>
        <Text style={styles.footerText}>Лабораторна робота №2</Text>
        <Text style={styles.footerText}>React Native · 2026</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0a7ea4',
  },
  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  group: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  menu: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 4,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: '#e8f4f8',
  },
  menuIcon: {
    fontSize: 20,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  menuLabelActive: {
    color: '#0a7ea4',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#aaa',
    marginBottom: 2,
  },
});
