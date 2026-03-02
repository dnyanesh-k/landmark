import PropertyCard from '@/components/PropertyCard';
import { PropertyContext } from '@/context/PropertyContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function HomeScreen() {
  const { properties, fetchProperties } = useContext(PropertyContext);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

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

  const safeProperties = Array.isArray(properties) ? properties : [];

  const filteredProperties = useMemo(() => {
    if (!search.trim()) return safeProperties;

    const query = search.toLowerCase();

    return safeProperties.filter(
      (p: any) =>
        p.title?.toLowerCase().includes(query) ||
        p.address?.toLowerCase().includes(query) ||
        p.city?.toLowerCase().includes(query)
    );
  }, [search, safeProperties]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F3D2B" />
        <Text style={styles.loadingText}>Loading properties...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Text style={styles.heading}>Explore Plots</Text>
        <Text style={styles.subHeading}>
          Discover curated land opportunities
        </Text>
      </View>

      {/* ---------- Search ---------- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#6B7280" />
        <TextInput
          placeholder="Search by city, area or title"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ---------- Results ---------- */}
      {!filteredProperties.length ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="search-outline" size={40} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No properties found</Text>
          <Text style={styles.emptySub}>
            Try adjusting your search terms
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PropertyCard property={item} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    marginBottom: 28,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F3D2B',
  },

  subHeading: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111827',
  },

  list: {
    paddingBottom: 30,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F1E8',
  },

  loadingText: {
    marginTop: 10,
    color: '#6B7280',
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 14,
    color: '#374151',
  },

  emptySub: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
});