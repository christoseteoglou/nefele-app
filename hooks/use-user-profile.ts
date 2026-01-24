import { useCallback, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import {
  getCurrentUser,
  getUserProfile,
  UserDocument
} from '@/services/firebase'

export function useUserProfile() {
  const [userData, setUserData] = useState<UserDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      loadProfile()
    }, [])
  )

  const loadProfile = async () => {
    try {
      const user = getCurrentUser()
      if (!user) {
        setUserData(null)
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

  return {
    userData,
    profile: userData?.profile,
    isLoading,
    refresh: loadProfile
  }
}
