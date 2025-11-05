import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useRef } from "react";
import { Edit2, User } from "lucide-react";

export const AccountTab: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePic: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile:", formData);
  };

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div
        className={`p-4 sm:p-6 rounded-lg shadow-sm border transition-colors duration-300 flex flex-col items-center justify-center ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-100 text-gray-900"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Profile Picture
        </h3>

        <div className="relative group">
          {formData.profilePic ? (
            <img
              src={formData.profilePic}
              alt="Profile"
              className={`w-32 h-32 object-cover rounded-full border ${
                isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
            />
          ) : (
            <div
              className={`w-32 h-32 flex items-center justify-center rounded-full border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-700/30 text-gray-400"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              <User className="h-16 w-16" />
            </div>
          )}

          {/* Small edit icon overlay (bottom-right corner on hover) */}
          <button
            aria-label="edit"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-md transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <input
            aria-label="select"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Profile Info */}
      <div
        className={`p-4 sm:p-6 rounded-lg shadow-sm border transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-100 text-gray-900"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Profile Information
        </h3>
        <p
          className={`text-sm mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Update your personal details and profile information.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            {
              label: "Full Name",
              type: "text",
              id: "name",
              editable: true,
              placeholder: "Enter your full name",
            },
            {
              label: "Username",
              type: "text",
              id: "username",
              editable: true,
              placeholder: "Choose a unique username",
            },
            {
              label: "Email",
              type: "email",
              id: "email",
              editable: false,
              placeholder: "Your registered email address",
            },
          ].map(({ label, type, id, editable, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium">
                {label}
              </label>
              <input
                type={type}
                id={id}
                value={formData[id as keyof typeof formData]}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={!editable}
                className={`w-full px-4 py-2 border rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                } ${!editable ? "opacity-70 cursor-not-allowed" : ""}`}
              />
            </div>
          ))}

          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us something about yourself..."
              className={`w-full px-4 py-2 border rounded-lg mt-1 resize-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div
        className={`p-4 sm:p-6 rounded-lg shadow-sm border transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-100 text-gray-900"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Change Password
        </h3>
        <p
          className={`text-sm mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Ensure your account uses a strong password.
        </p>

        <form className="space-y-4">
          {["Current Password", "New Password", "Confirm New Password"].map(
            (label, i) => (
              <div key={i}>
                <label
                  htmlFor={label.toLowerCase().replace(/ /g, "-")}
                  className="block text-sm font-medium"
                >
                  {label}
                </label>
                <input
                  type="password"
                  id={label.toLowerCase().replace(/ /g, "-")}
                  className={`w-full px-4 py-2 border rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            )
          )}
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div
        className={`p-4 sm:p-6 rounded-lg border-1 transition-colors duration-300 ${
          isDarkMode
            ? "border-red-700 bg-red-900/10 text-red-300"
            : "border-red-300 bg-red-50 text-red-700"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Danger Zone</h3>
        <p
          className={`text-sm mb-4 ${
            isDarkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          Irreversible actions
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-base font-medium">Delete Account</p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              Permanently delete your account and all data.
            </p>
          </div>
          <button
            type="button"
            className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
