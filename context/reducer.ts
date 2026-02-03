import { AppAction, AppState } from './types'

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
        isAuthLoading: false,
        // Clear profile when user changes
        userDocument: action.payload ? state.userDocument : null,
        profile: action.payload ? state.profile : null
      }

    case 'SET_USER_DOCUMENT':
      return {
        ...state,
        userDocument: action.payload,
        profile: action.payload?.profile ?? null,
        isProfileLoading: false
      }

    case 'SET_PROFILE_LOADING':
      return {
        ...state,
        isProfileLoading: action.payload
      }

    case 'SET_AUTH_LOADING':
      return {
        ...state,
        isAuthLoading: action.payload
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }

    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userDocument: null,
        profile: null,
        error: null
      }

    case 'UPDATE_PROFILE':
      if (!state.profile) return state
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
        userDocument: state.userDocument
          ? {
              ...state.userDocument,
              profile: { ...state.userDocument.profile, ...action.payload }
            }
          : null
      }

    default:
      return state
  }
}
