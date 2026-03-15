import api from './api';

// Toggle Like on a Blog (requires authentication)
export const toggleLike = async (
  blogId: string,
): Promise<{
  liked: boolean;
  likeCount: number;
}> => {
  const response = await api.post(`/likes/${blogId}`);
  return response.data.data; // contains { liked, likeCount }
};

// Get Like Count for a Blog (public)
export const getLikes = async (blogId: string): Promise<number> => {
  const response = await api.get(`/likes/${blogId}`);
  return response.data.data.count; // backend returns { count }
};
