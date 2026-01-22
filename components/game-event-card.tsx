import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface GameEventCardProps {
  gameTitle: string
  description: string
  tag: string
  time: string
  players: { current: number; max: number }
  difficulty: string
}

export default function GameEventCard({
  gameTitle,
  description,
  tag,
  time,
  players,
  difficulty
}: GameEventCardProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.background }]}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="game-controller" size={20} color={colors.text} />
        <View style={styles.cardContent}>
          <Text style={[styles.gameTitle, { color: colors.text }]}>
            {gameTitle}
          </Text>
          <Text style={[styles.description, { color: colors.placeholder }]}>
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.tag, { backgroundColor: colors.border }]}>
          <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
        </View>
        <Text style={[styles.time, { color: colors.text }]}>{time}</Text>
        <Text style={[styles.players, { color: colors.text }]}>
          {players.current}/{players.max}
        </Text>
        <View style={[styles.tag, { backgroundColor: colors.border }]}>
          <Text style={[styles.tagText, { color: colors.text }]}>
            {difficulty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12
  },
  cardContent: {
    flex: 1,
    marginLeft: 12
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    lineHeight: 20
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500'
  },
  time: {
    fontSize: 14,
    marginLeft: 'auto'
  },
  players: {
    fontSize: 14,
    fontWeight: '500'
  }
})
