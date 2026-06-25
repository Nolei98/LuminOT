"use client";

import { useEffect, useState } from "react";

// Simula a latência de um fetch real para exercitar os estados de loading/vazio.
// Troque a fonte de `data` por uma chamada real ao back-end quando estiver disponível;
// a UI consumidora (loading -> vazio -> populado) não precisa mudar.
export function useMockFetch<T>(data: T[], delayMs = 500) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs]);

  return {
    data: loading ? [] : data,
    loading,
    isEmpty: !loading && data.length === 0,
  };
}
