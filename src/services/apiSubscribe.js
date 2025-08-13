import http from "@/utils/http";

export const subscribe = async (id) => {
  const response = await http.post(`/api/subscribers/${id}`);
  return response.data;
};

export const isSubscribe = async (id) => {
  const response = await http.get(`/api/is-subscribe/${id}`);
  return response.data;
};

export const subscriptions = async (id) => {
  const response = await http.get(`/api/subscriptions/${id}`);
  return response.data;
};

export const subscribers = async (id) => {
  const response = await http.get(`/api/subscribers/${id}`);
  return response.data;
};
