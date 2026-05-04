import { View, Text } from 'react-native';
import styles from './index.styles';

type Props = {
  title: string;
  date: string;
  preview: string;
};

export default function NewsItem({ title, date, preview }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.preview}>{preview}</Text>
      </View>
    </View>
  );
}
