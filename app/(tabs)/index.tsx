import FeedPost from '@/components/feed-post'
import Avatar from '@/components/ui/avatar'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useUserProfile } from '@/hooks/use-user-profile'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const feedPosts = [
  {
    id: '1',
    title: 'New Group Member',
    username: 'eatoldglue',
    message:
      '@edrtyhr just joined the group! Tap this post to view their profile.',
    timestamp: '1 day ago',
    image: require('@/assets/images/react-logo.png'),
    likes: 1700,
    comments: 127
  },
  {
    id: '2',
    title: 'New Group Member',
    username: 'yesimagirrrl',
    message:
      '@edrtyhr just joined the group! Tap this post to view their profile.',
    timestamp: '3 days ago',
    image: require('@/assets/images/react-logo.png'),
    likes: 1700,
    comments: 127
  }
]

export default function FeedScreen() {
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
      <View
        style={[
          styles.header,
          { backgroundColor: colors.background, borderBottomColor: colors.border }
        ]}
      >
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Avatar uri={profile?.avatURL} size={32} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Feed</Text>
        <TouchableOpacity
          style={[styles.refreshButton, { borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Feed Posts */}
      <ScrollView
        style={styles.feed}
        contentContainerStyle={[
          styles.feedContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {feedPosts.map(post => (
          <FeedPost
            key={post.id}
            title={post.title}
            username={post.username}
            message={post.message}
            timestamp={post.timestamp}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
          />
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
    paddingVertical: 12,
    borderBottomWidth: 1
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
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  feed: {
    flex: 1
  },
  feedContent: {
    padding: 16
  }
})
