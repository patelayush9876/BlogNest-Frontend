import api from "./api";

export interface BlogCategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all blog categories
 */
export const getAllCategories = async (): Promise<BlogCategory[]> => {
  const response = await api.get("/categories");
  return response.data.data.categories;
};

/**
 * Create a new blog category
 */
export const createCategory = async (name: string): Promise<BlogCategory> => {
  const response = await api.post("/categories", { name });
  return response.data.data.category;
};

/**
 * Delete a blog category by ID
 */
export const deleteCategory = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
