// app/api/favorites/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!token || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { propertyId } = await request.json();

    // Get current user favorites
    const userResponse = await fetch(
      `https://dinmaegler.onrender.com/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    const currentFavorites = userData.favorites || [];

    // Toggle the property in favorites array
    const isFavorited = currentFavorites.includes(propertyId);
    const newFavorites = isFavorited
      ? currentFavorites.filter((id) => id !== propertyId)
      : [...currentFavorites, propertyId];

    // Update user favorites
    const updateResponse = await fetch(
      `https://dinmaegler.onrender.com/users/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: newFavorites }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update favorites");
    }

    return NextResponse.json({
      success: true,
      isFavorited: !isFavorited,
      message: !isFavorited
        ? "Tilføjet til favoritter"
        : "Fjernet fra favoritter",
    });
  } catch (error) {
    console.error("Error updating favorites:", error);
    return NextResponse.json({ error: "Der opstod en fejl" }, { status: 500 });
  }
}
