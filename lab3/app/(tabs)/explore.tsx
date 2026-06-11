import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChallengeItem from '@/components/ChallengeItem';
import { useGameStore } from '@/store/game-store';

const ChallengesScreen = () => {
  const {
    score,
    tapCount,
    doubleTapCount,
    longPressDone,
    panDone,
    swipeRightDone,
    swipeLeftDone,
    pinchDone,
  } = useGameStore();

  const challenges = [
    {
      id: 'tap10',
      title: 'Tap 10 times',
      description: 'Tap the clicker object 10 times',
      done: tapCount >= 10,
      progress: { current: Math.min(tapCount, 10), total: 10 },
    },
    {
      id: 'doubletap5',
      title: 'Double-tap 5 times',
      description: 'Double-tap the clicker 5 times',
      done: doubleTapCount >= 5,
      progress: { current: Math.min(doubleTapCount, 5), total: 5 },
    },
    {
      id: 'longpress',
      title: 'Long press 3 seconds',
      description: 'Hold the clicker for 3 seconds',
      done: longPressDone,
    },
    {
      id: 'drag',
      title: 'Drag the object',
      description: 'Drag the clicker around the screen',
      done: panDone,
    },
    {
      id: 'swiperight',
      title: 'Swipe right',
      description: 'Perform a quick swipe right gesture',
      done: swipeRightDone,
    },
    {
      id: 'swipeleft',
      title: 'Swipe left',
      description: 'Perform a quick swipe left gesture',
      done: swipeLeftDone,
    },
    {
      id: 'pinch',
      title: 'Pinch to resize',
      description: 'Use pinch gesture to resize the clicker',
      done: pinchDone,
    },
    {
      id: 'score100',
      title: 'Reach 100 points',
      description: 'Accumulate 100 points in total',
      done: score >= 100,
      progress: { current: Math.min(score, 100), total: 100 },
    },
    {
      id: 'tap50',
      title: 'Tap Maniac',
      description: 'Tap the clicker 50 times total (custom challenge)',
      done: tapCount >= 50,
      progress: { current: Math.min(tapCount, 50), total: 50 },
    },
  ];

  const completedCount = challenges.filter((c) => c.done).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-4 pt-5 pb-3">
        <Text className="text-gray-900 dark:text-white text-2xl font-bold">Challenges</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
          {completedCount} / {challenges.length} completed
        </Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {challenges.map((challenge) => (
          <ChallengeItem key={challenge.id} {...challenge} />
        ))}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengesScreen;
