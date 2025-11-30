import api from "./api";

export const followUser = async (userId: string): Promise<string> => {
  const response = await api.post(`/follow/${userId}`);
  return response.data.message || "Followed";
};

export const unfollowUser = async (userId: string): Promise<string> => {
  const response = await api.delete(`/follow/${userId}`);
  return response.data.message || "Unfollowed";
};

export interface FollowerItem {
  _id: string;
  follower: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export const getFollowers = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ followers: FollowerItem[]; total: number }> => {
  const response = await api.get(`/follow/followers/${userId}`, {
    params: { page, limit },
  });

  return response.data.data;
};

export interface FollowingItem {
  _id: string;
  following: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export const getFollowing = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ following: FollowingItem[]; total: number }> => {
  const response = await api.get(`/follow/following/${userId}`, {
    params: { page, limit },
  });

  return response.data.data;
};
