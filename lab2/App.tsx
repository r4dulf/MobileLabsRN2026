import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import MainScreen from './screens/MainScreen';
import DetailsScreen from './screens/DetailsScreen';
import ContactsScreen from './screens/ContactsScreen';
import DrawerContent from './components/DrawerContent';

import type { DrawerParamList, NewsStackParamList } from './types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<NewsStackParamList>();

function MenuButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 4, padding: 4 }}
    >
      <Ionicons name="menu" size={26} color="#fff" />
    </TouchableOpacity>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a7ea4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: 'Новини', headerLeft: () => <MenuButton /> }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.item.title })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <DrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: '#0a7ea4' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
          }}
        >
          {/* headerShown: false — прибираємо подвійний header для News + Stack */}
          <Drawer.Screen
            name="News"
            component={NewsStack}
            options={{ headerShown: false, title: 'Новини' }}
          />
          <Drawer.Screen
            name="Contacts"
            component={ContactsScreen}
            options={{ title: 'Контакти' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
