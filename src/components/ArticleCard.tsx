import { Heart, MessageSquare } from "lucide-react";
import CommentSection from "./CommentSection";
import { toggleLike } from "../services/likeService";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ArticleCardProps {
  id: string;
  image: string;
  user: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
  author: any;
  profile?: any;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  image,
  date,
  readTime,
  title,
  excerpt,
  tags,
  likes,
  comments,
  author,
  profile,
}) => {
  const { isDarkMode } = useTheme();
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(comments);

  useEffect(() => {
    setLikeCount(likes);
    setCommentCount(comments);
  }, [likes, comments]);

  const handleLike = async () => {
    try {
      const data = await toggleLike(id);
      setLikeCount(data.likeCount);
      setLiked(data.liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <div
      className={`pb-8 border-b transition-colors duration-300 ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      {image && (
        <div className="relative mb-4 overflow-hidden rounded-xl h-96">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
      )}

      {/* Author */}
      <div
        className={`flex items-center space-x-2 text-sm mb-4 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            className="rounded-full"
            src={profile?.profilePic || ""}
            alt={author?.name || "author"}
          />
        </div>
        <span
          className={`font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {author?.name}
        </span>
        <span>&bull;</span>
        <span>{date}</span>
        <span>&bull;</span>
        <span>{readTime}</span>
      </div>

      <h2
        className={`mb-2 text-2xl font-bold cursor-pointer transition-colors duration-200 ${
          isDarkMode
            ? "text-gray-200 hover:text-indigo-400"
            : "text-gray-800 hover:text-indigo-600"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mb-4 line-clamp-2 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {excerpt}
      </p>

      {/* Tags & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center space-x-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-xs font-medium rounded-full transition duration-150 ${
                isDarkMode
                  ? "text-indigo-400 bg-indigo-900/30 hover:bg-indigo-800/40"
                  : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`flex items-center space-x-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {/* Like */}
          <div
            className={`flex items-center space-x-1 cursor-pointer transition ${
              liked
                ? "text-red-500"
                : isDarkMode
                ? "hover:text-red-400"
                : "hover:text-red-500"
            }`}
            onClick={handleLike}
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm">{likeCount}</span>
          </div>

          {/* Comments */}
          <div
            className="flex items-center space-x-1 cursor-pointer transition hover:text-indigo-500"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare
              className={`w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6">
          <CommentSection blogId={id} onCountChange={setCommentCount} />
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
