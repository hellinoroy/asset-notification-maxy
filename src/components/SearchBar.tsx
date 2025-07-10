import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm }) => {
  return (
    <div className="relative w-full sm:w-1/2 lg:w-1/3">
      <input
        type="text"
        placeholder="Cari..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-purple-50 bg-opacity-30"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full w-5 text-gray-400" />
    </div>
  );
};

export default SearchBar;
