import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode
} from 'react'
import { AppState, AppAction, initialState } from './types'
import { appReducer } from './reducer'
import {
  onAuthStateChanged,
  getUserProfile,
  signOut as firebaseSignOut,
  User
} from '@/services/firebase'

// Context type includes state and helper functions
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Helper actions
  loadUserProfile: () => Promise<void>
  signOut: () => Promise<void>
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Listen to auth state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user: User | null) => {
      dispatch({ type: 'AUTH_STATE_CHANGED', payload: user })
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Load profile whenever user changes
  useEffect(() => {
    if (state.user) {
      loadUserProfile()
    }
  }, [state.user?.uid])

  // Helper: Load user profile from Firestore
  const loadUserProfile = async () => {
    if (!state.user) return

    dispatch({ type: 'SET_PROFILE_LOADING', payload: true })
    try {
      const userDoc = await getUserProfile(state.user.uid)
      dispatch({ type: 'SET_USER_DOCUMENT', payload: userDoc })
    } catch (error) {
      console.error('Error loading profile:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load profile' })
      dispatch({ type: 'SET_PROFILE_LOADING', payload: false })
    }
  }

  // Helper: Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut()
      dispatch({ type: 'SIGN_OUT' })
    } catch (error) {
      console.error('Error signing out:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to sign out' })
    }
  }

  const value: AppContextType = {
    state,
    dispatch,
    loadUserProfile,
    signOut
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
