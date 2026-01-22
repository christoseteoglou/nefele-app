import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const gameEvents = [
  {
    id: '1',
    date: 'Friday 07-11-2025',
    events: [
      {
        id: '1-1',
        title: 'Helldivers 2 Operation - Automatons',
        description:
          'Time for a quick campaign in support of the current Major Order.',
        tag: 'SDG',
        time: '9:00 PM',
        players: '4/4',
        type: 'Any'
      }
    ]
  },
  {
    id: '2',
    date: 'Tuesday 07-15-2025',
    events: [
      {
        id: '2-1',
        title: 'Anything - 3 Player',
        description:
          'Legendary (if available) Edge of Fate Campaign + Bountypopping',
        tag: 'SDG',
        time: '8:00 PM',
        players: '2/3',
        type: 'Any'
      }
    ]
  }
]

export default function GamesScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const [selectedTab, setSelectedTab] = useState('Group Games')
  const insets = useSafeAreaInsets()

  const tabs = ['Public Games', 'Group Games', 'My Games']

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border
          }
        ]}
      >
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <View style={[styles.avatar, { backgroundColor: colors.border }]} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Games</Text>
        <TouchableOpacity
          style={[styles.searchButton, { borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              {
                backgroundColor:
                  selectedTab === tab ? colors.text : colors.inputBackground
              }
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? colors.background : colors.text
                }
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Events */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {gameEvents.map(group => (
          <View key={group.id} style={styles.dateGroup}>
            <Text style={[styles.dateText, { color: colors.text }]}>
              {group.date}
            </Text>

            {group.events.map(event => (
              <View
                key={event.id}
                style={[
                  styles.card,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.inputBackground
                  }
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="game-controller"
                    size={20}
                    color={colors.text}
                  />
                  <View style={styles.cardText}>
                    <Text style={[styles.title, { color: colors.text }]}>
                      {event.title}
                    </Text>
                    <Text
                      style={[
                        styles.description,
                        { color: colors.placeholder }
                      ]}
                    >
                      {event.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text
                    style={[
                      styles.tag,
                      {
                        backgroundColor: colors.border,
                        color: colors.placeholder
                      }
                    ]}
                  >
                    {event.tag}
                  </Text>
                  <Text style={[styles.footerText, { color: colors.text }]}>
                    {event.time}
                  </Text>
                  <Text style={[styles.footerText, { color: colors.text }]}>
                    {event.players}
                  </Text>
                  <Text
                    style={[
                      styles.tag,
                      {
                        backgroundColor: colors.border,
                        color: colors.placeholder
                      }
                    ]}
                  >
                    {event.type}
                  </Text>
                </View>
              </View>
            ))}
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
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
    marginTop: 15
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center'
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500'
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  dateGroup: {
    marginBottom: 20
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 10
  },
  cardText: {
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4
  },
  description: {
    fontSize: 12,
    lineHeight: 16
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500'
  },
  tag: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  }
})
