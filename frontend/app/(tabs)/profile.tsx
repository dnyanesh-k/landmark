import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const initials =
    `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F5F1E8' }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - SAME STYLE AS ADD PROPERTY */}
        <View style={styles.header}>
          <Text style={styles.brand}>Profile</Text>
          <Text style={styles.subtitle}>Your account details</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Profile Information</Text>

          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <InfoRow label="Full Name" value={`${user?.firstName} ${user?.lastName}`} />
          <InfoRow label="Phone Number" value={user?.phoneNumber} />
          <InfoRow label="Address" value={user?.address || 'Not available'} />
          <InfoRow label="Role" value={user?.role} />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const InfoRow = ({ label, value }: any) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.infoBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    marginBottom: 40,
  },

  brand: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1F3D2B',
    letterSpacing: -1.2,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#5F6F52',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#2B2B2B',
  },

  avatar: {
    alignSelf: 'center',
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: '#1F3D2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },

  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#6B7280',
  },

  infoBox: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F3F2EF',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  value: {
    fontSize: 15,
    color: '#2B2B2B',
  },

  button: {
    height: 58,
    borderRadius: 20,
    backgroundColor: '#1F3D2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});