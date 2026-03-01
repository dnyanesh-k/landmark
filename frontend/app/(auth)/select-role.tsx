import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SelectRole() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue as</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: '/(auth)/register', params: { role: 'BUYER' } })}
        >
          <Text style={styles.cardTitle}>Buyer</Text>
          <Text style={styles.cardSub}>Browse & contact sellers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardSecondary]}
          onPress={() => router.push({ pathname: '/(auth)/register', params: { role: 'SELLER' } })}
        >
          <Text style={styles.cardTitle}>Seller</Text>
          <Text style={styles.cardSub}>List properties & manage interest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 24, fontWeight: '700', color: '#111' },
  row: { flexDirection: 'row', gap: 12 },
  card: { width: 150, padding: 18, borderRadius: 12, backgroundColor: '#fff', elevation: 3 },
  cardSecondary: { backgroundColor: '#f0f7ff' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#007AFF' },
  cardSub: { marginTop: 8, color: '#666', fontSize: 13 },
});