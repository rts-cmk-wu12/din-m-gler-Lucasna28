// app/actions/favorites.js
"use server";

import { cookies } from "next/headers";

export async function toggleFavorite(propertyId) {
  const cookieStore = await cookies();
  const token = await cookieStore.get("dm_token");
  const userId = await cookieStore.get("dm_userid");

  if (!token || !userId) {
    console.log("Ikke autentificeret");
    return { success: false, error: "Not authenticated" };
  }

  try {
    // First, get current favorites
    const response = await fetch("https://dinmaegler.onrender.com/users/me", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current favorites");
    }

    const userData = await response.json();
    const currentFavorites = userData.homes || [];
    console.log("Nuværende favoritter:", currentFavorites);

    // Toggle the property in favorites
    let newFavorites;
    if (currentFavorites.includes(propertyId)) {
      newFavorites = currentFavorites.filter((id) => id !== propertyId);
    } else {
      newFavorites = [...currentFavorites, propertyId];
    }
    console.log("Opdaterede favoritter:", newFavorites);

    // Update favorites
    const updateResponse = await fetch(
      `https://dinmaegler.onrender.com/users/${userId.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          homes: newFavorites,
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update favorites");
    }

    return {
      success: true,
      isFavorite: !currentFavorites.includes(propertyId),
      favorites: newFavorites,
    };
  } catch (error) {
    console.error("Fejl i toggleFavorite:", error);
    return { success: false, error: error.message };
  }
}
