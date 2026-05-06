import { View, Text } from 'react-native';
import styles from './index.styles';

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoLine1}>ЖИТОМИРСЬКА</Text>
        <Text style={styles.logoLine2}>ПОЛІТЕХНІКА</Text>
      </View>
      <Text style={styles.title}>FirstMobileApp</Text>
    </View>
  );
}
