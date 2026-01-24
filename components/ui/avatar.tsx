import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, View } from 'react-native'

interface AvatarProps {
  uri?: string | null
  size?: number
}

export default function Avatar({ uri, size = 32 }: AvatarProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2
  }

  if (uri) {
    return <Image source={{ uri }} style={avatarStyle} />
  }

  return (
    <View
      style={[
        styles.placeholder,
        avatarStyle,
        { backgroundColor: colors.border }
      ]}
    >
      <Ionicons
        name="person"
        size={size * 0.5}
        color={colors.placeholder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
