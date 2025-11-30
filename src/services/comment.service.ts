import api from "./api";

// Add a comment or reply (requires auth)
export const addComment = async (
  blogId: string,
  text: string,
  parentCommentId?: string
) => {
  const payload = parentCommentId ? { text, parentCommentId } : { text };
  const response = await api.post(`/comments/${blogId}`, payload);
  return response.data.data; // backend returns { comment }
};

// Get all comments (with nested replies) for a blog (public)
export const getComments = async (blogId: string) => {
  const response = await api.get(`/comments/${blogId}`);
  return response.data.data; // backend returns { comments }
};

// Delete a specific comment (requires auth)
export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data.data; // backend returns { deletedComment }
};

// Like / Unlike a comment (requires auth)
export const toggleLikeComment = async (commentId: string) => {
  const response = await api.post(`/comments/like/${commentId}`);
  return response.data.data; // backend returns { liked, comment }
};

export const getCommentCount = async (blogId: string) => {
  const response = await api.get(`/comments/count/${blogId}`);
  return response.data.data.count;
};