import { useState, useEffect } from "react";
import { useProperties } from "./useProperties";
import { useAgents } from "./useAgents";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { properties } = useProperties();
  const { agents } = useAgents();

  // Enhanced exact address matching
  const isExactAddressMatch = (property, searchTermLower) => {
    if (!property?.adress1) return false;

    const normalizedAddress = property.adress1.toLowerCase().trim();
    const normalizedSearch = searchTermLower.trim();

    // Check for exact match first
    if (normalizedAddress === normalizedSearch) return true;

    // Check if search includes both street name and number
    const [streetName, streetNumber] = normalizedSearch.split(/\s+(?=\d)/);
    if (streetName && streetNumber) {
      return normalizedAddress.includes(`${streetName} ${streetNumber}`);
    }

    return false;
  };

  // Improved fuzzy matching with higher precision
  const fuzzyMatch = (text, searchTerm) => {
    const searchLower = searchTerm.toLowerCase().trim();
    const textLower = (text || "").toLowerCase().trim();

    // For very specific searches (like full addresses), require a higher match threshold
    const isSpecificSearch =
      searchLower.includes(" ") && /\d/.test(searchLower);
    const threshold = isSpecificSearch ? 0.9 : 0.8;

    let matches = 0;
    let lastIndex = -1;

    for (const char of searchLower) {
      const index = textLower.indexOf(char, lastIndex + 1);
      if (index > lastIndex) {
        matches++;
        lastIndex = index;
      }
    }

    return matches / searchLower.length >= threshold;
  };

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);

      if (searchTerm.length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        setIsLoading(false);
        return;
      }

      const searchTermLower = searchTerm.toLowerCase().trim();
      const searchTermWords = searchTermLower
        .split(/\s+/)
        .filter((word) => word.length > 0);

      // Enhanced property search with exact address matching
      const matchedProperties = properties
        ?.filter((property) => {
          if (!property?.adress1 || !property.images?.[0]?.url) return false;

          // Check for exact address match first
          if (isExactAddressMatch(property, searchTermLower)) {
            return true;
          }

          // Only proceed with fuzzy search if no exact match
          const searchableFields = {
            address: property.adress1?.toLowerCase() || "",
            city: property.city?.toLowerCase() || "",
            zipCode: property.zipCode?.toString() || "",
            streetName: property.streetName?.toLowerCase() || "",
            propertyType: property.propertyType?.toLowerCase() || "",
          };

          return searchTermWords.every((word) =>
            Object.values(searchableFields).some((field) =>
              fuzzyMatch(field, word)
            )
          );
        })
        .map((property) => ({
          type: "property",
          id: property.id,
          title: property.adress1,
          subtitle: `${property.city} ${property.zipCode} - ${property.propertyType}`,
          image: property.images[0].url,
          details: {
            price: property.price,
            size: property.size,
            rooms: property.rooms,
            type: property.propertyType,
          },
        }));

      // Only show exact matches if searching for a specific address
      const hasExactMatch = matchedProperties.some((property) =>
        isExactAddressMatch({ adress1: property.title }, searchTermLower)
      );

      const finalProperties = hasExactMatch
        ? matchedProperties.filter((property) =>
            isExactAddressMatch({ adress1: property.title }, searchTermLower)
          )
        : matchedProperties.slice(0, 3);

      // Enhanced agent search
      const matchedAgents = agents
        ?.filter((agent) => {
          if (!agent?.name || !agent.image?.url) return false;

          const searchableFields = {
            name: agent.name?.toLowerCase() || "",
            title: agent.title?.toLowerCase() || "",
            office: agent.office?.toLowerCase() || "",
            specialization: agent.specialization?.toLowerCase() || "",
            area: agent.area?.toLowerCase() || "",
          };

          return searchTermWords.every((word) =>
            Object.values(searchableFields).some((field) =>
              fuzzyMatch(field, word)
            )
          );
        })
        .slice(0, 3)
        .map((agent) => ({
          type: "agent",
          id: agent.id,
          title: agent.name,
          subtitle: `${agent.title} - ${agent.office}`,
          image: agent.image.url,
          details: {
            specialization: agent.specialization,
            area: agent.area,
            phone: agent.phone,
            email: agent.email,
          },
        }));

      const filteredResults =
        selectedFilter === "properties"
          ? finalProperties
          : selectedFilter === "agents"
          ? matchedAgents
          : [...finalProperties, ...matchedAgents];

      setSearchResults(filteredResults);
      setShowDropdown(Boolean(filteredResults.length));
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, properties, agents, selectedFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowDropdown(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    showDropdown,
    setShowDropdown,
    handleSearch,
    selectedFilter,
    setSelectedFilter,
  };
};
