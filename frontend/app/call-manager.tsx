import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CallManager() {
  const { phone } = useLocalSearchParams() as { phone?: string };

  const handleCall = async () => {
    if (!phone) return Alert.alert('No phone provided');
    const url = `tel:${phone}`;
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call Owner</Text>
      <Text style={styles.phone}>{phone}</Text>
      <TouchableOpacity style={styles.call} onPress={handleCall}><Text style={{ color: '#fff', fontWeight: '700' }}>Call</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }, title: { fontSize: 20, fontWeight: '700' }, phone: { marginTop: 8 }, call: { marginTop: 18, backgroundColor: '#007AFF', padding: 14, borderRadius: 10 } });