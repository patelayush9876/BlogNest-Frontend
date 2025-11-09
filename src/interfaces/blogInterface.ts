export interface Like {
  _id: string;
  userId: string;
  blogId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Profile {
  _id: string;
  user: string;
  bio: string;
  followers: any[];
  following: any[];
  likesCount: number;
  postsCount: number;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BlogWithProfile {
  _id: string;
  title: string;
  content: string;
  author: Author;
  category: Category;
  attachment?: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profile: Profile;
  likes?: { _id: string; userId: string; blogId: string }[];
  comments?: { _id: string; user: string; text: string }[];
  likeCount?: number;
  commentCount?: number;
  readTime?: string;
  likedByCurrentUser?: boolean;
}
