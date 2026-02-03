import { useColorScheme } from '@/hooks/use-color-scheme'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { Redirect, Stack, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import * as Sentry from '@sentry/react-native'
import Constants from 'expo-constants'
import { AppProvider, useApp } from '@/context/AppContext'

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

  // Release Health: Track app version for crash-free metrics
  release: `${Constants.expoConfig?.slug}@${Constants.expoConfig?.version}`,
  dist: Constants.expoConfig?.version,
  environment: __DEV__ ? 'development' : 'production',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Release Health: Automatically track sessions (enabled by default)
  // Sessions track app opens/closes and measure crash-free rates
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000, // Send session updates every 30s

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()]

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
})

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const { state } = useApp()
  const segments = useSegments()

  const inAuthGroup = segments[0] === '(auth)'

  // Determine if we need to redirect
  const shouldRedirectToLogin = !state.isAuthLoading && !state.isAuthenticated && !inAuthGroup
  const shouldRedirectToHome = !state.isAuthLoading && state.isAuthenticated && inAuthGroup

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
      {shouldRedirectToLogin && <Redirect href="/(auth)/login" />}
      {shouldRedirectToHome && <Redirect href="/(tabs)" />}
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

export default Sentry.wrap(function RootLayout() {
  return (
    <AppProvider>
      <RootLayoutNav />
    </AppProvider>
  )
})
