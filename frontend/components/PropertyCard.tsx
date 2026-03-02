import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PropertyCard({ property, sellerView }: any) {
  const router = useRouter();

  const formattedPrice = property.price
    ? `₹${Number(property.price).toLocaleString()}`
    : '';

  const formattedArea = property.areaSqFt
    ? `${property.areaSqFt.toLocaleString()} sq.ft`
    : '';

  const formattedDate = property.createdAt
    ? new Date(property.createdAt).toLocaleDateString()
    : '';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => router.push(`/property/${property.id}`)}
    >
      {/* IMAGE */}
      <Image
        source={{
          uri:
            property.images?.[0] ||
            'https://via.placeholder.com/600x400/edf2f7/cccccc'
        }}
        style={styles.image}
      />

      {/* CONTENT */}
      <View style={styles.content}>

        {/* CITY BADGE */}
        <View style={styles.cityBadge}>
          <Text style={styles.cityText}>
            {property.city?.toUpperCase()}
          </Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>

        {/* AREA + ADDRESS */}
        <View style={styles.metaRow}>
          <Ionicons name="resize-outline" size={14} color="#6B7280" />
          <Text style={styles.metaText}>{formattedArea}</Text>

          <Ionicons
            name="location-outline"
            size={14}
            color="#6B7280"
            style={{ marginLeft: 12 }}
          />
          <Text style={styles.metaText} numberOfLines={1}>
            {property.address}
          </Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footerRow}>
          <Text style={styles.price}>{formattedPrice}</Text>

          {sellerView ? (
            <View style={styles.interestBadge}>
              <Ionicons name="heart" size={14} color="#fff" />
              <Text style={styles.interestText}>
                {property.interestCount || 0}
              </Text>
            </View>
          ) : (
            <Text style={styles.date}>{formattedDate}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 170,
  },

  content: {
    padding: 16,
  },

  cityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },

  cityText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  metaText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },

  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  interestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  interestText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
});