import PropertyCard from '@/components/PropertyCard';
import { PropertyContext } from '@/context/PropertyContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function HomeScreen() {
  const { properties, fetchProperties } = useContext(PropertyContext);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // ---------- Load Data ----------
  useEffect(() => {
    const load = async () => {
      try {
        await fetchProperties();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ---------- Safe Data ----------
  const safeProperties = Array.isArray(properties) ? properties : [];

  // ---------- Memoized Filtering ----------
  const filteredProperties = useMemo(() => {
    if (!search.trim()) return safeProperties;

    const query = search.toLowerCase();

    return safeProperties.filter((p: any) =>
      p.title?.toLowerCase().includes(query) ||
      p.address?.toLowerCase().includes(query)
    );
  }, [search, safeProperties]);

  // ---------- Loading State ----------
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ---------- Empty State ----------
  if (!filteredProperties.length) {
    return (
      <View style={styles.center}>
        <Text>No properties found.</Text>
      </View>
    );
  }

  // ---------- UI ----------
  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <TextInput
          placeholder="Search by area, address or title"
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PropertyCard property={item} />
        )}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchWrap: {
    padding: 12
  },
  search: {
    borderWidth: 1,
    borderColor: '#eceff1',
    padding: 12,
    borderRadius: 10
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});