import { fetchAgentData } from "@/utils/fetch/fetchAgentData";
import { useState, useEffect } from "react";

export function useAgent(id) {
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const data = await fetchAgentData(id);
        setAgent(data);
      } catch (err) {
        setError("Kunne ikke hente mæglerdata");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgent();
  }, [id]);

  return { agent, isLoading, error };
}
