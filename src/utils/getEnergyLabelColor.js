export const getEnergyLabelColor = (label) => {
  const colors = {
    A: "bg-energylabel-A text-white",
    B: "bg-energylabel-B text-white",
    C: "bg-energylabel-C text-white",
    D: "bg-energylabel-D text-gray-800",
    E: "bg-energylabel-E text-gray-800",
    F: "bg-energylabel-F text-white",
    G: "bg-energylabel-G text-white",
  };
  return colors[label] || "bg-gray-200 text-gray-800";
};
