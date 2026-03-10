const BlogDetailsSkeleton = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const bg = isDarkMode ? 'bg-gray-700/40' : 'bg-gray-200/60';

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT PANEL */}
        <div className="lg:col-span-4 space-y-6">

          {/* Image */}
          <div className={`w-full aspect-[16/9] rounded-2xl ${bg} animate-pulse`} />

          {/* Author Card */}
          <div
            className={`p-5 rounded-xl border ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full ${bg} animate-pulse`} />

              <div className="space-y-2">
                <div className={`w-28 h-4 rounded ${bg} animate-pulse`} />
                <div className={`w-20 h-3 rounded ${bg} animate-pulse`} />
              </div>
            </div>

            {/* Follow button */}
            <div className={`mt-4 w-24 h-8 rounded-full ${bg} animate-pulse`} />
          </div>

          {/* Actions */}
          <div className="flex space-x-6">
            <div className={`w-16 h-6 rounded ${bg} animate-pulse`} />
            <div className={`w-6 h-6 rounded ${bg} animate-pulse`} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <div className={`w-16 h-6 rounded-full ${bg} animate-pulse`} />
            <div className={`w-20 h-6 rounded-full ${bg} animate-pulse`} />
            <div className={`w-12 h-6 rounded-full ${bg} animate-pulse`} />
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-8 space-y-6">

          {/* Title */}
          <div className={`w-3/4 h-10 rounded ${bg} animate-pulse`} />

          {/* Content */}
          <div className="space-y-3">
            <div className={`w-full h-4 rounded ${bg} animate-pulse`} />
            <div className={`w-full h-4 rounded ${bg} animate-pulse`} />
            <div className={`w-5/6 h-4 rounded ${bg} animate-pulse`} />
            <div className={`w-4/6 h-4 rounded ${bg} animate-pulse`} />
          </div>

          {/* Comments */}
          <div className="pt-6 border-t space-y-4">
            <div className={`w-40 h-6 rounded ${bg} animate-pulse`} />
            <div className={`w-full h-12 rounded ${bg} animate-pulse`} />
            <div className={`w-full h-12 rounded ${bg} animate-pulse`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;