import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { FRONTEND_CONFIG } from "../../config/keyConfig";
import {
  required,
  validateField,
  validCaptcha,
  validEmail,
} from "../../utils/validators";
import API_CONFIG from "../../config/apiConfig";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    captcha?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const RECAPTCHA_SITE_KEY = FRONTEND_CONFIG.RECAPTCHA_SITE_KEY;
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    // Validate fields
    const emailErrors = validateField(email, [required("Email"), validEmail]);
    const passwordErrors = validateField(password, [required("Password")]);
    const captchaErrors = validateField(captchaToken || "", [validCaptcha]);

    if (emailErrors.length || passwordErrors.length || !captchaToken) {
      setErrors({
        email: emailErrors,
        password: passwordErrors,
        captcha: captchaErrors.length ? captchaErrors[0] : undefined,
      });
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password, captchaToken);

      // Get stored user from localStorage
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      // Redirect based on role
      switch (user?.role) {
        case "admin":
          navigate("/admin");
          break;
        case "user":
          navigate("/user");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="w-full max-w-md bg-white p-10 border ">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/Images/BlogNest.png" alt="Logo" className="h-12" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please enter your credentials to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.join(", ")}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 pr-10 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                }`}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.join(", ")}
              </p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY || ""}
              onChange={(token: string | null) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>
          {errors.captcha && (
            <p className="text-sm text-red-500 text-center">{errors.captcha}</p>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 btn-primary  ${
              loading ? "btn-loading" : ""
            } `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center mt-6">
            <span className="border-t w-1/4 border-gray-300"></span>
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <span className="border-t w-1/4 border-gray-300"></span>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={() =>
              (window.location.href = `${API_CONFIG.BASE_URL}/auth/google`)
            }
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 w-full mt-4 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-gray-700 font-semibold">
              Continue with Google
            </span>
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-green-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
