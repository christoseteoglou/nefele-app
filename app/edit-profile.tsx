import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ChipSelect from '@/components/ui/chip-select'
import InputField from '@/components/ui/input-field'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import {
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  UserProfile
} from '@/services/firebase'
import { error as hapticError, success as hapticSuccess } from '@/utils/haptics'

const TIMEZONE_OPTIONS = ['EU', 'NA East', 'NA West', 'Asia', 'OCE']
const PLATFORM_OPTIONS = ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile']
const PLAYTIME_OPTIONS = [
  'Mornings',
  'Afternoons',
  'Evenings',
  'Nights',
  'Weekends'
]
const TAG_OPTIONS = [
  'Chill player',
  'Try hard',
  'Competitive',
  'Casual',
  'Sherpa',
  'New player',
  'Raid ready',
  'PvP focused',
  'PvE focused'
]
const GAME_OPTIONS = [
  'Destiny 2',
  'Call of Duty',
  'Fortnite',
  'Apex Legends',
  'Valorant',
  'League of Legends',
  'Minecraft',
  'GTA V',
  'Rocket League',
  'Overwatch 2'
]

export default function EditProfileScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [age, setAge] = useState('')
  const [avatURL, setAvatURL] = useState('')
  const [timezone, setTimezone] = useState<string[]>([])
  const [platforms, setPlatforms] = useState<string[]>([])
  const [playTimes, setPlayTimes] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [preferredGames, setPreferredGames] = useState<string[]>([])

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const user = getCurrentUser()
      if (!user) {
        router.replace('/(auth)/login')
        return
      }

      const userData = await getUserProfile(user.uid)
      if (userData?.profile) {
        const profile = userData.profile
        setDisplayName(profile.displayName || '')
        setBio(profile.bio || '')
        setAge(profile.age?.toString() || '')
        setAvatURL(profile.avatURL || '')
        setTimezone(profile.timezone ? [profile.timezone] : [])
        setPlatforms(profile.platforms || [])
        setPlayTimes(profile.playTimes || [])
        setTags(profile.tags || [])
        setPreferredGames(profile.preferredGames || [])
      }
    } catch (err) {
      console.error('Error loading profile:', err)
      Alert.alert('Error', 'Failed to load profile data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    const user = getCurrentUser()
    if (!user) return

    setIsSaving(true)
    try {
      const profileData: UserProfile = {
        displayName,
        bio,
        age: age ? parseInt(age, 10) : 0,
        avatURL,
        timezone: timezone[0] || '',
        platforms,
        playTimes,
        tags,
        preferredGames
      }

      await updateUserProfile(user.uid, profileData)
      hapticSuccess()
      router.back()
    } catch (err) {
      console.error('Error saving profile:', err)
      hapticError()
      Alert.alert('Error', 'Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: colors.background }
        ]}
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
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
            Edit Profile
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.7}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color={colors.purple} />
            ) : (
              <Text style={[styles.saveButtonText, { color: colors.purple }]}>
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Info Section */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Basic Info
          </Text>

          <InputField
            label="Display Name"
            placeholder="Enter your display name"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
          />

          <InputField
            label="Bio"
            placeholder="Tell us about yourself"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={3}
          />

          <InputField
            label="Age"
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
          />

          <InputField
            label="Avatar URL"
            placeholder="https://example.com/avatar.png"
            value={avatURL}
            onChangeText={setAvatURL}
            autoCapitalize="none"
            keyboardType="url"
          />

          {/* Gaming Preferences Section */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Gaming Preferences
          </Text>

          <ChipSelect
            label="Timezone"
            options={TIMEZONE_OPTIONS}
            selected={timezone}
            onChange={selected => setTimezone(selected.slice(-1))}
          />

          <ChipSelect
            label="Platforms"
            options={PLATFORM_OPTIONS}
            selected={platforms}
            onChange={setPlatforms}
          />

          <ChipSelect
            label="Play Times"
            options={PLAYTIME_OPTIONS}
            selected={playTimes}
            onChange={setPlayTimes}
          />

          <ChipSelect
            label="Player Tags"
            options={TAG_OPTIONS}
            selected={tags}
            onChange={setTags}
          />

          {/* Games Section */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferred Games
          </Text>

          <ChipSelect
            label="Select your games"
            options={GAME_OPTIONS}
            selected={preferredGames}
            onChange={setPreferredGames}
          />

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: 'center'
  },
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8
  },
  bottomSpacer: {
    height: 40
  }
})
