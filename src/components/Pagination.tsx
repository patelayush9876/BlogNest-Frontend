import clsx from 'clsx';
import { useTheme } from '../contexts/ThemeContext';

type PaginationProps = {
  currentPage: number;
  totalPages?: number;
  totalItems?: number;
  perPage?: number;
  pageRange?: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  showSummary?: boolean;
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  perPage = 10,
  pageRange = 5,
  onPageChange,
  onPerPageChange,
  showSummary = true,
}: PaginationProps) {
  const { isDarkMode } = useTheme();

  // derive total pages if needed
  let computedTotalPages = totalPages;
  if (!computedTotalPages && totalItems !== undefined) {
    computedTotalPages = Math.max(1, Math.ceil(totalItems / perPage));
  }
  computedTotalPages = computedTotalPages ?? 1;

  const pageCount = clamp(computedTotalPages, 1, Number.MAX_SAFE_INTEGER);
  const current = clamp(currentPage, 1, pageCount);

  // calculate pagination window
  const half = Math.floor(pageRange / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(pageCount, start + pageRange - 1);
  // adjust start if we don't have enough pages at the end
  start = Math.max(1, end - pageRange + 1);

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const go = (p: number) => {
    const next = clamp(p, 1, pageCount);
    if (next !== current) onPageChange(next);
  };

  // summary values
  const fromItem = totalItems === undefined ? undefined : (current - 1) * perPage + 1;
  const toItem = totalItems === undefined ? undefined : Math.min(current * perPage, totalItems);

  // per-page options (you can modify this array)
  const perPageOptions = [5, 10, 20, 50];

  return (
    <div
      className={clsx(
        'mt-8 flex items-center justify-between rounded-2xl border p-3',
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white',
      )}
      role="navigation"
      aria-label="Pagination"
    >
      {/* Left: summary */}
      <div className="text-sm min-w-[160px]">
        {showSummary ? (
          totalItems !== undefined ? (
            <div className={clsx(isDarkMode ? 'text-gray-300' : 'text-gray-600')}>
              <span>Showing</span>{' '}
              <span className="font-medium">
                {fromItem}-{toItem}
              </span>{' '}
              <span className={clsx(isDarkMode ? 'text-gray-400' : 'text-gray-500')}>of</span>{' '}
              <span className="font-medium">{totalItems}</span>
            </div>
          ) : (
            <div className={clsx(isDarkMode ? 'text-gray-300' : 'text-gray-600')}>
              <span>Page</span> <span className="font-medium">{current}</span>{' '}
              <span className={clsx(isDarkMode ? 'text-gray-400' : 'text-gray-500')}>of</span>{' '}
              <span className="font-medium">{pageCount}</span>
            </div>
          )
        ) : null}
      </div>

      {/* Center: page controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => go(current - 1)}
          disabled={current === 1}
          aria-label="Previous page"
          className={clsx(
            'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer',
            current === 1
              ? 'text-gray-400 opacity-60 cursor-not-allowed'
              : isDarkMode
                ? 'text-gray-200 hover:text-white'
                : 'text-gray-700 hover:text-gray-900',
          )}
        >
          Prev
        </button>

        <nav
          className="inline-flex -space-x-px rounded-md"
          role="navigation"
          aria-label="Page numbers"
        >
          {start > 1 && (
            <>
              <button
                onClick={() => go(1)}
                className={clsx(
                  'relative z-10 inline-flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  isDarkMode ? 'text-gray-300' : 'text-gray-600',
                )}
              >
                1
              </button>
              {start > 2 && (
                <span
                  className={clsx(
                    'inline-flex items-center px-2 text-sm',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400',
                  )}
                >
                  …
                </span>
              )}
            </>
          )}

          {pages.map((p) => {
            const isActive = p === current;
            return (
              <button
                key={p}
                onClick={() => go(p)}
                aria-current={isActive || undefined}
                className={clsx(
                  'relative z-10 inline-flex items-center px-3 py-2 text-sm font-medium focus:outline-none cursor-pointer',
                  isActive
                    ? clsx(
                        'rounded-md shadow-inner',
                        isDarkMode ? 'text-white' : 'bg-gray-100 text-gray-900',
                      )
                    : 'rounded-md hover:brightness-95',
                  isActive ? (isDarkMode ? 'bg-gray-700' : '') : '',
                )}
              >
                <span
                  className={clsx(
                    isActive
                      ? isDarkMode
                        ? 'text-white'
                        : 'text-gray-900'
                      : isDarkMode
                        ? 'text-gray-300'
                        : 'text-gray-600',
                  )}
                >
                  {p}
                </span>
              </button>
            );
          })}

          {end < pageCount && (
            <>
              {end < pageCount - 1 && (
                <span
                  className={clsx(
                    'inline-flex items-center px-2 text-sm',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400',
                  )}
                >
                  …
                </span>
              )}
              <button
                onClick={() => go(pageCount)}
                className={clsx(
                  'relative z-10 inline-flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  isDarkMode ? 'text-gray-300' : 'text-gray-600',
                )}
              >
                {pageCount}
              </button>
            </>
          )}
        </nav>

        <button
          onClick={() => go(current + 1)}
          disabled={current === pageCount}
          aria-label="Next page"
          className={clsx(
            'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer',
            current === pageCount
              ? 'text-gray-400 opacity-60 cursor-not-allowed'
              : isDarkMode
                ? 'text-gray-200 hover:text-white'
                : 'text-gray-700 hover:text-gray-900',
          )}
        >
          Next
        </button>
      </div>

      {/* Right: per-page control */}
      <div className="hidden sm:flex items-center gap-2 text-sm">
        <label className={clsx(isDarkMode ? 'text-gray-400' : 'text-gray-500')}>Per page</label>

        <select
          aria-label="Items per page"
          value={perPage}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (onPerPageChange) onPerPageChange(v);
          }}
          className={clsx(
            'rounded-lg border px-2 py-1 text-sm focus:outline-none cursor-pointer',
            isDarkMode
              ? 'border-gray-800 bg-gray-900 text-gray-300'
              : 'border-gray-200 bg-white text-gray-700',
          )}
        >
          {perPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
