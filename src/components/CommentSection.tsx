// CommentSection.tsx

import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  username: string;
  date: string;
  text: string;
  likes: number;
  replies: Comment[]; // Nested comments/replies
}

// Sub-component for a single comment/reply
const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => (
  <div className={`flex ${isReply ? 'mt-4' : 'mt-6'}`}>
    {/* Avatar */}
    <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
    
    <div className={`ml-3 flex-1 ${!isReply ? 'pb-4' : ''}`}>
      {/* Metadata */}
      <div className="text-sm">
        <span className="font-semibold text-gray-900">{comment.author}</span>
        <span className="text-gray-500 ml-1">@{comment.username}</span>
        <span className="text-gray-500 ml-2">&middot; {comment.date}</span>
      </div>
      
      {/* Comment Text */}
      <p className="mt-1 text-gray-700">{comment.text}</p>
      
      {/* Actions (Like, Reply) */}
      <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-red-500 transition duration-150">
          <Heart className="w-4 h-4" />
          <span>{comment.likes}</span>
        </button>
        <button className="hover:text-indigo-600 transition duration-150 font-medium">
          Reply
        </button>
      </div>

      {/* Nested Replies */}
      {comment.replies.length > 0 && (
        <div className="pl-4 border-l border-gray-200 mt-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// Mock Data for Comments
const mockComments: Comment[] = [
  {
    id: 1,
    author: 'Emily Dixon',
    username: 'codevolution',
    date: '1d ago',
    text: "This is an excellent overview of React 19! The compiler feature is particularly exciting. Can't wait to try it in production.",
    likes: 17,
    replies: [
      {
        id: 11,
        author: 'Sarah Johnson',
        username: 'sarahjsprojects',
        date: '1d ago',
        text: "I agree! The compiler really is a game changer. No more tooling in a ton projects and the performance improvements are undeniable.",
        likes: 9,
        replies: [
          {
            id: 111,
            author: 'John Doe',
            username: 'johndoe',
            date: '1d ago',
            text: "I agree! Have you noticed any edge cases where the compiler doesn't work as expected?",
            likes: 0,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: 'John Doe',
    username: 'johndoe',
    date: '1d ago',
    text: "Great article! One thing I'd add is the importance of the new 'use hook.' It's going to make data fetching so much cleaner.",
    likes: 45,
    replies: [],
  },
];

const CommentSection: React.FC = () => {
  return (
    <div className="mt-8">
      {/* Comment Count Link */}
      <a href="#" className="flex items-center space-x-1 text-base font-semibold text-gray-500 hover:text-indigo-600 mb-6">
        <MessageSquare className="w-5 h-5" />
        <span>Comments ({mockComments.length})</span>
      </a>

      {/* Comment Input Box */}
      <div className="mb-8">
        <textarea
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-700"
        ></textarea>
        <div className="flex justify-end mt-2">
          <button className="px-5 py-2 text-sm font-semibold text-white transition duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50" disabled>
            Post Comment
          </button>
        </div>
      </div>

      {/* Comment Feed */}
      <div className="space-y-4">
        {mockComments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;