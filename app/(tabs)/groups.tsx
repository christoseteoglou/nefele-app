import Avatar from '@/components/ui/avatar'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useUserProfile } from '@/hooks/use-user-profile'
import { router } from 'expo-router'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const groups = [
  { id: '1', title: 'Sundog Gaming' },
  { id: '2', title: 'Sundog Gaming Division' },
  { id: '3', title: 'Sundog Gaming Rocket League' }
]

export default function GroupsScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const insets = useSafeAreaInsets()
  const { profile } = useUserProfile()

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Avatar uri={profile?.avatURL} size={32} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Groups</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Group Cards */}
      <ScrollView
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {groups.map(group => (
          <View key={group.id} style={styles.card}>
            {/* Placeholder image */}
            <View style={[styles.cardImage, { backgroundColor: '#2F115C' }]} />

            {/* Bottom-left title */}
            <Text style={styles.cardTitle}>{group.title}</Text>
          </View>
        ))}
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  avatarContainer: {
    width: 40
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center'
  },
  headerRightSpacer: {
    width: 40
  },
  divider: {
    height: 1
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    height: 140,
    position: 'relative',
    backgroundColor: '#2F115C'
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject
  },
  cardTitle: {
    position: 'absolute',
    left: 16,
    bottom: 14,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
})
