  export interface User {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface LoginResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
  }

  export interface LoginRequest {
    email: string;
    password: string;
    captchaToken: string;
  }
