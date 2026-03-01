import { register} from '@/services/auth.service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const router = useRouter();
  const { role } = useLocalSearchParams() as { role?: 'BUYER' | 'SELLER' };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!phoneNumber || !firstName || passwordHash.length !== 4) return Alert.alert('Validation', 'Please fill all required fields (4 digit PIN)');
    setLoading(true);
    try {
      await register({ firstName, lastName, phoneNumber, address, passwordHash, role: role || 'BUYER' });
      Alert.alert('Success', 'Registered successfully. Please login.');
      router.replace('/(auth)/login');
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Landmark</Text>
      <TextInput placeholder="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Phone" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput placeholder="4 digit PIN" keyboardType="numeric" secureTextEntry value={passwordHash} onChangeText={setPasswordHash} style={styles.input} maxLength={4} />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Please wait...' : 'Register'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={{ marginTop: 12 }}>
        <Text style={{ color: '#007AFF' }}>Already registered? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 34, fontWeight: '800', color: '#007AFF', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#eceff1', padding: 14, borderRadius: 10, marginBottom: 12 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});