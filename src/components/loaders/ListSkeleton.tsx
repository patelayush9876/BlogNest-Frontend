export const ListSkeleton = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const bg = isDarkMode ? "bg-gray-700/40" : "bg-gray-200/60";

  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`flex items-center space-x-4 p-4 rounded-lg border ${
            isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
          }`}
        >
          {/* Avatar shimmer */}
          <div className={`w-10 h-10 rounded-full ${bg} animate-pulse`} />

          {/* Text shimmer */}
          <div className="flex flex-col space-y-2 w-full">
            <div className={`h-4 w-1/3 rounded ${bg} animate-pulse`} />
            <div className={`h-3 w-1/2 rounded ${bg} animate-pulse`} />
          </div>
        </div>
      ))}
    </div>
  );
};
