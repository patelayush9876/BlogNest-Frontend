import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const CreateNewPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset attempt with new password:", newPassword);
    alert("Your password has been successfully reset!");
  };

  const backgroundImage = "/Images/createPass.png"; // A security-themed image

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left side: Background Image */}
      <div
        className="relative flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/40 to-green-300/60"></div>
      </div>

      {/* Right side: Create New Password Form */}
      <div className="flex-shrink-0 w-[400px] bg-white flex flex-col justify-center p-10 shadow-lg">
        <div className="flex items-center mb-8">
          <img src="/Images/logo.png" alt="Logo" className="mt-1 h-auto" />
        </div>
        <h2 className="text-4xl font-bold mb-2">Create New Password?</h2>
        <p className="text-gray-600 mb-8">
          Set your new password so you can login and access App.
        </p>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block font-bold text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block font-bold text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 font-bold text-white rounded-lg nsyrd transition duration-300 ease-in-out"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPasswordPage;
