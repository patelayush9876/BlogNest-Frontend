import React, { useState } from "react";
import { Upload, Eye, Save } from "lucide-react";
import { createBlog } from "../../services/blogService";
import { useTheme } from "../../contexts/ThemeContext";


const PostEditor: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Add tag
  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  // Enter key handler for tags
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Publish post
  const handlePublish = async () => {
    try {
      if (!title || !content) {
        alert("Title and content are required.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      tags.forEach((tag) => formData.append("tags", tag));

      if (selectedFile) {
        formData.append("attachment", selectedFile);
      } else if (coverImageUrl) {
        formData.append("coverImageUrl", coverImageUrl);
      }

      const blog = await createBlog(formData);

      setTitle("");
      setContent("");
      setTags([]);
      setCoverImageUrl("");
      setSelectedFile(null);

      alert(`Blog "${blog.title}" published successfully!`);
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish the blog. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen pt-8 pb-16 transition-colors duration-300
      ${isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header Bar */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium">Create New Post</h1>
        <div className="flex items-center space-x-3">
          <button
            className={`flex items-center space-x-1 transition duration-150
            ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">Preview</span>
          </button>

          <button
            className={`flex items-center space-x-1 transition duration-150
            ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Save className="w-5 h-5" />
            <span className="text-sm font-medium">Save Draft</span>
          </button>

          <button
            onClick={handlePublish}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition duration-150
            ${isDarkMode
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "text-white bg-black hover:bg-gray-800"
            }`}
          >
            Publish
          </button>
        </div>
      </div>

      {/* Editor Form */}
      <div
        className={`container mx-auto px-4 md:px-8 max-w-4xl p-6 rounded-lg shadow-md space-y-8 transition-colors duration-300
        ${isDarkMode ? "bg-gray-900 shadow-gray-800" : "bg-white shadow-gray-100"}`}
      >
        {/* 1. Cover Image Section */}
        <div>
          <label className="block text-lg font-semibold mb-3">Cover Image</label>

          <div
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition duration-150
            ${
              isDarkMode
                ? "border-gray-700 hover:border-indigo-500 bg-gray-800"
                : "border-gray-300 hover:border-indigo-500 bg-white"
            }`}
            onClick={() => document.getElementById("coverImageInput")?.click()}
          >
            <Upload
              className={`w-10 h-10 mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <p
              className={`mt-2 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Upload a cover image
              <br />
              <span
                className={isDarkMode ? "text-gray-500" : "text-gray-400"}
              >
                Click to browse or drag and drop
              </span>
            </p>

            {(coverImageUrl || selectedFile) && (
              <div className="mt-4 flex justify-center">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : coverImageUrl
                  }
                  alt="Cover Preview"
                  className="h-40 w-auto rounded-md shadow-md"
                />
              </div>
            )}

            <div className="mt-4">
              <input
                type="url"
                placeholder="Or paste image URL"
                className={`w-80 px-3 py-2 text-sm text-center border-b focus:outline-none focus:border-indigo-500 transition duration-150
                ${
                  isDarkMode
                    ? "bg-transparent border-gray-700 text-gray-200 placeholder-gray-500"
                    : "border-gray-300 text-gray-700 placeholder-gray-400"
                }`}
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <input
              id="coverImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  setCoverImageUrl("");
                }
              }}
            />
          </div>
        </div>

        {/* 2. Title Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">Title</label>
          <input
            id="post-title"
            type="text"
            placeholder="Enter your post title..."
            className={`w-full px-4 py-3 text-xl font-medium border-0 border-b focus:ring-0 focus:outline-none transition duration-150
            ${
              isDarkMode
                ? "bg-transparent border-gray-700 text-gray-100 placeholder-gray-500 focus:border-indigo-500"
                : "border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 3. Content Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">Content</label>
          <textarea
            id="post-content"
            placeholder="Write your story..."
            rows={15}
            className={`w-full px-4 py-3 text-base border-0 focus:ring-0 resize-none transition duration-150
            ${
              isDarkMode
                ? "bg-transparent text-gray-100 placeholder-gray-500"
                : "text-gray-900 placeholder-gray-400"
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 4. Tags Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">Tags</label>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add a tag..."
              className={`flex-1 px-4 py-3 text-base border-b focus:ring-0 focus:outline-none transition duration-150
              ${
                isDarkMode
                  ? "bg-transparent border-gray-700 text-gray-100 placeholder-gray-500 focus:border-indigo-500"
                  : "border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500"
              }`}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleAddTag}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition duration-150
              ${
                isDarkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Add
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`flex items-center px-3 py-1 text-sm font-medium rounded-full
                ${
                  isDarkMode
                    ? "bg-indigo-800 text-indigo-200"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className={`ml-2 font-bold ${
                    isDarkMode
                      ? "text-indigo-300 hover:text-indigo-100"
                      : "text-indigo-700 hover:text-indigo-900"
                  }`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
