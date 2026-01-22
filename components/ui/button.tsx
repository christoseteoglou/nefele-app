import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "social";
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const buttonStyle =
    variant === "primary"
      ? [styles.button, { backgroundColor: colors.buttonPrimary }]
      : [
          styles.button,
          {
            backgroundColor: colors.buttonSocial,
            borderWidth: 1,
            borderColor: colors.buttonSocialBorder,
          },
        ];

  const textStyle =
    variant === "primary"
      ? [styles.buttonText, { color: colors.buttonPrimaryText }]
      : [styles.buttonText, { color: colors.text }];

  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.buttonPrimaryText} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
});
