"use client";
import { useState, useEffect } from "react";

export function useAgents() {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("https://dinmaegler.onrender.com/agents");
        if (!response.ok) throw new Error("Kunne ikke hente mæglere");
        const data = await response.json();
        setAgents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return { agents, isLoading, error };
}
