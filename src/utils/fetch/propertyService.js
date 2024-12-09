export async function fetchAllProperties() {
  const response = await fetch("https://dinmaegler.onrender.com/homes");
  if (!response.ok) {
    throw new Error("Kunne ikke hente boliger");
  }
  const data = await response.json();
  return data;
}

export async function fetchPropertyById(id) {
  const response = await fetch(`https://dinmaegler.onrender.com/homes/${id}`);
  if (!response.ok) {
    throw new Error("Kunne ikke hente bolig");
  }
  const data = await response.json();
  return data;
}

export async function fetchFilteredProperties(filters) {
  const { priceRange, propertyType } = filters;

  try {
    const url = new URL("https://dinmaegler.onrender.com/homes");

    // Tilføj prisfiltre hvis de er sat
    if (priceRange[0] > 0) {
      url.searchParams.append("price_gte", priceRange[0]);
    }
    if (priceRange[1] < 12000000) {
      url.searchParams.append("price_lte", priceRange[1]);
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Kunne ikke hente boliger");

    const data = await response.json();

    // Filtrer efter boligtype hvis det ikke er 'Alle'
    if (propertyType && propertyType !== "Alle") {
      return data.filter((property) => property.type === propertyType);
    }

    return data;
  } catch (error) {
    throw new Error(
      "Der opstod en fejl ved hentning af boliger: " + error.message
    );
  }
}
