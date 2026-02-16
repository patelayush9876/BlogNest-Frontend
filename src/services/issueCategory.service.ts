import api from './api';

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  description?: string;
}

export const IssueCategoryService = {
  // Get active categories (public)
  async getActiveCategories() {
    const response = await api.get('/issueCategories');
    return response.data;
  },

  // Admin: create category
  async createCategory(data: CreateCategoryPayload) {
    const response = await api.post('/issueCategories', data);
    return response.data;
  },

  // Admin: toggle category
  async toggleCategory(categoryId: string, isActive: boolean) {
    const response = await api.patch(`/issueCategories/${categoryId}/toggle`, {
      isActive,
    });

    return response.data;
  },
};
