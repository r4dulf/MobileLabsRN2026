import { View, Text } from 'react-native';

interface Props {
  title: string;
  description: string;
  done: boolean;
  progress?: { current: number; total: number };
}

const ChallengeItem = ({ title, description, done, progress }: Props) => {
  const progressPercent = progress
    ? Math.min((progress.current / progress.total) * 100, 100)
    : 0;

  return (
    <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl p-4 mb-3">
      <View
        className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
          done ? 'bg-green-500' : 'bg-gray-100 dark:bg-gray-700'
        }`}
      >
        <Text className={`text-base font-bold ${done ? 'text-white' : 'text-gray-400'}`}>
          {done ? '✓' : '○'}
        </Text>
      </View>

      <View className="flex-1">
        <Text className="text-gray-900 dark:text-white font-semibold text-sm">{title}</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{description}</Text>

        {progress && !done && (
          <View className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <View
              className="bg-blue-500 h-1 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </View>
        )}
      </View>

      {progress && !done && (
        <Text className="text-gray-400 dark:text-gray-500 text-xs ml-3">
          {progress.current}/{progress.total}
        </Text>
      )}
    </View>
  );
};

export default ChallengeItem;
