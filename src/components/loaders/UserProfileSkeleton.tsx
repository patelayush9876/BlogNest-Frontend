export const UserProfileSkeleton = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const bg = isDarkMode ? 'bg-gray-700/40' : 'bg-gray-200/60';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-8 md:px-8 max-w-4xl animate-pulse">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <div className={`h-8 w-28 rounded ${bg}`} />
        </div>

        {/* Profile Header */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Pic */}
          <div className={`w-32 h-32 rounded-full ${bg}`} />

          {/* Profile Info */}
          <div className="flex-1 space-y-3">
            <div className={`h-5 w-40 rounded ${bg}`} />
            <div className={`h-4 w-32 rounded ${bg}`} />
            <div className={`h-4 w-56 rounded ${bg}`} />

            {/* Stats */}
            <div className="flex space-x-6 mt-4">
              <div className={`h-4 w-16 rounded ${bg}`} />
              <div className={`h-4 w-20 rounded ${bg}`} />
              <div className={`h-4 w-20 rounded ${bg}`} />
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 mt-4">
              <div className={`h-9 w-28 rounded-full ${bg}`} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`border-b pb-2 mb-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex space-x-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-5 w-24 rounded ${bg}`} />
            ))}
          </div>
        </div>

        {/* Content Placeholder (3 Article Skeletons) */}
        <div className="space-y-10">
          <div className={`h-72 w-full rounded-xl ${bg}`} />
          <div className={`h-72 w-full rounded-xl ${bg}`} />
          <div className={`h-72 w-full rounded-xl ${bg}`} />
        </div>
      </div>
    </div>
  );
};
