// ArticlePost.tsx

import React from 'react';
import { Heart } from 'lucide-react';
import CommentSection from '../components/CommentSection';


// Mock Data for the Article
const mockArticle = {
  category: 'Node.js',
  subcategory: 'Backend',
  title: 'Building Scalable APIs with Node.js and Express',
  summary: 'Learn the best practices for creating robust, scalable REST APIs that can handle millions of requests.',
  author: 'John Doe',
  date: 'September 28, 2025',
  readTime: '10 min read',
  likes: 458,
  bookmarks: 3,
};

const ArticlePost: React.FC = () => {
  return (
    <div className="container px-4 py-8 mx-auto md:px-12 lg:max-w-4xl">
      
      {/* Article Header and Metadata */}
      <div className="mb-8 border-b border-gray-200">
        
        {/* Category Tags */}
        <div className="flex space-x-2 text-sm font-medium text-gray-500 mb-2">
          <span className="text-indigo-600">{mockArticle.category}</span>
          <span>&middot;</span>
          <span>{mockArticle.subcategory}</span>
          <span>&middot;</span>
          <span className="text-gray-900">API</span>
        </div>
        
        {/* Title and Summary */}
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-3">
          {mockArticle.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{mockArticle.summary}</p>

        {/* Author and Actions Row */}
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center space-x-3 text-sm">
            {/* Author Avatar */}
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">{mockArticle.author}</span>
              <span className="text-gray-500">
                {mockArticle.date} &middot; {mockArticle.readTime}
              </span>
            </div>
          </div>

          {/* Likes/Actions */}
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition duration-150" />
              <span>{mockArticle.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* Assuming the third icon in the image is a bookmark or save */}
              <svg className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>{mockArticle.bookmarks}</span>
            </div>
            {/* Share Icon */}
            <svg className="w-5 h-5 cursor-pointer hover:text-gray-900 transition duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.368-2.684 3 3 0 00-5.368 2.684z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Main Content (Placeholder) */}
      <div className="prose max-w-none mb-10 text-gray-700">
        <p>Building a scalable API is about more than just setting up routes. It requires careful planning, proper architecture, and adherence to best practices.</p>
        <p className="mt-6 font-semibold text-gray-800">
          ... This is where the rest of the main article content would go ...
        </p>
      </div>

      {/* Comment Section */}
      <CommentSection />
    </div>
  );
};

export default ArticlePost;