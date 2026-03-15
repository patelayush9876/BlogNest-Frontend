import api from './api';

export const toggleSave = async (blogId: string): Promise<{ saved: boolean }> => {
  const response = await api.post('/saved/toggle', { blogId });
  return response.data.data; // this should be { saved: boolean }
};

export const getMySavedBlogs = async () => {
  const response = await api.get('/saved/me');
  return response.data.data.blogs;
};
