import { PropertyContext } from '@/context/PropertyContext';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function AddProperty() {
  const { addProperty } = useContext(PropertyContext);
  const [title, setTitle] = useState('');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [plotNumber, setPlotNumber] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');

  const handle = async () => {
    if (!title || !areaSqFt || !price || !city)
      return Alert.alert('Error', 'Please fill all required fields');

    try {
      setLoading(true);

      await addProperty({
        title,
        areaSqFt,
        address,
        price,
        description,
        city,
        plotNumber,
        surveyNumber
      });

      Alert.alert(
        "Property Listed",
        "Your property has been successfully published.",
      );

      setTitle('');
      setAreaSqFt('');
      setAddress('');
      setPrice('');
      setDescription('');
      setCity('');
      setPlotNumber('');
      setSurveyNumber('');
    } catch (error: any) {
      Alert.alert('Error', error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Add Property</Text>
        <Text style={styles.subHeading}>
          Enter the property details below
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Input label="Title *" value={title} onChangeText={setTitle} />
          <Input label="City *" value={city} onChangeText={setCity} />
          <Input
            label="Area (Sq.Ft) *"
            value={areaSqFt}
            onChangeText={setAreaSqFt}
            keyboardType="numeric"
          />
          <Input label="Price *" value={price} onChangeText={setPrice} keyboardType="numeric" />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Property Details</Text>

          <Input label="Plot Number" value={plotNumber} onChangeText={setPlotNumber} />
          <Input label="Survey Number" value={surveyNumber} onChangeText={setSurveyNumber} />
          <Input label="Address" value={address} onChangeText={setAddress} />
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            height={120}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handle}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Submit Property</Text>
          )}
        </TouchableOpacity>
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
      placeholderTextColor="#9CA3AF"
      selectionColor="#111827"
      cursorColor="#111827"
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    padding: 22,
    backgroundColor: '#F2F4F8',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    color: '#111'
  },
  subHeading: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 28
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 18,
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    color: '#6B7280'
  },
  input: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    fontSize: 15,
    color: '#111',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5
  }
});