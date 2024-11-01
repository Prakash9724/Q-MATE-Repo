import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center bg-[#B4A1A1] rounded-full h-10 pl-4 shadow-lg">
            <input
                type="text"
                placeholder="Search Your Favorite Museum"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-white border-none focus:ring-0 focus:outline-none text-sm sm:text-base
                    w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px]"
            />
            <button
                type="button"
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
                <Mic className="h-4 w-4" />
            </button>
            <button
                type="submit"
                className="text-white p-2 pr-4 rounded-full hover:bg-white/10 transition-colors"
            >
                <Search className="h-4 w-4" />
            </button>
        </form>
    );
};

export default SearchBar;
