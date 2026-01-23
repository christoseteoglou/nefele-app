import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { signOut } from '@/services/firebase'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const stats = [
  { id: '1', label: 'Activity Score', value: '381', icon: 'stats-chart' },
  { id: '2', label: 'No Show Rate', value: '0%', icon: 'pie-chart' },
  { id: '3', label: 'Power Level', value: '2039', icon: 'flash' },
  { id: '4', label: 'Location', value: 'Berlin', icon: 'globe' },
  { id: '5', label: 'Avg. Weekly Hours', value: '1–10', icon: 'time' }
]

export default function ProfileScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const handleLogout = async () => {
    try {
      await signOut()
      router.replace('/(auth)/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.border }]}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Profile
        </Text>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <View style={[styles.avatar, { backgroundColor: colors.border }]} />
          <View
            style={[styles.statusDot, { borderColor: colors.background }]}
          />
        </View>

        <Text style={[styles.name, { color: colors.text }]}>Eatoldglue</Text>
        <Text style={[styles.email, { color: colors.placeholder }]}>
          eatoldglue@gmail.com
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsList}>
        {stats.map(item => (
          <View
            key={item.id}
            style={[
              styles.statCard,
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}
          >
            <View style={styles.statLeft}>
              <Ionicons
                name={item.icon as any}
                size={18}
                color={colors.purple}
              />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                {item.label}
              </Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {item.value}
            </Text>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={[
            styles.statCard,
            { borderColor: colors.error, backgroundColor: colors.background }
          ]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={styles.statLeft}>
            <Ionicons name="log-out-outline" size={18} color={colors.error} />
            <Text style={[styles.statLabel, { color: colors.error }]}>
              Log Out
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600'
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6'
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48
  },
  statusDot: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#fff'
  },
  name: {
    fontSize: 20,
    fontWeight: '600'
  },
  email: {
    fontSize: 14,
    marginTop: 4
  },
  statsList: {
    paddingHorizontal: 16,
    gap: 12
  },
  statCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '500'
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600'
  }
})
