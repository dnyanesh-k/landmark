import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PropertyCard({ property, sellerView }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/property/${property.id}`)}>
      <Image source={{ uri: property.images?.[0] || 'https://via.placeholder.com/300' }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.sub}>{property.area} • {property.address}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{property.price ? `₹${property.price}` : ''}</Text>
          {sellerView && <View style={styles.badge}><Text style={{ color: '#fff', fontWeight: '700' }}>{property.interestCount || 0}</Text></View>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12, elevation: 2 },
  image: { width: '100%', height: 160 },
  content: { padding: 12 },
  title: { fontSize: 16, fontWeight: '700' },
  sub: { color: '#666', marginTop: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  price: { fontWeight: '700' },
  badge: { backgroundColor: '#FF3B30', padding: 6, borderRadius: 8 }
});
