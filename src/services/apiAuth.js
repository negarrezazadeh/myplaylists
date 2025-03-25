import http from "../utils/http";

export const login = async ({ email, password }) => {
  if (!email || !password) return;

  await http.get("/sanctum/csrf-cookie");

  const response = await http.post("/login", { email, password });
  
  return response;
};

export const logout = async () => {
  const response = await http.post("/logout");
  return response.data;
};

export const register = async ({ email, password, name, code }) => {
  if (!email || !password || !code) return;

  await http.get("/sanctum/csrf-cookie");

  const response = await http.post("/register", {
    email,
    password,
    name,
    code,
  });

  return response;
};

export const telegramAuth = async (data) => {
  await http.get("/sanctum/csrf-cookie");
  
  const response = await http.post(`/telegram-auth`, data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await http.get("/api/user");
  return response.data;
};

export const otp = async (email) => {
  if (!email) return;

  const response = await http.post("/otp", { email });
  return response.data;
};

export const getToken = async () => {
  const response = await http.get("api/token");
  return response.data;
};