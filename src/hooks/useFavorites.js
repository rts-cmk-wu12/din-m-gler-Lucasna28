// hooks/useFavorites.js
import { useState } from "react";
import { addFavorite } from "../services/favoritesService";

export const useFavorites = (userId, token) => {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = async (homeId) => {
    try {
      const updatedFavorites = await addFavorite(userId, homeId, token);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return { favorites, handleAddFavorite };
};
