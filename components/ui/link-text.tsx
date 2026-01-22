import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LinkTextProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

export default function LinkText({ text, linkText, onPress }: LinkTextProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Text style={styles.container}>
      {text}
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.link, { color: colors.purple }]}>{linkText}</Text>
      </TouchableOpacity>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
  link: {
    fontWeight: "500",
  },
});
