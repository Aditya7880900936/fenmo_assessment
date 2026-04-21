import axios from "axios";

const api = axios.create({
  baseURL: "https://fenmo-assessment-pgl7.onrender.com",
});

export const getExpenses = async (params) => {
  const res = await api.get("/expenses", { params });
  return res.data;
};

export const createExpense = async (data) => {
  const res = await api.post("/expenses", data, {
    headers: {
      "Idempotency-Key": crypto.randomUUID(),
    },
  });
  return res.data;
};

export default api;