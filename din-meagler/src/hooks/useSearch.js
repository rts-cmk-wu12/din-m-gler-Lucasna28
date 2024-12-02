import { useState, useEffect } from "react";
import { useProperties } from "./useProperties";
import { useAgents } from "./useAgents";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { properties } = useProperties();
  const { agents } = useAgents();

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);

      if (searchTerm.length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        setIsLoading(false);
        return;
      }

      const searchTermLower = searchTerm.toLowerCase();
      const searchTermWords = searchTermLower
        .split(" ")
        .filter((word) => word.length > 0);

      // Søg i properties med null check
      const matchedProperties =
        properties
          ?.filter((property) => {
            const addressLower = property?.address?.toLowerCase() || "";
            const descriptionLower = property?.description?.toLowerCase() || "";

            // Tjekker om alle søgeord findes i enten adressen eller beskrivelsen
            return (
              searchTermWords.every(
                (word) =>
                  addressLower.includes(word) || descriptionLower.includes(word)
              ) && property?.images?.[0]?.url
            );
          })
          ?.slice(0, 3)
          ?.map((property) => ({
            type: "property",
            id: property.id,
            title: property.adress1 || "Ukendt adresse",
            subtitle: property.price
              ? `${property.price.toLocaleString()} kr.`
              : "Pris ikke angivet",
            image: property.images[0].url,
          })) || [];

      // Søg i agents med null check
      const matchedAgents =
        agents
          ?.filter(
            (agent) =>
              (agent?.name?.toLowerCase()?.includes(searchTermLower) ||
                agent?.title?.toLowerCase()?.includes(searchTermLower)) &&
              agent?.image?.url // Sikrer at der er et billede
          )
          ?.slice(0, 3)
          ?.map((agent) => ({
            type: "agent",
            id: agent.id,
            title: agent.name || "Ukendt navn",
            subtitle: agent.title || "Ukendt titel",
            image: agent.image.url,
          })) || [];

      setSearchResults([...matchedProperties, ...matchedAgents]);
      setShowDropdown(true);
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, properties, agents]);

  // Luk dropdown når der klikkes udenfor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    showDropdown,
    setShowDropdown,
  };
};
