import type { LoginRequest, LoginResponse, SignupInput, SignupResponse } from "../interfaces/userInterface";
import api from "./api";


export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const signupUser = async (data: SignupInput): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/auth/register", data);
  return response.data;
};

export const logoutApi = async (refreshToken: string): Promise<any> => {
  if (!refreshToken) throw new Error("Refresh token is required");
  try {
    const response = await api.post("/auth/logout", { refreshToken });
    return response.data;
  } catch (err: any) {
    console.error("Logout API failed:", err);
    throw err;
  }
};
