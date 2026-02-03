import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
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
import { useApp } from '@/context/AppContext'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { updateUserProfile, UserProfile } from '@/services/firebase'
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
  const { state, dispatch } = useApp()
  const { profile: currentProfile, user } = state

  const [isSaving, setIsSaving] = useState(false)

  // Form state - initialize from context
  const [displayName, setDisplayName] = useState(currentProfile?.displayName || '')
  const [bio, setBio] = useState(currentProfile?.bio || '')
  const [age, setAge] = useState(currentProfile?.age?.toString() || '')
  const [avatURL, setAvatURL] = useState(currentProfile?.avatURL || '')
  const [timezone, setTimezone] = useState<string[]>(
    currentProfile?.timezone ? [currentProfile.timezone] : []
  )
  const [platforms, setPlatforms] = useState<string[]>(currentProfile?.platforms || [])
  const [playTimes, setPlayTimes] = useState<string[]>(currentProfile?.playTimes || [])
  const [tags, setTags] = useState<string[]>(currentProfile?.tags || [])
  const [preferredGames, setPreferredGames] = useState<string[]>(
    currentProfile?.preferredGames || []
  )

  const handleSave = async () => {
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

      // Update global state immediately
      dispatch({ type: 'UPDATE_PROFILE', payload: profileData })

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

  if (state.isProfileLoading) {
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
