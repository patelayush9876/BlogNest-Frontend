export const ArticleCardSkeleton = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const bg = isDarkMode ? "bg-gray-700/40" : "bg-gray-200/60";

  return (
    <div
      className={`pb-8 border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } animate-pulse`}
    >
      {/* Image skeleton */}
      <div className="mb-4 h-60 w-full rounded-xl overflow-hidden">
        <div className={`w-full h-full ${bg}`} />
      </div>

      {/* Author row */}
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 rounded-full ${bg}`} />

        <div className="flex flex-col space-y-2">
          <div className={`h-3 w-24 rounded ${bg}`} />
          <div className={`h-3 w-16 rounded ${bg}`} />
        </div>
      </div>

      {/* Title */}
      <div className={`h-5 w-2/3 rounded mb-4 ${bg}`} />
      <div className={`h-5 w-1/2 rounded mb-4 ${bg}`} />

      {/* Content lines */}
      <div className="space-y-2 mb-6">
        <div className={`h-3 w-full rounded ${bg}`} />
        <div className={`h-3 w-5/6 rounded ${bg}`} />
        <div className={`h-3 w-4/6 rounded ${bg}`} />
      </div>

      {/* Tags row */}
      <div className="flex space-x-2 mb-4">
        <div className={`h-6 w-16 rounded-full ${bg}`} />
        <div className={`h-6 w-14 rounded-full ${bg}`} />
        <div className={`h-6 w-20 rounded-full ${bg}`} />
      </div>

      {/* Icons row */}
      <div className="flex space-x-6">
        <div className={`h-5 w-5 rounded ${bg}`} />
        <div className={`h-5 w-5 rounded ${bg}`} />
        <div className={`h-5 w-5 rounded ${bg}`} />
      </div>
    </div>
  );
};
