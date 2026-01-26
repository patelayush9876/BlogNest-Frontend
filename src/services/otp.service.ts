import api from "./api";

export interface VerifyOtpResponse {
  status: boolean;
  message: string;
  data: {
    user: any;
    accessToken: string;
    refreshToken: string;
  };
}

export interface BasicOtpResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const verifyEmailOtp = async (
  email: string,
  otp: string
): Promise<VerifyOtpResponse> => {
  const response = await api.post("/otp/verify", {
    email,
    otp,
  });

  return response.data;
};

export const resendEmailOtp = async (
  email: string
): Promise<BasicOtpResponse> => {
  const response = await api.post("/otp/resend", {
    email,
  });

  return response.data;
};
