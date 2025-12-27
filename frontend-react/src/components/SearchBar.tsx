import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: number;
  name: string;
  vanilla_name?: string;
  year: string;
  event_name?: string;
}

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const MAX_DROPDOWN_RESULTS = 4;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setResults([]);
        setTotalResults(0);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setTotalResults(data.length);
      setResults(data.slice(0, MAX_DROPDOWN_RESULTS));
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (itemId: number) => {
    navigate(`/items/${itemId}`);
    setSearchQuery("");
    setShowResults(false);
  };

  const handleShowMore = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowResults(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ITEM, ENCHANTEMENT..."
          className="w-full bg-[#3A3D44] text-white placeholder-gray-400 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F16736] uppercase text-sm font-semibold"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-[#3A3D44] rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50">
          {loading ? (
            <div className="p-4 text-center text-gray-400">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.id)}
                    className="w-full px-4 py-3 text-left hover:bg-[#43464E] transition-colors flex flex-col"
                  >
                    <div className="text-white font-semibold">
                      {result.name}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {result.vanilla_name && (
                        <span>{result.vanilla_name} • </span>
                      )}
                      {result.event_name && result.year && (
                        <span className="text-[#F16736]">
                          {result.event_name} {result.year}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Show More Button */}
              {totalResults > MAX_DROPDOWN_RESULTS && (
                <button
                  onClick={handleShowMore}
                  className="w-full px-4 py-3 text-center border-t border-gray-600 text-[#F16736] hover:bg-[#43464E] transition-colors font-semibold"
                >
                  Show more ({totalResults - MAX_DROPDOWN_RESULTS} more results)
                </button>
              )}
            </>
          ) : (
            <div className="p-4 text-center text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;