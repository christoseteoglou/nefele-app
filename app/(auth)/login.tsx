import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import LinkText from "@/components/ui/link-text";
import SocialLoginButton from "@/components/ui/social-login-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { signInWithEmail } from "@/services/firebase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to sign in";
      Alert.alert("Sign In Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    console.log("Forgot password");
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log("Social login:", provider);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Sign In to your Account
      </Text>

      {/* Email Input */}
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.placeholder}
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
        <Text style={[styles.forgotPassword, { color: colors.purple }]}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <Button
        title={isLoading ? "Signing In..." : "Sign In"}
        onPress={handleSignIn}
        disabled={isLoading || !email || !password}
      />

      {/* Sign Up Link */}
      <LinkText
        text="Don't have an account?"
        linkText="Sign Up"
        onPress={handleSignUp}
      />

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View
          style={[styles.dividerLine, { backgroundColor: colors.border }]}
        />
        <Text style={[styles.dividerText, { color: colors.placeholder }]}>
          or continue with
        </Text>
        <View
          style={[styles.dividerLine, { backgroundColor: colors.border }]}
        />
      </View>

      {/* Social Login Buttons */}
      <View style={styles.socialButtonsContainer}>
        <View style={styles.socialRow}>
          <SocialLoginButton
            provider="Google"
            onPress={() => handleSocialLogin("Google")}
          />
          <View style={styles.socialButtonSpacer} />
          <SocialLoginButton
            provider="Meta"
            onPress={() => handleSocialLogin("Meta")}
          />
        </View>
        <View style={styles.socialRow}>
          <SocialLoginButton
            provider="Apple"
            onPress={() => handleSocialLogin("Apple")}
          />
          <View style={styles.socialButtonSpacer} />
          <SocialLoginButton
            provider="LinkedIn"
            onPress={() => handleSocialLogin("LinkedIn")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 38,
    padding: 8,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: -10,
    marginBottom: 20,
  },
  signInButton: {
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    marginHorizontal: 12,
  },
  socialButtonsContainer: {
    marginTop: 8,
  },
  socialRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  socialButtonSpacer: {
    width: 12,
  },
});
