import axios from "axios";

const API_BASE_URL = process.env.API_URL as string;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (data: { username: string; email: string; password: string }) =>
    api.post("/api/v1/user/signup", data),
  login: (data: { email: string; password: string }) =>
    api.post("/api/v1/user/login", data),
  getUser: () => api.get("/api/v1/user/me"),
  updateUser: (data: { username?: string; password?: string }) =>
    api.patch("/api/v1/user/me/update", data),
  deleteUser: () => api.delete("/api/v1/user/me/delete"),
};

// Expense APIs
export const expenseAPI = {
  createExpense: (data: {
    expenseName: string;
    amount: number;
    category: string;
  }) => api.post("/api/v1/expense/create", data),
  updateExpense: (
    id: string,
    data: { expenseName?: string; amount?: number; category?: string }
  ) => api.patch(`/api/v1/expense/${id}`, data),
  getExpense: (id: string) => api.get(`/api/v1/expense/${id}`),
  getExpensesByCategory: (category: string) =>
    api.get(`/api/v1/expenses?category=${category}`),
  getAllExpenses: (page = 1, limit = 10) =>
    api.get(`/api/v1/expenses/all?page=${page}&limit=${limit}`),
  deleteExpense: (id: string) => api.delete(`/api/v1/expense/${id}`),
};

export default api;
