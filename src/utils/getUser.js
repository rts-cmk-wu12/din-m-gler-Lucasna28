"use server";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("dm_token")?.value;

  if (!jwt) return null;

  try {
    const response = await fetch("https://dinmaegler.onrender.com/users/me", {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store", // Sørg for at hente friske data
    });

    if (!response.ok) throw new Error("Failed to fetch user");

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
