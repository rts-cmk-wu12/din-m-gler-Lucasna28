export async function fetchHeroImage() {
  const response = await fetch(
    "https://dinmaegler.onrender.com/homes/6163f0f0c72bd02bb41c89d9"
  );
  if (!response.ok) {
    throw new Error("Kunne ikke hente boligdata");
  }
  const data = await response.json();
  return data.images[0].url;
}
