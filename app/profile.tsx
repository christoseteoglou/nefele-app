import { useCallback, useState } from 'react'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import {
  signOut,
  getCurrentUser,
  getUserProfile,
  UserDocument
} from '@/services/firebase'
import { Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserDocument | null>(null)

  useFocusEffect(
    useCallback(() => {
      loadProfile()
    }, [])
  )

  const loadProfile = async () => {
    try {
      const user = getCurrentUser()
      if (!user) {
        router.replace('/(auth)/login')
        return
      }

      const data = await getUserProfile(user.uid)
      setUserData(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.replace('/(auth)/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const profile = userData?.profile

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, styles.centered, { backgroundColor: colors.background }]}
        edges={['top', 'bottom']}
      >
        <ActivityIndicator size="large" color={colors.purple} />
      </SafeAreaView>
    )
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
          onPress={() => router.push('/edit-profile')}
        >
          <Ionicons name="pencil" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          {profile?.avatURL ? (
            <Image
              source={{ uri: profile.avatURL }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, { backgroundColor: colors.border }]}>
              <Ionicons name="person" size={40} color={colors.placeholder} />
            </View>
          )}
          <View
            style={[styles.statusDot, { borderColor: colors.background }]}
          />
        </View>

        <Text style={[styles.name, { color: colors.text }]}>
          {profile?.displayName || 'No Name'}
        </Text>
        <Text style={[styles.email, { color: colors.placeholder }]}>
          {userData?.email || ''}
        </Text>
      </View>

      {/* Profile Info */}
      <View style={styles.statsList}>
        {profile?.bio ? (
          <View
            style={[
              styles.statCard,
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}
          >
            <View style={styles.statLeft}>
              <Ionicons name="chatbubble-outline" size={18} color={colors.purple} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                {profile.bio}
              </Text>
            </View>
          </View>
        ) : null}

        {profile?.timezone ? (
          <View
            style={[
              styles.statCard,
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}
          >
            <View style={styles.statLeft}>
              <Ionicons name="globe-outline" size={18} color={colors.purple} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Timezone
              </Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {profile.timezone}
            </Text>
          </View>
        ) : null}

        {profile?.platforms && profile.platforms.length > 0 ? (
          <View
            style={[
              styles.statCard,
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}
          >
            <View style={styles.statLeft}>
              <Ionicons name="game-controller-outline" size={18} color={colors.purple} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Platforms
              </Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {profile.platforms.join(', ')}
            </Text>
          </View>
        ) : null}

        {profile?.playTimes && profile.playTimes.length > 0 ? (
          <View
            style={[
              styles.statCard,
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}
          >
            <View style={styles.statLeft}>
              <Ionicons name="time-outline" size={18} color={colors.purple} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Play Times
              </Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {profile.playTimes.join(', ')}
            </Text>
          </View>
        ) : null}

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
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
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
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center'
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
