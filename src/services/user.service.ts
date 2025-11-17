
import api from "./api";


interface UpdateUserInput {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: "user" | "admin";
  isActive?: boolean;
}


export const updateUser = async (id: string, data: UpdateUserInput) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deactivateUser = async (id: string) => {
  const response = await api.patch(`/users/${id}/deactivate`);
  return response.data;
};


export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};


export const getLoggedInUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
  const response = await api.post(`/users/${id}/change-password`, {
    oldPassword,
    newPassword,
  });
  return response.data;
};
