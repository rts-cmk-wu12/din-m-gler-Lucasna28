export async function fetchAgentData(id) {
  const res = await fetch(`https://dinmaegler.onrender.com/agents/${id}`);
  if (!res.ok) throw new Error("Kunne ikke hente mæglerdata");
  return await res.json();
}
