import { PropertyContext } from '@/context/PropertyContext';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function AddProperty() {
  const { addProperty } = useContext(PropertyContext);

  const [title, setTitle] = useState('');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [plotNumber, setPlotNumber] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title || !areaSqFt || !price || !city) {
      return Toast.show({
        type: 'error',
        text1: 'Missing Required Fields',
        text2: 'Title, City, Area and Price are mandatory.',
        position: 'top',
        visibilityTime: 3000,
      });
    }

    try {
      setLoading(true);

      const response = await addProperty({
        title,
        areaSqFt,
        address,
        price,
        description,
        city,
        plotNumber,
        surveyNumber
      });

      Toast.show({
        type: 'success',
        text1: 'Plot Published',
        text2: response?.message || 'Your plot is now live.',
        position: 'top',
        visibilityTime: 3000,
      });

      // Clear form
      setTitle('');
      setAreaSqFt('');
      setAddress('');
      setPrice('');
      setDescription('');
      setCity('');
      setPlotNumber('');
      setSurveyNumber('');

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Publishing Failed',
        text2: error?.message || 'Something went wrong. Please try again.',
        position: 'top',
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F5F1E8' }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header (consistent with Login/Register) */}
        <View style={styles.header}>
          <Text style={styles.brand}>Add Property</Text>
          <Text style={styles.subtitle}>List your property for buyers</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Add Property Details</Text>

          <Input
            label="Title *"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Premium Riverside Property"
          />
          <Input label="City *"
            value={city}
            onChangeText={setCity}
            placeholder="e.g. Pune, Maharashtra"
          />
          <Input
            label="Area (Sq.Ft) *"
            value={areaSqFt}
            onChangeText={setAreaSqFt}
            keyboardType="numeric"
            placeholder="e.g. 1200"
          />
          <Input
            label="Price *"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="₹ 1200000"
          />

          <Input
            label="Plot Number"
            value={plotNumber}
            onChangeText={setPlotNumber}
            placeholder="e.g. 10"
          />
          <Input
            label="Survey Number"
            value={surveyNumber}
            onChangeText={setSurveyNumber}
            placeholder="e.g. 19 (As per 7/12 Utara)"
          />
          <Input
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Nearby landmark"
          />
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            height={110}
            placeholder="Describe the property, road access, and nearby developments..."
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handlePublish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Publish Plot</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Input = ({ label, height, ...props }: any) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...props}
      style={[styles.input, height && { height }]}
      placeholderTextColor="#9C9C9C"
    />
  </View>
);

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
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 22,
    color: '#2B2B2B',
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#6B7280',
  },

  input: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F3F2EF',
    paddingHorizontal: 18,
    marginBottom: 6,
    fontSize: 15,
    color: '#2B2B2B',
  },

  button: {
    height: 58,
    borderRadius: 20,
    backgroundColor: '#1F3D2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonDisabled: {
    backgroundColor: '#A3B18A',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});