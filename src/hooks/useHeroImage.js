import { useState, useEffect } from "react";
import { fetchHeroImage } from "@/utils/fetch/homeService";

export function useHeroImage() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getHeroImage = async () => {
      try {
        const imageUrl = await fetchHeroImage();
        setBackgroundImage(imageUrl);
      } catch (err) {
        setError("Der skete en fejl ved indlæsning af billedet");
        console.error("Fejl:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getHeroImage();
  }, []);

  return { backgroundImage, isLoading, error };
}
