import { useState, useEffect } from "react";
import { fetchFeaturedProperties } from "@/services/propertyService";

export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchFeaturedProperties();
        setProperties(data);
      } catch (err) {
        setError("Der skete en fejl ved indlæsning af boliger");
        console.error("Fejl:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getProperties();
  }, []);

  return { properties, isLoading, error };
}
