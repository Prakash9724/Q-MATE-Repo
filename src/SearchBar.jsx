import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react'; // Make sure Mic is imported

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit} 
            className="flex items-center bg-[#A6ACB5] rounded-full p-2 
                      w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] 
                      shadow-lg transition-all duration-300"> 
            <input
                type="text"
                placeholder="Search Your Favorite Museum"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-white 
                          border-none focus:ring-0 focus:outline-none px-4 py-2
                          text-sm sm:text-base"
            />
            <button 
                type="button" 
                className="p-2 text-white hover:bg-white/10 rounded-full"
            >
                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button 
                type="submit" 
                className="p-2 text-white hover:bg-white/10 rounded-full"
                
            >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
        </form>
    );
};

export default SearchBar;
