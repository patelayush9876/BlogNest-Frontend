import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import clsx from 'clsx';
import * as BlogService from '../services/blog.service';
import { type PaginatedBlogs } from '../services/blog.service';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SidebarSkeleton from '../components/loaders/SidebarSkeleton';
import { ArticleCardSkeleton } from '../components/loaders/ArticleSkeleton';
import Pagination from '../components/Pagination';
import LeftSidebar from '../components/UserSidebar/LeftSidebar';
import RightSidebar from '../components/UserSidebar/RightSidebar';
import { useSearchParams } from 'react-router-dom';
const ContentLayout: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'forYou' | 'following' | 'trending'>('forYou');

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const tabs = [
    { id: 'forYou', label: 'For You' },
    { id: 'following', label: 'Following' },
    { id: 'trending', label: 'Trending' },
  ] as const;

  const indicatorPosition = {
    forYou: 'translate-x-[0%]',
    following: 'translate-x-[100%]',
    trending: 'translate-x-[200%]',
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        let res: PaginatedBlogs;
        if (activeTab === 'forYou') {
          res = await BlogService.getAllBlogs(
            currentPage,
            perPage,
            debouncedSearch,
            selectedCategory,
            selectedTag,
          );
        } else if (activeTab === 'following') {
          res = await BlogService.getFollowingBlogs(currentPage, perPage, debouncedSearch);
        } else {
          // trending
          res = await BlogService.getTrendingBlogs(currentPage, perPage, debouncedSearch);
        }

        // normalize tags, likes, comments same as before
        const blogsData = res.blogs.map((blog: any) => {
          let parsedTags: string[] = [];
          try {
            if (Array.isArray(blog.tags)) {
              parsedTags =
                blog.tags.length === 1 && blog.tags[0].startsWith('[')
                  ? JSON.parse(blog.tags[0])
                  : blog.tags;
            }
          } catch (err) {
            parsedTags = [];
            console.log('Error:', err);
          }

          return {
            ...blog,
            tags: parsedTags,
            likes: blog.likeCount || 0,
            comments: blog.commentCount || 0,
          };
        });

        setBlogs(blogsData);
        setTotalItems(res.total || 0);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [activeTab, currentPage, perPage, selectedCategory, selectedTag, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 400); // 400ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);
  const handleTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSelectedCategory('');
    setSelectedTag('');
  };

  return (
    <div
      className={clsx(
        'p-4 w-full md:p-8 h-screen overflow-auto transition-colors duration-300',
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900',
      )}
    >
      <div className="mx-auto max-w-auto h-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 h-full">
          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky space-y-6">
              {loading ? (
                <SidebarSkeleton />
              ) : (
                <LeftSidebar
                  onCategoryClick={(categoryId) => {
                    setSelectedCategory(categoryId);
                    setSelectedTag(''); // RESET TAG FILTER
                    setCurrentPage(1);
                    setActiveTab('forYou');
                  }}
                  onTagClick={(tag) => {
                    setSelectedTag(tag); // APPLY TAG FILTER
                    setSelectedCategory(''); // RESET CATEGORY FILTER
                    setCurrentPage(1);
                    setActiveTab('forYou'); // SHOW FILTERED BLOGS
                  }}
                />
              )}
            </div>
          </aside>

          {/* CENTER FEED */}
          <main className="lg:col-span-6 h-full overflow-y-auto hide-scrollbar">
            {/* Tabs */}
            <div className={`p-1 tab-container ${isDarkMode ? 'dark' : ''}`}>
              <div
                className={clsx(
                  'tab-indicator',
                  indicatorPosition[activeTab as keyof typeof indicatorPosition],
                )}
              />
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as any)}
                  className={clsx('tab-button', {
                    active: activeTab === tab.id,
                  })}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {searchQuery && (
              <p className="mb-4 mt-4 text-sm text-gray-500">
                Showing results for "<strong>{searchQuery}</strong>"
              </p>
            )}
            {/* Blog Feed */}
            <div className="mt-6 space-y-8 p-1.8">
              {loading ? (
                [...Array(4)].map((_, i) => <ArticleCardSkeleton key={i} isDarkMode={isDarkMode} />)
              ) : blogs.length ? (
                blogs.map((blog) => (
                  <ArticleCard
                    key={blog._id}
                    id={blog._id}
                    image={blog.attachment || ''}
                    user={blog.author?.name || 'Unknown'}
                    date={blog.createdAt}
                    readTime={blog.readTime || '5 min read'}
                    title={blog.title}
                    content={blog.content}
                    tags={blog.tags || []}
                    likes={blog.likes}
                    comments={blog.comments}
                    author={blog.author}
                    profile={blog.profile}
                    likedByCurrentUser={blog.likedByCurrentUser}
                    isFollowed={blog.isFollowed || (user && blog.author?._id === user._id)}
                    authorId={blog.author?._id}
                    saved={blog.isSaved || false}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No blogs found.</p>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              perPage={perPage}
              totalItems={totalItems}
              onPageChange={(p) => setCurrentPage(p)}
              onPerPageChange={(newPer) => {
                setPerPage(newPer);
                setCurrentPage(1);
              }}
            />
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky  space-y-6">
              {loading ? (
                <SidebarSkeleton />
              ) : (
                <RightSidebar
                  onTagClick={(tag) => {
                    setSelectedTag(tag);
                    setSelectedCategory('');
                    setCurrentPage(1);
                    setActiveTab('forYou');
                  }}
                />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
