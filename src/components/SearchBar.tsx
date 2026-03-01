import { Input } from "./ui/input";
import { Button } from "./ui/Button";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  isSearching?: boolean;
}

export default function SearchBar({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isSearching = false
}: SearchBarProps) {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <Input
        className="search-input"
        value={searchTerm}
        placeholder="Search links..."
        onChange={onSearchTermChange}
        onKeyDown={handleKeyDown}
      />

<Button
  className={`search-button ${isSearching ? "loading" : ""}`}
  onClick={onSearch}
>
  {isSearching ? "" : "Search"}
</Button>
    </div>
  );
}