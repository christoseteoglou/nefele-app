import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { PlatformColor } from 'react-native'

export default function TabLayout() {
  return (
    <NativeTabs
      tintColor={PlatformColor('label')}
      iconColor={{
        default: PlatformColor('secondaryLabel') // Unselected icon color
      }}
      labelStyle={{
        color: PlatformColor('label')
      }}
    >
      {/* Feed Tab */}
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" />
        <Label>Feed</Label>
      </NativeTabs.Trigger>

      {/* Games Tab */}
      <NativeTabs.Trigger name="games">
        <Icon sf="gamecontroller.fill" />
        <Label>Games</Label>
      </NativeTabs.Trigger>

      {/* Groups Tab */}
      <NativeTabs.Trigger name="groups">
        <Icon sf="person.3.fill" />
        <Label>Groups</Label>
      </NativeTabs.Trigger>

      {/* Notifications Tab */}
      {/*
      <NativeTabs.Trigger name="notifications">
        <Icon sf="bell.fill" />
        <Label>Notifications</Label>
      </NativeTabs.Trigger>
      */}

      {/* Friends Tab */}
      {/*
      <NativeTabs.Trigger name="friends">
        <Icon sf="person.fill" />
        <Label>Friends</Label>
      </NativeTabs.Trigger>
      */}
    </NativeTabs>
  )
}
