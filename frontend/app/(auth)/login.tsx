import { AuthContext } from '@/context/AuthContext';
import { login } from '@/services/auth.service';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber || passwordHash.length !== 4) {
      return Alert.alert('Validation', 'Phone and 4 digit PIN required');
    }

    setLoading(true);

    try {
      const response = await login({ phoneNumber, passwordHash });
      await signIn(response.token, response.user);

      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert(
        'Login failed',
        error || 'Invalid credentials'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Landmark</Text>
      <TextInput placeholder="Phone" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
      <TextInput placeholder="4 digit PIN" keyboardType="numeric" secureTextEntry value={passwordHash} onChangeText={setPasswordHash} style={styles.input} maxLength={4} />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/select-role')} style={{ marginTop: 12 }}>
        <Text style={{ color: '#007AFF' }}>New user? Register</Text>
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