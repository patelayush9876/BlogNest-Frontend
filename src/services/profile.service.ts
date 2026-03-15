// services/userProfileService.ts
import type { IUserProfile } from '../interfaces/userProfileInterface';
import api from './api';

export const getMyProfile = async (): Promise<IUserProfile> => {
  try {
    const response = await api.get<{ success: boolean; data: IUserProfile }>('/profile/me');
    return response.data.data;
  } catch (err: any) {
    console.error('Fetching profile failed:', err);
    throw err;
  }
};

export const updateMyProfile = async (profileData: FormData): Promise<IUserProfile> => {
  try {
    const response = await api.put<{ success: boolean; data: IUserProfile }>(
      '/profile/update',
      profileData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  } catch (err: any) {
    console.error('Updating profile failed:', err);
    throw err;
  }
};

export const getProfileById = async (userId: string) => {
  const response = await api.get(`/profile/${userId}`);
  return response.data.data;
};

export interface SuggestedUser {
  _id: string;
  name: string;
  email?: string;
  followerCount: number;
  profile?: {
    username?: string;
    profilePic?: string;
    bio?: string;
  };
}

export const getSuggestedUsers = async (limit: number = 5): Promise<SuggestedUser[]> => {
  const response = await api.get('/profile/suggested', {
    params: { limit },
  });

  return response.data.data;
};
