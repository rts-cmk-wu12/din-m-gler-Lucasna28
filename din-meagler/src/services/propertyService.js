export async function fetchFeaturedProperties() {
  const response = await fetch("https://dinmaegler.onrender.com/homes");
  if (!response.ok) {
    throw new Error("Kunne ikke hente boliger");
  }
  const data = await response.json();
  return data.slice(0, 4); // Returnerer kun de første 4 boliger
}
