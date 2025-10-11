export interface BlogInput {
  title: string;
  content: string;
  tags?: string[];
  attachment?: File | null; // file for upload
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
    profile: {
        bio:string;
        followers:[];
        following:[];
        likesCount: number;
        postsCount: number;
        profilePic: string;
    }
  };
  attachment?: string | null; // uploaded file URL
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
