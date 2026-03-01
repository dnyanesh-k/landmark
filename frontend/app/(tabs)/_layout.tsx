import { AuthContext } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';

export default function TabLayout() {
  const { user, token, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace('/(auth)/login');
    }
  }, [token, loading]);

  const role = user?.role || 'BUYER';

  if (role === 'SELLER') {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
        <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }} />
        <Tabs.Screen name="my-properties" options={{ title: 'My Props', tabBarIcon: ({ color }) => <Ionicons name="albums-outline" size={22} color={color} /> }} />
        <Tabs.Screen name="add-property" options={{ title: 'Add', tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={22} color={color} /> }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} /> }} />
      </Tabs>
    );
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} /> }} />
    </Tabs>
  );
}