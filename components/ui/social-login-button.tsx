import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SocialLoginButtonProps {
  provider: "Google" | "Meta" | "Apple" | "LinkedIn";
  onPress: () => void;
}

const socialIcons = {
  Google: "logo-google",
  Meta: "logo-facebook",
  Apple: "logo-apple",
  LinkedIn: "logo-linkedin",
};

export default function SocialLoginButton({
  provider,
  onPress,
}: SocialLoginButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.buttonSocial,
          borderColor: colors.buttonSocialBorder,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Ionicons
          name={socialIcons[provider] as any}
          size={20}
          color={colors.text}
        />
        <Text style={[styles.text, { color: colors.text }]}>{provider}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});
