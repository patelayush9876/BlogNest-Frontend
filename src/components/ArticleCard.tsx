import React from "react";
import { Heart, MessageSquare, Bookmark } from "lucide-react";

interface ArticleCardProps {
  image: string;
  user: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  user,
  date,
  readTime,
  title,
  excerpt,
  tags,
  likes,
  comments,
}) => {
  return (
    <div className="pb-8 border-b border-gray-200">
      {/* Article Image / Video Preview */}
      <div className="relative mb-4 overflow-hidden rounded-xl h-96">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition duration-300 hover:scale-[1.03]"
        />
        {/* "Learn React" / "Preview" overlay section */}
        <div className="absolute inset-0 flex items-end justify-between p-6">
          <span className="px-3 py-1 text-sm font-medium text-white bg-gray-900 dark:bg-gray-300 rounded-full bg-opacity-60">
            Preview
          </span>
          <button className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition duration-200 dark:bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Learn React
          </button>
        </div>
      </div>

      {/* Author and Metadata */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full">
          {/* Placeholder for Author Avatar */}
        </div>
        <span className="font-semibold text-gray-900">{user}</span>
        <span>&bull;</span>
        <span>{date}</span>
        <span>&bull;</span>
        <span>{readTime}</span>
      </div>

      {/* Title and Excerpt */}
      <h2 className="mb-2 text-2xl font-bold leading-snug text-gray-900 cursor-pointer hover:text-indigo-600">
        {title}
      </h2>
      <p className="mb-4 text-gray-600 line-clamp-2">{excerpt}</p>

      {/* Tags and Actions */}
      <div className="flex items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap items-center space-x-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition duration-150"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions (Likes, Comments, Bookmark) */}
        <div className="flex items-center space-x-4 text-gray-500">
          <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer transition duration-150">
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition duration-150">
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm">{comments}</span>
          </div>
          <button
            className="p-1 hover:text-gray-900 transition duration-150"
            aria-label="Bookmark this article"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
