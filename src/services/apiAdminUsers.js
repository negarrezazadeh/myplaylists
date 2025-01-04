import http from "@/utils/http";

export const adminGetUsers = async () => {
  const response = await http.get(`/api/admin/users`);
  return response.data;
};

export const adminGetUser = async (id) => {
    const response = await http.get(`/api/admin/users/${id}`);
    return response.data;
  };

export const adminCreateUser = async (data) => {
  const response = await http.post(`/api/admin/users`, data);
  return response.data;
};

export const adminUpdateUser = async ({ userId, data }) => {
  const response = await http.put(`/api/admin/users/${userId}`, data);
  return response.data;
};

export const adminDeleteUser = async (userId) => {
  const response = await http.delete(`/api/admin/users/${userId}`);
  return response.data;
};
