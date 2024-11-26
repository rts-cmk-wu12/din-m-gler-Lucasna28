export async function fetchAllProperties() {
  const response = await fetch("https://dinmaegler.onrender.com/homes");
  if (!response.ok) {
    throw new Error("Kunne ikke hente boliger");
  }
  const data = await response.json();
  return data;
}
