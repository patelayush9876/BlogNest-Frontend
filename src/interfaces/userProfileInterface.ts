export interface IUserProfile {
  user: {
    name:string;
    role:string;
    email:string;
  };
  username: string;
  bio?: string;
  profilePic?: string;
  postsCount: number;
  likesCount: number;
  followers: string[];    // array of user IDs
  following: string[];    // array of user IDs
  createdAt: string;      // ISO string
  updatedAt: string;      // ISO string
}

export interface UserProfileResponse {
  success: boolean;
  message?: string;
  data: IUserProfile;
}
