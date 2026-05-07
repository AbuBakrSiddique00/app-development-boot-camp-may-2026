/**
 * Root Layout
 *
 * Configures the navigation stack, initializes the store,
 * sets up Toast messages, and loads global styles.
 */

import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { useExpenseStore } from '@/store/useExpenseStore';
import '../global.css';

export default function RootLayout() {
  const initialize = useExpenseStore((s) => s.initialize);
  const isInitialized = useExpenseStore((s) => s.isInitialized);

  useEffect(() => {
    initialize();
  }, []);

  if (!isInitialized) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#FAFAFA' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="add"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="details" />
      </Stack>
      <Toast />
    </>
  );
}
