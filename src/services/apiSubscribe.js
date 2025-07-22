import http from "@/utils/http";

export const subscribe = async (id) => {
  const response = await http.post(`/api/subscribers/${id}`);
  return response.data;
};

export const subscriptions = async () => {
  const response = await http.get(`/api/subscriptions`);
  return response.data;
};

export const subscribers = async () => {
  const response = await http.get(`/api/subscribers`);
  return response.data;
};
