import { Bookmark, Heart, MessageSquare } from "lucide-react";
import CommentSection from "./CommentSection";
import { toggleLike } from "../services/like.service";
import { followUser } from "../services/follow.service";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { formatRelativeDate } from "../utils/dateUtils";
import { toggleSave } from "../services/savedBlog.service";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Edit, Trash2, Archive } from "lucide-react";
import { archivePost, deleteBlog } from "../services/blog.service";

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
  isFollowed?: boolean;
  authorId?: string;
  isOwner?: boolean;
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
  isFollowed = false,
  authorId,
  isOwner = false,
}) => {
  const { isDarkMode } = useTheme();
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByCurrentUser);
  const [commentCount, setCommentCount] = useState(comments);
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);
  const [following, setFollowing] = useState(isFollowed);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const TRUNCATE_LENGTH = 130;

  useEffect(() => {
    setLikeCount(likes);
    setCommentCount(comments);
    setLiked(likedByCurrentUser);
  }, [likes, comments, likedByCurrentUser]);

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleFollow = async () => {
    try {
      await followUser(authorId!);
      setFollowing(true);
      setShowMenu(false);
    } catch (err) {
      console.error("Error following:", err);
    }
  };
  const handleArchive = async () => {
    try {
      await archivePost(id);
      setShowOptions(false);

      // window.location.reload();
    } catch (error) {
      console.error("Failed to archive blog:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone.",
      );
      if (!confirmed) return;

      await deleteBlog(id);
      setShowOptions(false);

      // Remove from UI
      // window.location.reload();
    } catch (error) {
      console.error("Failed to delete blog:", error);
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
        className={`flex flex-row items-center justify-between space-x-2 text-sm mb-4 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="flex flex-row justify-center items-center relative">
          {/* Profile Image Trigger */}
          <div
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            onClick={() => {
              navigate(`/user/userProfile/${authorId}`);
            }}
          >
            <img
              className="rounded-full"
              src={profile?.profilePic || ""}
              alt={author?.name || "author"}
            />
          </div>

          {/* Mini Popup Menu */}
          {/* {showMenu && (
            <div
              ref={menuRef}
              className={`absolute top-10 left-0 w-40 rounded-lg shadow-lg p-2 z-50 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              <button
                className={`w-full text-left py-1 px-2 rounded `}
                onClick={() => {
                  navigate(`/user/userProfile/${authorId}`);
                }}
              >
                View Profile
              </button>

              {!following && authorId !== user?._id && (
                <button
                  className={`w-full text-left py-1 px-2 text-indigo-600 rounded ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                  onClick={handleFollow}
                >
                  Follow
                </button>
              )}
            </div>
          )} */}

          <span
            className={`ml-2 font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {author?.name}
          </span>

          {/* Inline Follow Button */}
          {!following && authorId !== user?._id && (
            <button
              onClick={handleFollow}
              className={`ml-3 px-3 py-1 text-xs font-medium rounded-full border border-indigo-500 text-indigo-500 ${
                isDarkMode ? "hover:bg-indigo-900/30" : "hover:bg-indigo-50"
              }`}
            >
              Follow
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span>{formatRelativeDate(date)}</span>

          {isOwner && (
            <div className="relative" ref={optionsRef}>
              <button
                aria-label="post options"
                onClick={() => setShowOptions(!showOptions)}
                className={`p-1 rounded-full transition ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showOptions && (
                <div
                  className={`absolute right-0 mt-2 w-36 rounded-lg shadow-lg z-50 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm ${
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      navigate(`/user/blogs/${id}/edit`);
                      setShowOptions(false);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>

                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm ${
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                    onClick={handleArchive}
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </button>

                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm text-red-500 ${
                      isDarkMode ? "hover:bg-red-900/30" : "hover:bg-red-50"
                    }`}
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
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

      {showComments && (
        <div className="mt-6">
          <CommentSection blogId={id} onCountChange={setCommentCount} />
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
