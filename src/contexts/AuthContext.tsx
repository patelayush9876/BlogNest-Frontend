import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { setSessionExpiredCallback } from "../services/api";
import { showToast } from "../services/toastService";
import { login, logoutApi } from "../services/authService";
import { getLoggedInUser } from "../services/userService";


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
  // Load tokens/user from localStorage and register session callback
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedUser && storedAccessToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }

    // Global auth event callback
    setSessionExpiredCallback(() => {
      // Only clear auth keys
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      showToast(
        "Session expired due to inactivity. Please login again.",
        "error"
      );
      navigate("/");
    });
  }, []);

  const loginUser = async (
    email: string,
    password: string,
    captchaToken: string
  ) => {
    try {
      const res = await login({ email, password, captchaToken });
      setUser(res.user);
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);

      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      showToast("Login successful!", "success");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      showToast(message, "error");
      throw err;
    }
  };


  const logoutUser = async () => {
    try {
      if (refreshToken) await logoutApi(refreshToken);
      showToast("Logged out successfully.", "success");
    } catch (err) {
      console.error("Logout failed:", err);
      showToast("Logout failed. Please try again.", "error");
    } finally {
      // Only remove auth-related keys
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  const refreshUser = async () => {
    if (!accessToken) return;
    try {
      const res = await getLoggedInUser();
      setUser(res.data); // assuming service returns { success, data }
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };
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
