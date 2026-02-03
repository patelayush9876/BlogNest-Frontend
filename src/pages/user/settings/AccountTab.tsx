import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { Edit2, Eye, EyeOff, User } from "lucide-react";
import type { IUserProfile } from "../../../interfaces/userProfileInterface";
import {
  getMyProfile,
  updateMyProfile,
} from "../../../services/profile.service";
import ImageCropper from "../../../components/ common/ImageCropper";
import { changePassword, deleteAccount } from "../../../services/auth.service";
import { showToast } from "../../../services/toast.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import ConfirmDialog from "../../../components/popups/ConfirmDialog";

export const AccountTab: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePic: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data: IUserProfile = await getMyProfile();
        setFormData({
          name: data.user.name || "",
          username: data.username || "",
          email: data.user.email || "",
          bio: data.bio || "",
          profilePic: data.profilePic || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("All password fields are required", "warn");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("New password and confirm password do not match", "warn");
      return;
    }

    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "warn");
      return;
    }

    try {
      setPasswordLoading(true);

      await changePassword({
        oldPassword: currentPassword,
        newPassword,
      });
      setIsPasswordEditing(false);

      showToast("Password updated successfully", "success");

      // reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      showToast(
        err?.response?.data?.message || "Failed to update password",
        "error",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleDeleteAccount = async () => {
    if (deleteLoading) return;

    try {
      setDeleteLoading(true);

      await deleteAccount();

      showToast(
        "Account deletion requested. You have 14 days to recover it.",
        "success",
      );

      await logoutUser();
      navigate("/login");
    } catch (err: any) {
      showToast(
        err?.response?.data?.message || "Failed to delete account",
        "error",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setFormData((prev) => ({
      ...prev,
      profilePic: croppedImage,
    }));
    setShowCropper(false);
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setRawImage(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const profileData = new FormData();
      profileData.append("name", formData.name);
      profileData.append("username", formData.username);
      profileData.append("email", formData.email);
      profileData.append("bio", formData.bio);

      if (formData.profilePic.startsWith("data:image/")) {
        const blob = await fetch(formData.profilePic).then((r) => r.blob());
        profileData.append("profilePic", blob, "profile.png");
      }

      updateMyProfile(profileData);
      setIsProfileEditing(false);
      showToast("Profile updated successfully", "success");
    } catch (err: any) {
      showToast(
        err?.response?.data?.message || "Profile update failed:",
        "error",
      );
    }
  };

  if (loading) {
    return (
      <div
        className={`p-6 text-center rounded-lg ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showCropper && rawImage && (
        <ImageCropper
          image={rawImage}
          onCancel={handleCancelCrop}
          onCropComplete={handleCropComplete}
        />
      )}

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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-semibold">
            Profile Information
          </h3>

          <button
            type="button"
            onClick={() => {
              if (isProfileEditing) {
                setIsProfileEditing(false);
              } else {
                setIsProfileEditing(true);
              }
            }}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            {isProfileEditing ? "Cancel" : "Edit"}
          </button>
        </div>

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
                disabled={!isProfileEditing || !editable}
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
              disabled={!isProfileEditing}
              placeholder="Tell us something about yourself..."
              className={`w-full px-4 py-2 border rounded-lg mt-1 resize-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          {isProfileEditing && (
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          )}
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-semibold">Account Password</h3>

          <button
            type="button"
            onClick={() => {
              if (isPasswordEditing) {
                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setIsPasswordEditing(false);
              } else {
                setIsPasswordEditing(true);
              }
            }}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            {isPasswordEditing ? "Cancel" : "Update"}
          </button>
        </div>

        <p
          className={`text-sm mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Account should always use a strong password.
        </p>

        <form className="space-y-4" onSubmit={handlePasswordSubmit}>
          {[
            { label: "Current Password", id: "currentPassword" },
            { label: "New Password", id: "newPassword" },
            { label: "Confirm New Password", id: "confirmPassword" },
          ].map(({ label, id }) => {
            const fieldId = id as keyof typeof passwordData;

            return (
              <div key={id}>
                {isPasswordEditing && (
                  <div className="relative mt-1">
                    <label htmlFor={id} className="block text-sm font-medium">
                      {label}
                    </label>
                    <input
                      type={showPassword[fieldId] ? "text" : "password"}
                      id={id}
                      value={passwordData[fieldId]}
                      onChange={handlePasswordChange}
                      disabled={!isPasswordEditing}
                      className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                    />

                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => togglePasswordVisibility(fieldId)}
                      disabled={!isPasswordEditing}
                      className={`absolute inset-y-0 right-3 flex items-center ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {showPassword[fieldId] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {isPasswordEditing && (
            <button
              type="submit"
              disabled={passwordLoading}
              className={`w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white rounded-lg transition ${
                passwordLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          )}
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
            disabled={deleteLoading}
            onClick={() => setShowDeleteConfirm(true)}
            className={`px-5 py-2 text-sm font-semibold text-white rounded-lg transition ${
              deleteLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Account"
        message="Are you sure you want to delete your account?
Your account will be deactivated immediately and permanently deleted after 14 days.
You can recover it during this period."
        confirmText="Delete Account"
        cancelText="Cancel"
        loading={deleteLoading}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={async () => {
          setShowDeleteConfirm(false);
          await handleDeleteAccount();
        }}
      />
    </div>
  );
};
