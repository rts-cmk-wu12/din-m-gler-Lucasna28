// src/hooks/useFavorites.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const newFavorites = favorites
      .filter((fav) => fav.id !== id)
      .map((fav) => fav.id);
    try {
      const userId = Cookies.get("dm_userid");
      const token = Cookies.get("dm_token");

      if (!userId || !token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://dinmaegler.onrender.com/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch favorites");

      const userData = await response.json();
      const homeIds = userData.homes || [];

      // Fetch all favorited properties
      const fetchPromises = homeIds.map((id) =>
        fetch(`https://dinmaegler.onrender.com/homes/${id}`).then((res) =>
          res.json()
        )
      );

      const homesData = await Promise.all(fetchPromises);
      setFavorites(homesData);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (propertyId) => {
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");

      if (!userId || !token) {
        console.log("User must be logged in to manage favorites");
        return false;
      }

      const isFavorited = favorites.some((fav) => fav.id === propertyId);
      let newFavorites;

      if (isFavorited) {
        newFavorites = favorites.filter((fav) => fav.id !== propertyId);
      } else {
        const propertyResponse = await fetch(
          `https://dinmaegler.onrender.com/homes/${propertyId}`
        );
        const propertyData = await propertyResponse.json();
        newFavorites = [...favorites, propertyData];
      }

      // Update the server
      const response = await fetch(
        `https://dinmaegler.onrender.com/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            homes: newFavorites.map((fav) => fav.id),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update favorites");

      setFavorites(newFavorites);
      return true;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return false;
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some((fav) => fav.id === propertyId);
  };

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
  };
}
