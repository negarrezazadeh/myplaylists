import http from "@/utils/http";

export const updateProfile = async ({data }) => {
  const response = await http.put(`/api/profile`, data);
  return response.data;
};