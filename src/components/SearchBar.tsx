interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isSearching?: boolean;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  isSearching
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search links..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className={`search-button ${isSearching ? "loading" : ""}`}
        onClick={onSearch}
        aria-label="Perform search"
      >
        {isSearching ? "" : "Search"}
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}
