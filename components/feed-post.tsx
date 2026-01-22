import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View } from 'react-native'

interface FeedPostProps {
  title: string
  username: string
  message: string
  timestamp: string
  image: any
  likes: number
  comments: number
}

export default function FeedPost({
  title,
  username,
  message,
  timestamp,
  image,
  likes,
  comments
}: FeedPostProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <View
      style={[
        styles.post,
        { backgroundColor: colors.background, borderColor: colors.border }
      ]}
    >
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.avatarContainer}>
          {/* User Avatar - placeholder circle for now */}
          <View style={[styles.avatar, { backgroundColor: colors.border }]} />
        </View>
        <View style={styles.postInfo}>
          <View style={styles.postTitleRow}>
            <Text style={[styles.postTitle, { color: colors.tint }]}>
              {title}
            </Text>
            <Text style={[styles.timestamp, { color: colors.placeholder }]}>
              {timestamp}
            </Text>
          </View>
          <Text style={[styles.postText, { color: colors.text }]}>
            {message}
          </Text>
        </View>
      </View>

      {/* Post Image */}
      <Image source={image} style={styles.postImage} resizeMode="cover" />

      {/* Engagement Metrics */}
      <View style={styles.engagement}>
        <View style={styles.engagementItem}>
          <Ionicons name="heart" size={20} color="#EF4444" />
          <Text style={[styles.count, { color: colors.text }]}>
            {formatCount(likes)}
          </Text>
        </View>
        <View style={styles.engagementItem}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
          <Text style={[styles.count, { color: colors.text }]}>
            {formatCount(comments)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1
  },
  postHeader: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 12
  },
  avatarContainer: {
    marginRight: 12
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  postInfo: {
    flex: 1
  },
  postTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  postText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4
  },
  timestamp: {
    fontSize: 12
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12
  },
  engagement: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 24
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  count: {
    fontSize: 14,
    fontWeight: '500'
  }
})
