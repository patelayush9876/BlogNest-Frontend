import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyResetPasswordOtp } from '../../services/auth.service';
import { showToast } from '../../services/toast.service';

const OTP_LENGTH = 6;

const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as { email?: string })?.email;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  if (!email) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">No email found for verification.</p>
      </div>
    );
  }

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== OTP_LENGTH) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyResetPasswordOtp({
        email,
        otp: enteredOtp,
      });

      const resetToken = response.data.resetToken;

      showToast('OTP verified successfully', 'success');

      navigate('/create-password', {
        state: { resetToken },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md p-8 border rounded-xl shadow bg-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Images/BlogNest.png" alt="Logo" className="h-12" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">Check your email</h2>
        <p className="text-gray-600 text-center mt-2">We’ve sent a 6-digit verification code to</p>
        <p className="text-center font-semibold text-gray-800 mt-1">{email}</p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mt-6">
          {otp.map((digit, index) => (
            <input
              aria-label="OTP input"
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-black text-xl font-semibold border border-solid border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-500 text-center mt-3">{error}</p>}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full mt-6 py-3 btn-primary ${loading ? 'btn-loading' : ''}`}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {/* Footer */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-gray-500 hover:underline"
          >
            Change email address
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
