import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import styles from './index.styles';

type Props = {
  children: React.ReactNode;
};

export default function ScreenLayout({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader />
      <View style={styles.content}>{children}</View>
      <AppFooter />
    </SafeAreaView>
  );
}
