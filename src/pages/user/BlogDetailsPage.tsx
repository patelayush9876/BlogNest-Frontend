import { Bookmark, Heart } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import CommentSection from '../../components/CommentSection';
import { useAuth } from '../../contexts/AuthContext';
import { getBlogById } from '../../services/blog.service';
import { followUser } from '../../services/follow.service';
import { toggleLike } from '../../services/like.service';
import { toggleSave } from '../../services/savedBlog.service';
import { formatRelativeDate } from '../../utils/dateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import BlogDetailsSkeleton from '../../components/loaders/skeletons/BlogDetailsSkeleton';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<any>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [animatePreview, setAnimatePreview] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      const data = await getBlogById(id);

      setBlog(data);
      setLikeCount(data.likeCount || 0);
      setLiked(data.likedByCurrentUser || false);
      setIsSaved(data.isSaved || false);
      setFollowing(data.isFollowed || false);
      setCommentCount(data.commentCount || 0);
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <BlogDetailsSkeleton isDarkMode={isDarkMode} />;

  const handleLike = async () => {
    const data = await toggleLike(blog._id);
    setLikeCount(data.likeCount);
    setLiked(data.liked);
  };

  const handleSave = async () => {
    const result = await toggleSave(blog._id);
    setIsSaved(result.saved);
  };

  const handleFollow = async () => {
    await followUser(blog.author._id);
    setFollowing(true);
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT PANEL */}
        <div className="lg:col-span-4 space-y-6">
          {blog.attachment && (
            <div
              className="overflow-hidden rounded-2xl aspect-[16/9] cursor-zoom-in"
              onMouseEnter={() => {
                setShowPreview(true);
                setTimeout(() => setAnimatePreview(true), 10);
              }}
            >
              <img src={blog.attachment} alt={blog.title} className="w-full h-full object-cover" />
              {showPreview && (
                <div
                  className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                    animatePreview ? 'opacity-100' : 'opacity-0'
                  }`}
                  onMouseLeave={() => {
                    setAnimatePreview(false);
                    setTimeout(() => setShowPreview(false), 300);
                  }}
                >
                  <div
                    className={`relative w-[80%] max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      animatePreview ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                  >
                    <img
                      src={blog.attachment}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Author */}
          <div
            className={`p-5 rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              {blog?.authorProfile?.profilePic ? (
                <img
                  alt="Image"
                  src={blog?.authorProfile?.profilePic}
                  className="w-12 h-12 rounded-full cursor-pointer"
                  onClick={() => navigate(`/user/userProfile/${blog.author._id}`)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className={`w-6 h-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                />
              )}
              <div>
                <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {blog.author.name}
                </p>
                <p className="text-sm text-gray-500">{formatRelativeDate(blog.createdAt)}</p>
              </div>
            </div>

            {!following && blog.author._id !== user?._id && (
              <button
                onClick={handleFollow}
                className="mt-4 px-4 py-2 text-sm border border-indigo-500 text-indigo-500 rounded-full"
              >
                Follow
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <div
              onClick={handleLike}
              className={`flex items-center space-x-2 cursor-pointer ${
                liked ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <Heart className="w-6 h-6" fill={liked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </div>

            <div onClick={handleSave} className="cursor-pointer">
              <Bookmark
                className={`w-6 h-6 ${
                  isSaved ? 'text-indigo-500 fill-indigo-500' : 'text-gray-500'
                }`}
                fill={isSaved ? 'currentColor' : 'none'}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className={`px-3 py-1 text-xs rounded-full ${
                  isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-8 space-y-6">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {blog.title}
          </h1>

          <div
            className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {blog.content}
          </div>

          {/* Comments */}
          <div className="pt-6 border-t">
            <CommentSection blogId={blog._id} onCountChange={setCommentCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
