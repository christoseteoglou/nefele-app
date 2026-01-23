import { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InputField from '@/components/ui/input-field';
import Button from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { signUpWithEmail } from '@/services/firebase';

type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return null;

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strength = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;

  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'medium';
  return 'strong';
}

function getStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak': return 'Weak Password';
    case 'medium': return 'Medium Password';
    case 'strong': return 'Strong Password';
    default: return '';
  }
}

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [email, setEmail] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const confirmPasswordStrength = getPasswordStrength(confirmPassword);

  const getStrengthColor = useCallback((strength: PasswordStrength) => {
    switch (strength) {
      case 'weak': return colors.error;
      case 'medium': return colors.warning;
      case 'strong': return colors.success;
      default: return colors.text;
    }
  }, [colors]);

  const handleSignUp = async () => {
    if (!email || !gamerTag || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);
    try {
      await signUpWithEmail(email, password);
      // TODO: Save gamerTag to user profile in Firestore
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, { borderColor: colors.border }]}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={[styles.title, { color: colors.text }]}>
            Create new Account
          </Text>

          {/* Email Field */}
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {/* Gamer Tag Field */}
          <InputField
            label="Gamer Tag"
            value={gamerTag}
            onChangeText={setGamerTag}
            placeholder="Choose a gamer tag"
            autoCapitalize="none"
          />

          {/* Password Field */}
          <InputField
            label="Password"
            rightLabel={getStrengthLabel(passwordStrength)}
            rightLabelColor={getStrengthColor(passwordStrength)}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="new-password"
            rightIcon={
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={colors.icon}
              />
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          {/* Confirm Password Field */}
          <InputField
            label="Confirm Password"
            rightLabel={getStrengthLabel(confirmPasswordStrength)}
            rightLabelColor={getStrengthColor(confirmPasswordStrength)}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoComplete="new-password"
            rightIcon={
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={colors.icon}
              />
            }
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {/* Sign Up Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              disabled={isLoading || !email || !gamerTag || !password || !confirmPassword || password !== confirmPassword}
            />
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={[styles.signInText, { color: colors.text }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={[styles.signInLink, { color: colors.purple }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 12,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signInText: {
    fontSize: 14,
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
