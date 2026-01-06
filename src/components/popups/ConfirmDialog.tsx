import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Yes",
  cancelText = "No",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-md rounded-lg shadow-lg p-6 ${
          isDarkMode
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-900"
        }`}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <p
          className={`text-sm mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-lg border transition ${
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
