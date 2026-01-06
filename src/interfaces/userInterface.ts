export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  status: "active" | "inactive" | "banned";
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}
export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  captchaToken: string;
}
export interface SignupInput {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  captchaToken: string;
}

export interface SignupResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

