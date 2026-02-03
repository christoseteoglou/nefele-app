import Avatar from '@/components/ui/avatar'
import { Colors } from '@/constants/theme'
import { useApp } from '@/context/AppContext'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface HeaderProps {
  title: string
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap
    onPress: () => void
  }
  showBorder?: boolean
}

export default function Header({
  title,
  rightAction,
  showBorder = true
}: HeaderProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const { state } = useApp()
  const { profile, user } = state

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: showBorder ? 1 : 0
        }
      ]}
    >
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Avatar uri={profile?.avatURL} userId={user?.uid} size={32} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      <View style={styles.rightContainer}>
        {rightAction ? (
          <TouchableOpacity
            style={[styles.actionButton, { borderColor: colors.border }]}
            onPress={rightAction.onPress}
            activeOpacity={0.7}
          >
            <Ionicons name={rightAction.icon} size={20} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  leftContainer: {
    width: 40
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center'
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end'
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  spacer: {
    width: 40
  }
})
