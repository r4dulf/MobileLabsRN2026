import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ClickerButton from '@/components/ClickerButton';
import { useGameStore } from '@/store/game-store';

const LEGEND = [
  { icon: '👆', label: 'Tap: +1 point' },
  { icon: '✌️', label: 'Double-tap: +2 points' },
  { icon: '⏱️', label: 'Long-press (3s): +5 points' },
  { icon: '↔️', label: 'Swipe: +1–10 random points' },
  { icon: '🤏', label: 'Pinch: resize +3 points' },
  { icon: '✋', label: 'Drag: move the object' },
];

const GameScreen = () => {
  const score = useGameStore((state) => state.score);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Score card */}
      <View className="items-center pt-6 pb-4 mx-4 bg-white dark:bg-gray-800 rounded-2xl mt-4">
        <Text className="text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-widest uppercase">
          Score
        </Text>
        <Text className="text-primary dark:text-blue-400 text-7xl font-bold mt-1">{score}</Text>
      </View>

      {/* Game area — clicker lives here */}
      <View className="flex-1 items-center justify-center">
        <ClickerButton />
      </View>

      {/* Legend */}
      <View className="bg-white dark:bg-gray-800 rounded-t-3xl px-5 pt-4 pb-6">
        {LEGEND.map((item) => (
          <View key={item.label} className="flex-row items-center py-1.5">
            <Text className="text-lg w-7">{item.icon}</Text>
            <Text className="text-gray-600 dark:text-gray-300 text-sm ml-3">{item.label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;
