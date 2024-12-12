export const getEnergyLabelColor = (label) => {
  const colors = {
    A: "bg-energyLabel-A text-white",
    B: "bg-energyLabel-B text-white",
    C: "bg-energyLabel-C text-white",
    D: "bg-energyLabel-D text-gray-800",
    E: "bg-energyLabel-E text-gray-800",
    F: "bg-energylabel-F text-white",
    G: "bg-energylabel-G text-white",
  };
  return colors[label] || "bg-gray-200 text-gray-800";
};
