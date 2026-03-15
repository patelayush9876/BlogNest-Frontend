import React, { useState } from 'react';
import { forgotPassword } from '../../services/auth.service';
import { showToast } from '../../services/toast.service';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, _setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await forgotPassword({ email });
      showToast('OTP sent to your email', 'success');
      navigate('/verify-otp', { state: { email } });
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to send OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = '/Images/forgot-password.jpg';

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Top Image Section (Small Background) */}
        <div
          className="h-40 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-200/50 to-green-400/70" />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="flex justify-center mb-2">
            <img src="/Images/logo-light.png" alt="Logo" className="h-20" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>

          <p className="text-gray-600 text-center mb-6">
            Enter your registered email address and we’ll send you a verification code to reset your
            password.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-center">
              <p className="font-semibold mb-1">Check your email</p>
              <p className="text-sm">
                If an account exists for <strong>{email}</strong>, you’ll receive a password reset
                OTP shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer btn-primary py-3 mt-6 font-bold text-white rounded-lg nsyrd transition duration-300 ease-in-out"
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
