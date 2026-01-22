import * as Haptics from 'expo-haptics'

/**
 * Haptics utility for consistent feedback across the app
 * Provides semantic haptic functions for different interaction types
 */

// Global toggle for development/testing
const HAPTICS_ENABLED = true

/**
 * Light haptic for subtle interactions
 * Use for: Regular button presses, toggles, switches
 */
export const light = () => {
  if (!HAPTICS_ENABLED) return
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

/**
 * Medium haptic for standard interactions
 * Use for: Important buttons, confirmations, meaningful actions
 */
export const medium = () => {
  if (!HAPTICS_ENABLED) return
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

/**
 * Heavy haptic for strong interactions
 * Use for: Critical actions, deletions, long press, drag start
 */
export const heavy = () => {
  if (!HAPTICS_ENABLED) return
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
}

/**
 * Selection haptic for UI navigation
 * Use for: Tab switches, picker selections, segmented controls
 */
export const selection = () => {
  if (!HAPTICS_ENABLED) return
  Haptics.selectionAsync()
}

/**
 * Success haptic for positive outcomes
 * Use for: Successful form submission, completed actions
 */
export const success = () => {
  if (!HAPTICS_ENABLED) return
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}

/**
 * Warning haptic for cautionary states
 * Use for: Warning messages, non-critical issues
 */
export const warning = () => {
  if (!HAPTICS_ENABLED) return
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
}

/**
 * Error haptic for negative outcomes
 * Use for: Failed submissions, validation errors, critical issues
 */
export const error = () => {
  if (!HAPTICS_ENABLED) return
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
}

// Context-specific helpers for semantic clarity
export const buttonPress = light
export const tabSwitch = selection
export const deleteAction = heavy
export const formSuccess = success
export const formError = error
