import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  rightLabel?: string;
  rightLabelColor?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export default function InputField({
  label,
  rightLabel,
  rightLabelColor,
  rightIcon,
  onRightIconPress,
  style,
  multiline,
  ...textInputProps
}: InputFieldProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {rightLabel && (
          <Text style={[styles.rightLabel, { color: rightLabelColor || colors.text }]}>
            {rightLabel}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
              color: colors.text,
              paddingRight: rightIcon ? 50 : 16,
            },
            multiline && styles.multilineInput,
            style,
          ]}
          placeholderTextColor={colors.placeholder}
          multiline={multiline}
          {...textInputProps}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onRightIconPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  rightLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  multilineInput: {
    height: 'auto',
    minHeight: 80,
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
