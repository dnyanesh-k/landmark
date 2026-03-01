import { addProperty as addPropertyService, getMyProperties, getProperties } from '@/services/property.service';
import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

export const PropertyContext = createContext<any>({});

export const PropertyProvider = ({ children }: { children: React.ReactNode }) => {
  const [properties, setProperties] = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const { token, user } = useContext(AuthContext); // Extract user for sellerId

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data?.data || data || []);
    } catch (error) {
      console.log("Context Error:", error);
    }
  };

  const fetchMyProperties = async () => {
    try {
      if (!token) return;
      const response = await getMyProperties(token);
      setMyProperties(response?.data || response || []);
    } catch (error) {
      console.log("Fetch My Properties Error:", error);
    }
  };

  // ADD THIS METHOD
  const addProperty = async (formPayload: any) => {
    try {
      if (!token || !user) throw 'You must be logged in';

      // Transform UI fields to match your Spring Boot PropertyRequestDTO
      const finalPayload = {
        ...formPayload,
        sellerId: user.userId, // Required by DTO
        price: Number(formPayload.price),
        areaSqFt: Number(formPayload.areaSqFt)
      };
      console.log("FINAL PAYLOAD ", JSON.stringify(finalPayload));


      const res = await addPropertyService(finalPayload, token);
      await fetchMyProperties(); // Refresh the list automatically
      return res;
    } catch (error) {
      console.log("Add Property Error:", error);
      throw error;
    }
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      fetchProperties,
      myProperties,
      fetchMyProperties,
      addProperty // Expose to UI
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
