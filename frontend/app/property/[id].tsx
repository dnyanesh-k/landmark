import { PropertyContext } from '@/context/PropertyContext';
import { getPropertyById } from '@/services/property.service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PropertyDetails() {
  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<any>(null);
  const { markInterested } = useContext(PropertyContext);

  useEffect(() => { load(); }, []);
  const load = async () => {
    setLoading(true);
    const p = await getPropertyById(id);
    setProperty(p);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (!property) return <Text style={{ padding: 16 }}>Not found</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{property.title}</Text>
      <Text style={{ color: '#666', marginTop: 6 }}>{property.address}</Text>
      <Text style={{ marginTop: 12 }}>{property.description}</Text>

      <TouchableOpacity style={styles.call} onPress={() => router.push({ pathname: '/call-manager', params: { phone: property.ownerPhone } })}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Call Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.interested} onPress={async () => { await markInterested(property); Alert.alert('OK', 'Marked interested'); }}>
        <Text style={{ fontWeight: '700' }}>Mark Interested</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  call: { backgroundColor: '#007AFF', padding: 12, borderRadius: 10, marginTop: 18, alignItems: 'center' },
  interested: { marginTop: 12, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' }
});