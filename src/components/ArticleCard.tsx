import { Bookmark, Heart, MessageSquare } from "lucide-react";
import CommentSection from "./CommentSection";
import { toggleLike } from "../services/like.service";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { formatRelativeDate } from "../utils/dateUtils";
import { toggleSave } from "../services/savedBlog.service";

interface ArticleCardProps {
  id: string;
  image: string;
  user?: string;
  date: string;
  readTime?: string;
  title: string;
  content?: string;
  tags: string[];
  likes?: number;
  comments?: number;
  author: any;
  profile?: any;
  likedByCurrentUser?: boolean;
  saved?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  image,
  date,
  title,
  content = "",
  tags,
  likes = 0,
  comments = 0,
  author,
  profile,
  likedByCurrentUser = false,
  saved = false,
}) => {
  const { isDarkMode } = useTheme();
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByCurrentUser);
  const [commentCount, setCommentCount] = useState(comments);
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);

  const TRUNCATE_LENGTH = 130;

  useEffect(() => {
    setLikeCount(likes);
    setCommentCount(comments);
    setLiked(likedByCurrentUser);
  }, [likes, comments, likedByCurrentUser]);

  const handleLike = async () => {
    try {
      const data = await toggleLike(id);
      setLikeCount(data.likeCount);
      setLiked(data.liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleSave = async () => {
    try {
      const result = await toggleSave(id);
      setIsSaved(result.saved);
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  const safeContent = content || "";
  const isTruncated = safeContent.length > TRUNCATE_LENGTH;
  const displayedText = expanded
    ? safeContent
    : safeContent.slice(0, TRUNCATE_LENGTH).trimEnd();

  return (
    <div
      className={`pb-8 border-b transition-colors duration-300 ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      {/* Image */}
      {image && (
        <div className="relative mb-4 overflow-hidden rounded-xl h-96">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
      )}

      {/* Author Info */}
      <div
        className={`flex flex-row items-center justify-between pr-5 space-x-2 text-sm mb-4 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="flex flex-row justify-center items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              className="rounded-full"
              src={profile?.profilePic || ""}
              alt={author?.name || "author"}
            />
          </div>
          <span
            className={`ml-2 font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {author?.name}
          </span>
        </div>
        <div>
          {/* <span>&bull;</span> */}
          <span>{formatRelativeDate(date)}</span>
        </div>
      </div>
      {/* Title */}
      <h2
        className={`mb-2 text-2xl font-bold cursor-pointer transition-colors duration-200 ${
          isDarkMode
            ? "text-gray-200 hover:text-indigo-400"
            : "text-gray-800 hover:text-indigo-600"
        }`}
      >
        {title}
      </h2>

      {/* Content */}
      <div className="mb-4">
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {displayedText}
          {isTruncated && !expanded && (
            <span
              onClick={() => setExpanded(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setExpanded(true);
              }}
              className={`ml-1 cursor-pointer font-medium inline-block no-underline ${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              ... Read more
            </span>
          )}
          {expanded && isTruncated && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className={`ml-2 text-sm font-medium ${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Show less ▲
            </button>
          )}
        </p>
      </div>

      {/* Tags & Actions */}
      <div className="flex items-center justify-between">
        {/* Tags */}
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

        {/* Like / Comment */}
        <div
          className={`flex items-center space-x-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {/* Like */}
          <div
            className={`flex items-center space-x-1 cursor-pointer transition ${
              liked
                ? "text-red-500 fill-red-500"
                : isDarkMode
                ? "hover:text-red-400"
                : "hover:text-red-500"
            }`}
            onClick={handleLike}
          >
            <Heart
              className="w-5 h-5"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
            />
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

          {/* Saved */}
          <div
            className="flex items-center space-x-1 cursor-pointer transition"
            onClick={handleSave}
          >
            <Bookmark
              className={`w-5 h-5 ${
                isSaved
                  ? "text-indigo-500 fill-indigo-500"
                  : isDarkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
              fill={isSaved ? "currentColor" : "none"}
            />
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
