import type {
  ApiResponse,
  ChangePasswordInput,
  ForgotPasswordInput,
  LoginRequest,
  LoginResponse,
  ResetPasswordInput,
  SignupInput,
  SignupResponse,
} from '../interfaces/userInterface';
import api from './api';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const signupUser = async (data: SignupInput): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>('/auth/register', data);
  return response.data;
};

export const logoutApi = async (refreshToken: string): Promise<any> => {
  if (!refreshToken) throw new Error('Refresh token is required');
  const response = await api.post('/auth/logout', { refreshToken });
  return response.data;
};

export const changePassword = async (data: ChangePasswordInput): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/auth/change-password', data);
  return response.data;
};

export const deleteAccount = async (): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/auth/delete-account');
  return response.data;
};

export const recoverAccount = async (): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/auth/recover-account');
  return response.data;
};

export const forgotPassword = async (data: ForgotPasswordInput): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/auth/forgot-password', data);
  return response.data;
};

export const verifyResetPasswordOtp = async (data: {
  email: string;
  otp: string;
}): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/auth/forgot-password/verify-otp', data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordInput): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/auth/reset-password', data);
  return response.data;
};
