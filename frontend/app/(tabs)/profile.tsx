import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  // const handleForgotPin = () => {
  //   router.push('/(auth)/forgot-pin');
  // };

  return (
    <View style={styles.container}>

      {/* USER INFO */}
      <View style={styles.infoBox}>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>

        <Text style={styles.detail}>{user?.phoneNumber}</Text>

        <Text style={styles.detail}>
          {user?.address || 'Address not available'}
        </Text>

        <Text style={styles.role}>
          {user?.role}
        </Text>
      </View>

      {/* FORGOT PIN */}
      {/* <TouchableOpacity style={styles.secondaryBtn} onPress={handleForgotPin}>
        <Text style={styles.secondaryText}>Forgot PIN</Text>
      </TouchableOpacity> */}

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  infoBox: {
    marginTop: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  role: {
    marginTop: 10,
    fontWeight: '600',
    color: '#007AFF',
  },
  secondaryBtn: {
    marginTop: 20,
  },
  secondaryText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#ff3b30',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
  },
});