// PostEditor.tsx

import React, { useState } from 'react';
import { Upload, Eye, Save } from 'lucide-react';

const PostEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  // Function to handle adding a tag
  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  // Function to handle tag input on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents form submission
      handleAddTag();
    }
  };

  // Function to handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Dummy function for image upload button
  const handleImageUpload = () => {
    alert("Image upload/browse functionality triggered.");
    // In a real application, this would open a file dialog or handle drag/drop logic.
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      
      {/* Header Bar */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium text-gray-900">Create New Post</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition duration-150">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">Preview</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition duration-150">
            <Save className="w-5 h-5" />
            <span className="text-sm font-medium">Save Draft</span>
          </button>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150">
            Publish
          </button>
        </div>
      </div>

      {/* Editor Form */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl bg-white p-6 shadow-md rounded-lg space-y-8">
        
        {/* 1. Cover Image Section */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">Cover Image</label>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-indigo-500 transition duration-150"
            onClick={handleImageUpload} // Simulate click to upload
          >
            <Upload className="w-10 h-10 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Upload a cover image
              <br/>
              <span className="text-gray-500">Click to browse or drag and drop</span>
            </p>
            <div className="mt-4">
              <input
                type="url"
                placeholder="Or paste image URL"
                className="w-80 px-3 py-2 text-sm border-b border-gray-300 focus:border-indigo-500 focus:outline-none transition duration-150"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Prevent parent div click
              />
            </div>
          </div>
        </div>

        {/* 2. Title Section */}
        <div>
          <label htmlFor="post-title" className="block text-lg font-semibold text-gray-900 mb-2">Title</label>
          <input
            id="post-title"
            type="text"
            placeholder="Enter your post title..."
            className="w-full px-4 py-3 text-xl font-medium border-0 border-b border-gray-200 focus:border-indigo-500 focus:ring-0 focus:outline-none placeholder-gray-400 transition duration-150"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 3. Content Section (Textarea) */}
        <div>
          <label htmlFor="post-content" className="block text-lg font-semibold text-gray-900 mb-2">Content</label>
          <textarea
            id="post-content"
            placeholder="Write your story..."
            rows={15}
            className="w-full px-4 py-3 text-base border-0 focus:ring-0 focus:outline-none placeholder-gray-400 resize-none transition duration-150"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-2">Supports Markdown formatting</p>
        </div>
        
        {/* 4. Tags Section */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">Tags</label>
          
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add a tag..."
              className="flex-1 px-4 py-3 text-base border-b border-gray-200 focus:border-indigo-500 focus:ring-0 focus:outline-none placeholder-gray-400 transition duration-150"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleAddTag}
              className="px-5 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150"
            >
              Add
            </button>
          </div>

          {/* Display current tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-indigo-700 hover:text-indigo-900"
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