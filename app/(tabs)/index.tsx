import FeedPost from '@/components/feed-post'
import Header from '@/components/ui/header'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { ScrollView, StyleSheet } from 'react-native'
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <Header
        title="Feed"
        rightAction={{ icon: 'refresh', onPress: () => {} }}
      />

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
  feed: {
    flex: 1
  },
  feedContent: {
    padding: 16
  }
})
