import type { BlogWithProfile as Blog} from "../interfaces/blogInterface";
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

// Get my Blogs
export const getMyBlogs = async (): Promise<Blog[]> => {
  const response = await api.get("/blogs/my");
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

// create draft
export const createDraft = async (data: FormData): Promise<Blog> => {
  const response = await api.post("/blogs/draft", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.blog;
};

// update draft
export const updateDraft = async (
  id: string,
  data: FormData
): Promise<Blog> => {
  const response = await api.put(`/blogs/draft/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.blog;
};

// publish draft
export const publishDraft = async (id: string): Promise<Blog> => {
  const response = await api.put(`/blogs/publish/${id}`);
  return response.data.data.blog;
};