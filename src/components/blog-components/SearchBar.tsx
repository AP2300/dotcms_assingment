// Search Bar Component
import { SearchBarProps } from "@/src/types";

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="max-w-2xl mx-auto" role="search">
      <div className="relative">
        <label htmlFor="blog-search" className="sr-only">
          Search blogs by title
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none" aria-hidden="true">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Search icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="blog-search"
          type="search"
          className="block w-full p-4 pl-12 text-base bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400/50 outline-none transition-all placeholder:text-gray-500"
          placeholder="Search blogs by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search blogs by title"
          aria-describedby="search-description"
          autoComplete="off"
        />
        <span id="search-description" className="sr-only">
          Type to filter blog posts by title. Clear button will appear when text is entered.
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
            aria-label="Clear search query"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;