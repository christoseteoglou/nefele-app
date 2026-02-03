import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, View } from 'react-native'

const AVATAR_COLORS = ['#BD44FF', '#0BCDB6', '#67D4FC']

function getColorFromId(userId?: string | null): string {
  if (!userId) {
    return AVATAR_COLORS[0]
  }
  // Use the sum of char codes to pick a consistent color for each user
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

interface AvatarProps {
  uri?: string | null
  userId?: string | null
  size?: number
}

export default function Avatar({ uri, userId, size = 32 }: AvatarProps) {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2
  }

  if (uri) {
    return <Image source={{ uri }} style={avatarStyle} />
  }

  const backgroundColor = getColorFromId(userId)

  return (
    <View style={[styles.placeholder, avatarStyle, { backgroundColor }]}>
      <Ionicons name="person" size={size * 0.5} color="#FFFFFF" />
    </View>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
