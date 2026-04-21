import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";

export const useExpenses = (filters) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getExpenses(filters);
      setExpenses(data);
    } catch (err) {
      setError("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  return { expenses, loading, error, refetch: fetchExpenses };
};