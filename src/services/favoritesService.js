// services/favoritesService.js
export const addFavorite = async (userId, homeId, token) => {
  const response = await fetch("/api/user/favorites", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, favorites: [homeId] }),
  });

  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }
  return await response.json();
};
