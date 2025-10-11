import type { Blog } from "../interfaces/blogInterface";
import api from "./api";

// Create Blog
export const createBlog = async (data: FormData): Promise<Blog> => {
  const response = await api.post("/blogs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.blog;
};

// Get All Blogs
export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await api.get("/blogs");
  return response.data.data.blogs;
};

// Get Blog By ID
export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await api.get(`/blogs/${id}`);
  return response.data.data.blog;
};

// Update Blog
export const updateBlog = async (id: string, data: FormData): Promise<Blog> => {
  const response = await api.put(`/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.blog;
};

// Delete Blog
export const deleteBlog = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

// Publish Blog
export const publishBlog = async (id: string): Promise<Blog> => {
  const response = await api.patch(`/blogs/${id}/publish`);
  return response.data.data.blog;
};
