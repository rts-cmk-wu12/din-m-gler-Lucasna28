import { useState, useEffect } from "react";
import {
  fetchPropertyById,
  fetchAllProperties,
} from "@/utils/fetch/propertyService";

// Hook til at hente en enkelt bolig
export function useProperty(id) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError("Der skete en fejl ved indlæsning af boligen");
        console.error("Fejl:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getProperty();
    }
  }, [id]);

  return { property, isLoading, error };
}

// Hook til at hente alle boliger
export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data);
      } catch (err) {
        setError("Der skete en fejl ved indlæsning af boligerne");
        console.error("Fejl:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getProperties();
  }, []);

  return { properties, isLoading, error };
}
