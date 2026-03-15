import api from './api';

export interface CreateIssuePayload {
  title: string;
  description: string;
  category: string;
  attachment?: File;
}

export const ReportIssueService = {
  // Create issue
  async createIssue(data: CreateIssuePayload) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);

    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }

    const response = await api.post('/issues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Get my issues
  async getMyIssues(page = 1, limit = 10) {
    const response = await api.get('/issues/my', {
      params: { page, limit },
    });

    return response.data;
  },

  // Admin: get all issues
  async getAllIssues(page = 1, limit = 10, status?: string) {
    const response = await api.get('/issues', {
      params: { page, limit, status },
    });

    return response.data;
  },

  // Admin: update issue status
  async updateStatus(issueId: string, status: string) {
    const response = await api.patch(`/issues/${issueId}/status`, { status });

    return response.data;
  },
};
