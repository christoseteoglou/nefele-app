import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LinkTextProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

export default function LinkText({ text, linkText, onPress }: LinkTextProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.text }]}>
        {text}{' '}
      </Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.link, { color: colors.purple }]}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
});
