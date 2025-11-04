import React, { useEffect, useState } from "react";
import { Heart, ArrowUp } from "lucide-react";
import {
  addComment,
  getComments,
  toggleLikeComment,
} from "../services/commentService";

interface CommentDTO {
  _id: string;
  userId: { name: string; username: string; profilePic?: string };
  text: string;
  likes: string[];
  replies: CommentDTO[];
  createdAt: string;
}

interface CommentSectionProps {
  blogId: string;
  onCountChange?: (count: number) => void;
}

const countAllComments = (comments: CommentDTO[]): number => {
  return comments.reduce(
    (acc, c) => acc + 1 + (c.replies ? countAllComments(c.replies) : 0),
    0
  );
};

const CommentItem: React.FC<{
  comment: CommentDTO;
  onReply: (text: string, parentId: string) => void;
  onLike: (id: string) => void;
}> = ({ comment, onReply, onLike }) => {
  const [liked, setLiked] = useState(comment.likes.length > 0);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleLike = async () => {
    await onLike(comment._id);
    setLiked(!liked);
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    await onReply(replyText, comment._id);
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className="flex mt-6">
      <img
        src={`${comment.userId?.profilePic}`}
        className="w-8 h-8 rounded-full"
        alt="ProfilePic"
      />
      <div className="ml-3 flex-1 pb-4">
        <div className="text-sm">
          <span className="font-semibold text-gray-900">
            @{comment.userId.name}
          </span>
          {/* <span className="text-gray-500 ml-1">{comment.userId.username}</span> */}
          <span className="text-gray-500 ml-2">
            &middot; {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="mt-1 text-gray-700">{comment.text}</p>

        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition duration-150 ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{comment.likes.length}</span>
          </button>

          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="hover:text-indigo-600 transition duration-150 font-medium"
          >
            Reply
          </button>
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="relative mt-3">
            <textarea
              rows={2}
              className="w-full p-2 h-12 pr-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-700"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              title="Post reply"
              onClick={handleReply}
              className="absolute right-2 bottom-3.5 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-200"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Nested Replies */}
        {comment.replies.length > 0 && (
          <div className="pl-4 border-l border-gray-200 mt-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                onLike={onLike}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({
  blogId,
  onCountChange,
}) => {
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(blogId);
      setComments(data.comments);
      if (onCountChange) onCountChange(countAllComments(data.comments));
    };

    fetchComments();
  }, [blogId, onCountChange]); // include dependencies

  const fetchComments = async () => {
    const data = await getComments(blogId);
    setComments(data.comments);
    if (onCountChange) onCountChange(countAllComments(data.comments));
  };

  const handlePostComment = async () => {
    if (!text.trim()) return;
    await addComment(blogId, text);
    setText("");
    fetchComments();
  };

  const handleReply = async (replyText: string, parentId: string) => {
    await addComment(blogId, replyText, parentId);
    fetchComments();
  };

  const handleLike = async (commentId: string) => {
    await toggleLikeComment(commentId);
    fetchComments();
  };

  return (
    <div className="mt-8">
      {/* New Comment Input */}
      <div className="relative mb-8">
        <textarea
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full h-13 p-3 pr-12 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Arrow-up button inside input */}
        <button
          title="Post comment"
          onClick={handlePostComment}
          className="absolute right-3 bottom-4 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-200"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onLike={handleLike}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
