import PropertyCard from '@/components/PropertyCard';
import { PropertyContext } from '@/context/PropertyContext';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function MyProperties() {
  const { myProperties, fetchMyProperties } = useContext(PropertyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchMyProperties();
      setLoading(false);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={myProperties || []}
          keyExtractor={(item) => String(item.propertyId || item.id || Math.random())}
          renderItem={({ item }) => <PropertyCard property={item} sellerView />}
          contentContainerStyle={{ padding: 12 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>You haven't added any properties yet.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});
