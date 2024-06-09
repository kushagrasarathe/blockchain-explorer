import _axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const axios = _axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: API_URL,
  // baseURL: `${API_URL}/api`,
  timeout: 20000,
});

export const fetchLatestTransactions = async (page = 1, type?: string) => {
  const params = new URLSearchParams({ page: String(page) });
  if (type) params.append("type", type);
  const { data } = await axios.get(`/transactions?${params}`);
  return data;
};

export const fetchTransaction = async (id: string) => {
  const { data } = await axios.get(`/transactions/${id}`);
  return data;
};

export const fetchTransactionEvents = async (txHash: string) => {
  const { data } = await axios.get(`/events/transaction/${txHash}`);
  return data;
};
