import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { resetPassword } from '../../services/auth.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { showToast } from '../../services/toast.service';

const CreateNewPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    const resetToken = (
      location.state as {
        resetToken?: string;
      }
    )?.resetToken;

    if (!resetToken) {
      showToast('Invalid or expired reset session. Please restart password reset.', 'error');
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        token: resetToken,
        newPassword,
      });

      if (response.status) {
        showToast('Password reset successfully. Please login again.', 'success');
        navigate('/login');
      } else {
        showToast(response.message, 'error');
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || 'Password reset failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = '/Images/createPass.png';

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Top Image Section */}
        <div
          className="h-43 bg-cover relative"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-200/50 to-green-400/70" />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="flex justify-center mb-2">
            <img src="/Images/logo-light.png" alt="Logo" className="h-20" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Create New Password</h2>

          <p className="text-gray-600 text-center mb-6">
            Set a new password to secure your account.
          </p>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  aria-label="confirm-new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  aria-label="confirm-new-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer btn-primary py-3 mt-6 font-bold text-white rounded-lg nsyrd transition duration-300 ease-in-out"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPasswordPage;
