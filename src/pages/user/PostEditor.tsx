import React, { useState, useEffect } from 'react';
import { Upload, Eye, Save } from 'lucide-react';
import {
  createBlog,
  createDraft,
  updateBlog,
  updateDraft,
  getBlogById,
} from '../../services/blog.service';
import { useTheme } from '../../contexts/ThemeContext';
import { getAllCategories, type BlogCategory } from '../../services/blogCategory.service';
import { showToast } from '../../services/toast.service';
import { useNavigate, useParams } from 'react-router-dom';

const PostEditor: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [imageChanged, setImageChanged] = useState(false);

  // Load Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Load blog/draft in edit mode
  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchExistingPost = async () => {
      try {
        const blog = await getBlogById(id);

        setTitle(blog.title || '');
        setContent(blog.content || '');
        setTags(blog.tags || []);
        setSelectedCategory(blog.category?._id || '');
        setCoverImageUrl(blog.attachment || '');
      } catch (err) {
        console.error('Failed to load post:', err);
      }
    };

    fetchExistingPost();
  }, [isEdit, id]);

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // ---------------- SAVE DRAFT ----------------
  const handleSaveAsDraft = async () => {
    try {
      if (!title || !content) {
        showToast('Both Title and content are required', 'error');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedCategory) formData.append('category', selectedCategory);
      tags.forEach((tag) => formData.append('tags', tag));

      if (selectedFile) formData.append('attachment', selectedFile);
      else if (coverImageUrl) formData.append('attachment', coverImageUrl);

      let blog;

      if (isEdit) blog = await updateDraft(id!, formData);
      else blog = await createDraft(formData);

      showToast(`Draft "${blog.title}" saved successfully!`, 'success');
      navigate('/user/profile');
    } catch (error) {
      console.error('Error saving draft:', error);
      showToast('Failed to save draft. Please try again.', 'error');
    }
  };

  // ---------------- PUBLISH ----------------
  const handlePublish = async () => {
    try {
      if (!title || !content) {
        showToast('Title and content are required.', 'error');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedCategory) formData.append('category', selectedCategory);
      tags.forEach((tag) => formData.append('tags', tag));

      // ADD THIS BLOCK
      if (selectedFile) {
        formData.append('attachment', selectedFile);
      } else if (!isEdit && coverImageUrl) {
        // create mode
        formData.append('coverImageUrl', coverImageUrl);
      } else if (isEdit && imageChanged && coverImageUrl) {
        // edit mode image replacement
        formData.append('attachment', coverImageUrl);
      }

      let blog;
      if (isEdit) blog = await updateBlog(id!, formData);
      else blog = await createBlog(formData);

      showToast(
        `Blog "${blog.title}" ${isEdit ? 'updated' : 'published'} successfully!`,
        'success',
      );

      navigate('/user/profile');
    } catch (error) {
      console.error('Error publishing blog:', error);
      showToast('Failed to publish blog. Please try again.', 'error');
    }
  };

  return (
    <div
      className={`min-h-screen pt-6 pb-14 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100 ' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-lg sm:text-xl font-medium text-center sm:text-left">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h1>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          {/* Preview (Not implemented yet) */}
          <button
            type="button"
            title="Preview post"
            aria-label="Preview post"
            className={`flex cursor-pointer items-center space-x-1 text-sm px-3 py-2 rounded-md transition ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>

          {/* Save Draft */}
          <button
            type="button"
            title="Save draft"
            aria-label="Save draft"
            onClick={handleSaveAsDraft}
            className={`flex cursor-pointer items-center space-x-1 text-sm px-3 py-2 rounded-md transition ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Save className="w-5 h-5" />
            <span>Save Draft</span>
          </button>

          {/* Publish */}
          <button
            type="button"
            title="Publish blog"
            aria-label="Publish blog"
            onClick={handlePublish}
            className={`px-4 sm:px-5 py-2 text-sm font-semibold rounded-lg transition ${
              isDarkMode
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Publish
          </button>
        </div>
      </div>

      {/* FORM */}
      <div
        className={`container mx-auto px-4 md:px-8 max-w-4xl p-4 sm:p-6 rounded-lg shadow-md space-y-8 transition-colors ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Category Dropdown */}
        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2">Category</label>
          <select
            aria-label="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full px-3 py-2 sm:py-3 border-b focus:outline-none ${
              isDarkMode
                ? 'bg-transparent border-gray-700 text-gray-100'
                : 'border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
                className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-base sm:text-lg font-semibold mb-3">Cover Image</label>

          <div
            className={`border-2 border-dashed rounded-lg p-6 sm:p-10 text-center cursor-pointer ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
            }`}
            onClick={() => document.getElementById('coverImageInput')?.click()}
          >
            <Upload className="w-10 h-10 mx-auto text-gray-400" />

            {(coverImageUrl || selectedFile) && (
              <div className="mt-4 flex justify-center">
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : coverImageUrl}
                  alt="Cover Preview"
                  className="h-40 w-auto rounded-md object-cover"
                />
              </div>
            )}

            <input
              aria-label="coverInput"
              id="coverImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  setCoverImageUrl('');
                  setImageChanged(true);
                }
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter your post title..."
            className={`w-full px-3 py-3 text-xl border-b focus:outline-none ${
              isDarkMode
                ? 'bg-transparent text-gray-100 border-gray-700'
                : 'bg-transparent text-gray-900 border-gray-300'
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2">Content</label>
          <textarea
            placeholder="Write your story..."
            rows={10}
            className={`w-full px-3 py-3 border rounded-lg resize-none focus:outline-none ${
              isDarkMode
                ? 'bg-transparent text-gray-100 border-gray-700'
                : 'bg-transparent text-gray-900 border-gray-300'
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2">Tags</label>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add a tag..."
              className={`flex-1 px-3 py-2 border-b focus:outline-none ${
                isDarkMode
                  ? 'bg-transparent border-gray-700 text-gray-100'
                  : 'bg-transparent border-gray-300'
              }`}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleAddTag}
              className={`px-5 py-2 rounded-lg font-semibold ${
                isDarkMode ? 'bg-indigo-600 text-white' : 'bg-black text-white'
              }`}
            >
              Add
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full font-medium text-sm ${
                  isDarkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {tag}
                <button
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="ml-2 font-bold"
                >
                  ×
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
