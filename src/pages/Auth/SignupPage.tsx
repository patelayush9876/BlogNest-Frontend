import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { FRONTEND_CONFIG } from '../../config/keyConfig';
import { required, validateField, validCaptcha, validEmail } from '../../utils/validators';
import API_CONFIG from '../../config/apiConfig';
import type { SignupInput } from '../../interfaces/userInterface';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupInput>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaToken: '',
  });

  const [errors, setErrors] = useState<{
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    captcha?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const RECAPTCHA_SITE_KEY = FRONTEND_CONFIG.RECAPTCHA_SITE_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    const nameErrors = validateField(formData.name, [required('Name')]);
    const emailErrors = validateField(formData.email, [required('Email'), validEmail]);
    const passwordErrors = validateField(formData.password, [required('Password')]);
    const confirmPasswordErrors =
      formData.confirmPassword !== formData.password ? ['Passwords do not match'] : [];
    const captchaErrors = validateField(formData.captchaToken || '', [validCaptcha]);

    if (
      nameErrors.length ||
      emailErrors.length ||
      passwordErrors.length ||
      confirmPasswordErrors.length ||
      captchaErrors.length
    ) {
      setErrors({
        name: nameErrors,
        email: emailErrors,
        password: passwordErrors,
        confirmPassword: confirmPasswordErrors,
        captcha: captchaErrors.length ? captchaErrors[0] : undefined,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        captchaToken: formData.captchaToken,
      });

      // ✅ store email temporarily
      localStorage.setItem('pendingEmail', formData.email);

      // ✅ go to OTP page
      navigate('/verify-email', {
        state: { email: formData.email },
      });
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-white">
      {/* LEFT IMAGE / BRAND SECTION */}
      <div className="hidden md:flex w-2/3 relative">
        <img
          src="/Images/signup-bg.jpeg"
          alt="Signup background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-700/70"></div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-2 mb-6">
            <img src="/Images/logo-dark.png" alt="Logo" className="w-40" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Share Your Story with the World</h1>

          <p className="text-lg text-purple-100 leading-relaxed max-w-md">
            Join thousands of writers sharing their thoughts, experiences, and expertise with our
            growing community.
          </p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/3 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-xl ">
          {/* Logo (mobile only) */}
          <div className="flex justify-center mb-5 md:hidden">
            <img src="/Images/BlogNest.png" alt="Logo" className="h-12" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
            Create an Account
          </h2>
          <p className="text-gray-600 text-center mb-6">Sign up to start your blogging journey</p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.join(', ')}</p>}
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block font-semibold text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your preferred username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.username
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.join(', ')}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.join(', ')}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 pr-10 ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
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
                <p className="text-sm text-red-500 mt-1">{errors.password.join(', ')}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.join(', ')}</p>
              )}
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center pt-2">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY || ''}
                onChange={(token: string | null) =>
                  setFormData((prev) => ({
                    ...prev,
                    captchaToken: token || '',
                  }))
                }
                onExpired={() => setFormData((prev) => ({ ...prev, captchaToken: '' }))}
              />
            </div>

            {errors.captcha && <p className="text-sm text-red-500 text-center">{errors.captcha}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 btn-primary ${loading ? 'btn-loading' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Divider */}
            {/* <div className="flex items-center justify-center mt-6">
              <span className="border-t w-1/4 border-gray-300"></span>
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <span className="border-t w-1/4 border-gray-300"></span>
            </div> */}

            {/* Google OAuth */}
            {/* <button
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
            </button> */}

            {/* Login Link */}
            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-green-600 font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
