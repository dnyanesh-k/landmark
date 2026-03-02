import PropertyCard from '@/components/PropertyCard';
import { AuthContext } from '@/context/AuthContext';
import { PropertyContext } from '@/context/PropertyContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MyProperties() {
  const { myProperties, fetchMyProperties } = useContext(PropertyContext);
  const { token, loading: authLoading } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!token) return;

    const load = async () => {
      try {
        await fetchMyProperties();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, authLoading]);

  const safeProperties = Array.isArray(myProperties) ? myProperties : [];
  const totalCount = useMemo(() => safeProperties.length, [safeProperties]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F5F1E8' }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER - SAME AS OTHER SCREENS */}
        <View style={styles.header}>
          <Text style={styles.brand}>My Properties</Text>
          <Text style={styles.subtitle}>Manage your listed plots</Text>
        </View>

        {/* <View style={styles.card}> */}
        <View style={styles.titleRow}>
          {/* <Text style={styles.title}>My Properties</Text> */}

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalCount}</Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#1F3D2B" />
            <Text style={styles.loadingText}>
              Loading your properties...
            </Text>
          </View>
        ) : totalCount === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              No properties yet
            </Text>
            <Text style={styles.emptySubtitle}>
              Start by adding your first plot listing.
            </Text>
          </View>
        ) : (
          <FlatList
            data={safeProperties}
            keyExtractor={(item, index) =>
              String(item.propertyId || item.id || index)
            }
            renderItem={({ item }) => (
              <PropertyCard property={item} sellerView />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Important inside ScrollView
          />
        )}
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
    backgroundColor: '#F5F1E8',//'#FFFFFF',
    borderRadius: 30,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2B2B2B',
  },

  badge: {
    backgroundColor: '#1F3D2B',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  list: {
    paddingBottom: 10,
  },

  emptyBox: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  center: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },
});