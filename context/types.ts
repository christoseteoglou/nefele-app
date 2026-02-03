import { User, UserDocument, UserProfile } from '@/services/firebase'

export interface AppState {
  user: User | null
  isAuthenticated: boolean

  userDocument: UserDocument | null
  profile: UserProfile | null

  isAuthLoading: boolean
  isProfileLoading: boolean

  error: string | null
}

export const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  userDocument: null,
  profile: null,
  isAuthLoading: false,
  isProfileLoading: false,
  error: null
}

// All possible actions that can modify state
export type AppAction =
  | { type: 'AUTH_STATE_CHANGED'; payload: User | null }
  | { type: 'SET_USER_DOCUMENT'; payload: UserDocument | null }
  | { type: 'SET_PROFILE_LOADING'; payload: boolean }
  | { type: 'SET_AUTH_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SIGN_OUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
