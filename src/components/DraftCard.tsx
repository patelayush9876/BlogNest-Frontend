import { PenLine, UploadCloud } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { publishDraft } from '../services/blog.service';

interface DraftCardProps {
  id: string;
  title: string;
  image?: string | null;
  content?: string;
  updatedAt?: string;
  tags: string[];
}

const DraftCard: React.FC<DraftCardProps> = ({ id, title, image, content = '', tags }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const TRUNCATE = 130;
  const truncated = content.slice(0, TRUNCATE).trimEnd() + (content.length > TRUNCATE ? '...' : '');

  const handlePublish = async () => {
    try {
      await publishDraft(id);
      alert('Draft published successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Publish failed:', err);
    }
  };

  return (
    <div
      className={`pb-8 border-b transition-colors duration-300 relative group ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      {/* Hover Action Buttons */}
      <div className="absolute top-3 right-3 hidden group-hover:flex space-x-3 z-20">
        <button
          aria-label="edit"
          onClick={() => navigate(`/user/drafts/${id}/edit`)}
          className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow"
        >
          <PenLine size={16} />
        </button>

        <button
          aria-label="publish"
          onClick={handlePublish}
          className="px-3 py-1 rounded-md text-sm bg-green-600 text-white hover:bg-green-700 shadow"
        >
          <UploadCloud size={16} />
        </button>
      </div>

      {/* Image */}
      {image && (
        <div className="relative mb-4 overflow-hidden rounded-xl h-96">
          <img
            src={image}
            alt="draft"
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          />
        </div>
      )}

      {/* Draft Badge */}
      <span
        className={`px-3 py-1 text-xs rounded-full font-medium ${
          isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        Draft
      </span>

      {/* Title */}
      <h2
        className={`mt-3 mb-2 text-2xl font-bold cursor-pointer transition-colors duration-200 ${
          isDarkMode ? 'text-gray-200 hover:text-indigo-400' : 'text-gray-800 hover:text-indigo-600'
        }`}
      >
        {title || 'Untitled Draft'}
      </h2>

      {/* Content */}
      <div className="mb-4">
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{truncated}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center space-x-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className={`px-3 py-1 text-xs font-medium rounded-full transition duration-150 ${
              isDarkMode
                ? 'text-indigo-400 bg-indigo-900/30 hover:bg-indigo-800/40'
                : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DraftCard;
