import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGameStore } from '@/store/game-store';

const SettingsScreen = () => {
  const {
    score,
    tapCount,
    doubleTapCount,
    longPressDone,
    panDone,
    swipeRightDone,
    swipeLeftDone,
    pinchDone,
    reset,
  } = useGameStore();

  const challenges = [
    { title: 'Tap 10 times', done: tapCount >= 10, detail: `${tapCount} taps` },
    { title: 'Double-tap 5 times', done: doubleTapCount >= 5, detail: `${doubleTapCount} double-taps` },
    { title: 'Long press 3 seconds', done: longPressDone },
    { title: 'Drag the object', done: panDone },
    { title: 'Swipe right', done: swipeRightDone },
    { title: 'Swipe left', done: swipeLeftDone },
    { title: 'Pinch to resize', done: pinchDone },
    { title: 'Reach 100 points', done: score >= 100, detail: `${score} pts` },
    { title: 'Tap Maniac (50 taps)', done: tapCount >= 50, detail: `${tapCount}/50` },
  ];

  const completedCount = challenges.filter((c) => c.done).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-4 pt-5 pb-3">
        <Text className="text-gray-900 dark:text-white text-2xl font-bold">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Progress summary */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4">
          <Text className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Overall Progress
          </Text>
          <View className="flex-row items-end">
            <Text className="text-primary dark:text-blue-400 text-5xl font-bold">
              {completedCount}
            </Text>
            <Text className="text-gray-400 text-5xl font-bold">/{challenges.length}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm ml-2 mb-1">
              challenges
            </Text>
          </View>
          <Text className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Total score: {score} pts · Taps: {tapCount}
          </Text>
        </View>

        {/* Challenge status list */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-4">
          {challenges.map((c, i) => (
            <View
              key={c.title}
              className={`flex-row items-center px-4 py-3.5 ${
                i < challenges.length - 1
                  ? 'border-b border-gray-100 dark:border-gray-700'
                  : ''
              }`}
            >
              <Text
                className={`text-base mr-3 font-semibold ${
                  c.done ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'
                }`}
              >
                {c.done ? '✓' : '○'}
              </Text>
              <Text className="flex-1 text-gray-800 dark:text-gray-200 text-sm">{c.title}</Text>
              {c.detail && (
                <Text className="text-gray-400 dark:text-gray-500 text-xs">{c.detail}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Reset */}
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.8}
          className="bg-red-500 rounded-2xl p-4 items-center mb-8"
        >
          <Text className="text-white font-semibold text-base">Reset Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
