import api from './api';

interface UpdateUserInput {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'user' | 'admin';
  status?: 'active' | 'inactive' | 'banned';
}

// GET /users
export const getAllUsers = async (params: GetUsersParams = {}) => {
  const response = await api.get('/user', {
    params,
  });
  return response.data; // { status, message, data }
};
// GET /users/:id
export const getUserById = async (id: string) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

// PATCH /users/:id/status
export const changeUserStatus = async (id: string, status: 'active' | 'inactive' | 'banned') => {
  const response = await api.patch(`/user/${id}/status`, { status });
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserInput) => {
  const response = await api.put(`/user/${id}`, data);
  return response.data;
};

export const deactivateUser = async (id: string) => {
  const response = await api.patch(`/user/${id}/deactivate`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/${id}`);
  return response.data;
};

export const getLoggedInUser = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

export const changePassword = async (id: string, oldPassword: string, newPassword: string) => {
  const response = await api.post(`/user/${id}/change-password`, {
    oldPassword,
    newPassword,
  });
  return response.data;
};
