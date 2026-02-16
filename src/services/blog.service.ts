import type { BlogWithProfile as Blog } from '../interfaces/blogInterface';
import api from './api';

export type PaginatedBlogs = {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Create Blog
export const createBlog = async (data: FormData): Promise<Blog> => {
  const response = await api.post('/blogs', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data.blog;
};

// Get All Blogs
export const getAllBlogs = async (page = 1, limit = 10, search = ''): Promise<PaginatedBlogs> => {
  const response = await api.get('/blogs', {
    params: { page, limit, search },
  });
  const { blogs, total, page: p, limit: l, totalPages } = response.data.data;
  return { blogs, total, page: p, limit: l, totalPages };
};

export const getFollowingBlogs = async (
  page = 1,
  limit = 10,
  search = '',
): Promise<PaginatedBlogs> => {
  const response = await api.get('/blogs/following', {
    params: { page, limit, search },
  });
  const { blogs, total, page: p, limit: l, totalPages } = response.data.data;
  return { blogs, total, page: p, limit: l, totalPages };
};

export const getTrendingBlogs = async (
  page = 1,
  limit = 10,
  search = '',
  decayHours?: number,
  minHoursWindow?: number,
): Promise<PaginatedBlogs> => {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.search = search;
  if (typeof decayHours === 'number') params.decayHours = decayHours;
  if (typeof minHoursWindow === 'number') params.minHoursWindow = minHoursWindow;

  const response = await api.get('/blogs/trending', { params });
  const { blogs, total, page: p, limit: l, totalPages } = response.data.data;
  return { blogs, total, page: p, limit: l, totalPages };
};

// Get my Blogs
export const getMyBlogs = async (): Promise<Blog[]> => {
  const response = await api.get('/blogs/my');
  return response.data.data.blogs;
};

// Get Blog By ID
export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await api.get(`/blogs/${id}`);
  return response.data.data.blog;
};

// Update Blog
export const updateBlog = async (id: string, data: FormData): Promise<Blog> => {
  const response = await api.put(`/blogs/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data.blog;
};

// Delete Blog
export const deleteBlog = async (id: string) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

// Publish Blog
export const publishBlog = async (id: string): Promise<Blog> => {
  const response = await api.patch(`/blogs/${id}/publish`);
  return response.data.data.blog;
};

// create draft
export const createDraft = async (data: FormData): Promise<Blog> => {
  const response = await api.post('/blogs/draft', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data.blog;
};

// update draft
export const updateDraft = async (id: string, data: FormData): Promise<Blog> => {
  const response = await api.put(`/blogs/draft/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data.blog;
};

// publish draft
export const publishDraft = async (id: string): Promise<Blog> => {
  const response = await api.put(`/blogs/publish/${id}`);
  return response.data.data.blog;
};

// archive blog
export const archivePost = async (id: string): Promise<Blog> => {
  const response = await api.put(`/blogs/archive/${id}`);
  return response.data.data.blog;
};

// Get my Drafts
export const getMyDrafts = async (): Promise<Blog[]> => {
  const response = await api.get('/blogs/drafts/my');
  return response.data.data.blogs;
};

// Get blogs of any user
export const getBlogsByUserId = async (userId: string): Promise<Blog[]> => {
  const response = await api.get(`/blogs/user/${userId}`);
  return response.data.data.blogs;
};
