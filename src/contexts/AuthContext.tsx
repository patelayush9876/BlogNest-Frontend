import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { setSessionExpiredCallback } from "../services/api";
import { showToast } from "../services/toast.service";
import { login, logoutApi } from "../services/auth.service";
import { getLoggedInUser } from "../services/user.service";
import type { LoginResponse } from "../interfaces/userInterface";

interface AuthContextType {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  loginUser: (
    email: string,
    password: string,
    captchaToken: string
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken?: string) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load tokens and user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedUser && storedAccessToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }

    // Set up session expired callback
    setSessionExpiredCallback(() => {
      clearAuthData();
      showToast(
        "Session expired due to inactivity. Please login again.",
        "error"
      );
      navigate("/");
    });
  }, []);

  // Helper to clear auth data
  const clearAuthData = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Login user
  const loginUser = async (
    email: string,
    password: string,
    captchaToken: string
  ) => {
    try {
      const response: LoginResponse = await login({ email, password, captchaToken });

      // Handle both possible response shapes
      const data = (response as any).data || response;
      const { user, accessToken, refreshToken } = data;

      if (!accessToken || !refreshToken) {
        throw new Error("Invalid login response: tokens missing");
      }

      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      showToast("Login successful!", "success");
      navigate("/dashboard"); // redirect as needed
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      showToast(message, "error");
      throw err;
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      if (refreshToken) await logoutApi(refreshToken);
      showToast("Logged out successfully.", "success");
    } catch (err) {
      console.error("Logout failed:", err);
      showToast("Logout failed. Please try again.", "error");
    } finally {
      clearAuthData();
      navigate("/");
    }
  };

  // Refresh logged-in user info
  const refreshUser = async () => {
    if (!accessToken) return;
    try {
      const res = await getLoggedInUser();
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  // Update access & refresh tokens
  const setTokens = (newAccessToken: string, newRefreshToken?: string) => {
    setAccessToken(newAccessToken);
    localStorage.setItem("accessToken", newAccessToken);

    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loginUser,
        logoutUser,
        setTokens,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
