// UserProfile.tsx

import React, { useState } from 'react';
import { Mail, Edit2, Heart, MessageSquare, Bookmark } from 'lucide-react';

// Define data types
interface UserData {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  postCount: number;
  followers: number;
  following: number;
}

interface ArticleData {
  image: string;
  author: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
}

// Mock Data
const mockUser: UserData = {
  name: 'Sarah Johnson',
  username: '@sarahjohnson',
  bio: 'Tech enthusiast, writer, and coffee lover. Passionate about web development and design.',
  avatarUrl: 'https://i.pravatar.cc/150?img=4', // Placeholder avatar
  postCount: 45,
  followers: 2543,
  following: 320,
};

const mockArticle: ArticleData = {
  image: 'https://images.unsplash.com/photo-1627398242478-f471167905f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDg2Mjd8MHwxfHNlYXJjaHwxfHJSZWFjdCUyMENvZGV8ZW58MHx8fHwxNjk5NTI0NzI0fDA&ixlib=rb-4.0.3&q=80&w=1080',
  author: 'Sarah Johnson',
  date: 'Sep 28, 2025',
  readTime: '12 min read',
  title: 'The Art of Code: Principles Every Developer Should Know',
  excerpt: 'Writing clean, maintainable code is an art form. Here are the essential principles that will transform your coding practice.',
  tags: ['Programming', 'Best Practices', 'Clean Code'],
  likes: 629,
  comments: 57,
};

// --- Sub-Component for Content Card (Simplified from previous examples) ---
const ProfileArticleCard: React.FC<ArticleData> = ({
  image, author, date, readTime, title, excerpt, tags, likes, comments
}) => (
  <div className="pb-8 mb-8">
    {/* Article Image */}
    <div className="relative mb-4 overflow-hidden rounded-xl">
      <img src={image} alt={title} className="object-cover w-full h-auto max-h-[400px]" />
    </div>

    {/* Metadata */}
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Author Avatar Placeholder */}
      <span className="font-semibold text-gray-900">{author}</span>
      <span>&middot;</span>
      <span>{date}</span>
      <span>&middot;</span>
      <span>{readTime}</span>
    </div>

    {/* Title and Excerpt */}
    <h2 className="mb-2 text-xl font-bold leading-snug text-gray-900 cursor-pointer hover:text-indigo-600">
      {title}
    </h2>
    <p className="mb-4 text-gray-600 line-clamp-2">{excerpt}</p>

    {/* Tags and Actions */}
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center space-x-2">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-4 text-gray-500">
        <div className="flex items-center space-x-1">
          <Heart className="w-5 h-5 fill-current text-red-500" />
          <span className="text-sm">{likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm">{comments}</span>
        </div>
        <button className="p-1 hover:text-gray-900">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);
// --- End Sub-Component ---


const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('My Posts');

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 max-w-4xl">
      
      {/* 1. Profile Header */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
        
        {/* Avatar */}
        <img
          src={mockUser.avatarUrl}
          alt={mockUser.name}
          className="object-cover w-24 h-24 rounded-full flex-shrink-0"
        />
        
        {/* Details */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{mockUser.name}</h2>
          <p className="text-gray-500 mb-2">{mockUser.username}</p>
          <p className="text-gray-600 max-w-lg text-sm">{mockUser.bio}</p>
          
          {/* Stats */}
          <div className="flex space-x-4 text-sm mt-3 text-gray-700">
            <span><strong className="font-bold text-gray-900">{mockUser.postCount}</strong> Posts</span>
            <span><strong className="font-bold text-gray-900">{mockUser.followers}</strong> Followers</span>
            <span><strong className="font-bold text-gray-900">{mockUser.following}</strong> Following</span>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-4 flex space-x-3">
            <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition duration-150">
              <Edit2 className="w-4 h-4 mr-1" />
              Edit Profile
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-150">
              <Mail className="w-4 h-4 mr-1" />
              Follow
            </button>
            {/* If this were another user's profile, the button would be: 
            <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-150">
              <UserPlus className="w-4 h-4 mr-1" />
              Follow
            </button> 
            */}
          </div>
        </div>
      </div>

      {/* 2. Tabs Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-6 text-base font-medium">
          {['My Posts', 'Saved Blogs', 'Following', 'Followers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 pb-3 transition duration-150 
                ${activeTab === tab 
                  ? 'text-gray-900 border-b-2 border-black font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Content Feed (Based on active tab) */}
      <div>
        {/* Show content only for 'My Posts' tab for simplicity */}
        {activeTab === 'My Posts' && (
          <div className="space-y-8">
            <ProfileArticleCard {...mockArticle} />
            {/* Second article card visible in the image */}
            <ProfileArticleCard 
              {...mockArticle} 
              image="https://images.unsplash.com/photo-1542831371-29b0f74f9d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDg2Mjd8MHwxfHNlYXJjaHwyfHwweGQlMjBDb2RlfGVufDB8fHx8MTY5OTU3Mjc2MXww&ixlib=rb-4.0.3&q=80&w=1080"
              title="A Deep Dive into JavaScript Closures"
              likes={912}
              comments={105}
              date="Sep 15, 2025"
            />
            {/* Add more cards for a full feed */}
          </div>
        )}
        
        {/* Placeholder content for other tabs */}
        {activeTab !== 'My Posts' && (
          <div className="py-16 text-center text-gray-500">
            Content for **{activeTab}** goes here.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;