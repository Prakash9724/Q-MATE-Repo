import React, { useEffect, useRef, useState } from 'react';
import { FaCompass } from 'react-icons/fa';
import { CiGlobe } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ChevronDown, Compass, Menu, X, Search } from 'lucide-react';
import SearchBar from './SearchBar'; // Add this import
import { Link } from 'react-router-dom'; // Ensure you have this import

const dropdownStyles = `
  .dropdown-menu {
    transform-origin: top;
    transform: scaleY(0);
    opacity: 0;
    transition: transform 0.01s ease-in-out, opacity 0.01s ease-in-out;
  }
  .dropdown-menu.open {
    transform: scaleY(1);
    opacity: 1;
  }
  .dropdown-item {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  .dropdown-menu.open .dropdown-item:nth-child(1) {
    transition-delay: 0s;
  }
  .dropdown-menu.open .dropdown-item:nth-child(2) {
    transition-delay: 0.2s;
  }
  .dropdown-menu.open .dropdown-item:nth-child(3) {
    transition-delay: 0.4s;
  }
  .dropdown-menu.open .dropdown-item {
    opacity: 1;
    transform: translateY(0);
  }
`;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = document.documentElement.scrollHeight * 0.05;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-gray-700 to-transparent sm:bg-transparent">
      <style>{dropdownStyles}</style>
      <div className="text-white text-2xl sm:text-3xl font-bold tracking-wider">
        <Link to="/">Heritage Hub</Link>
      </div>

      {/* Desktop Search Bar */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out hidden sm:block ${isScrolled ? 'bg-[#A6ACB5] opacity-100 translate-y-0' : 'bg-transparent opacity-0 -translate-y-full pointer-events-none'} rounded-full`}>
        <SearchBar onSearch={() => {}} />
      </div>

      {/* Mobile Icons Container */}
      <div className="flex items-center gap-4 sm:hidden">
        {/* Mobile Search Icon */}
        <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={scrollToTop} // Call scrollToTop on click
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        
        {/* Hamburger Menu */}
        <button onClick={toggleMenu} className="text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="hidden sm:flex items-center space-x-6">
        <Link to="/explore" className="text-white hover:text-gray-300 transition-colors">
          <Compass className="inline-block mr-2 h-5 w-5" />
          Explore
        </Link>
        <div 
          className="relative"
          onMouseEnter={() => setIsLanguageDropdownOpen(true)}
          onMouseLeave={() => setIsLanguageDropdownOpen(false)}
        >
          <button className="text-white hover:text-gray-300 transition-colors">
            {selectedLanguage}
            <ChevronDown className="inline-block ml-1 h-4 w-4" />
          </button>
          <div className={`dropdown-menu absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-1 ${isLanguageDropdownOpen ? 'open' : ''}`}>
            <button 
              className="dropdown-item block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageSelect("English")}
            >
              English
            </button>
            <button 
              className="dropdown-item block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageSelect("हिन्दी")}
            >
              हिन्दी
            </button>
            <button 
              className="dropdown-item block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageSelect("ગુજરાતી")}
            >
              ગુજરાતી
            </button>
          </div>
        </div>
        <button className="text-white hover:text-gray-300 transition-colors">
          Login
        </button>
        <select className="bg-transparent text-white hover:text-gray-300 transition-colors">
          <option value="" disabled selected hidden>Menu</option>
          <option value="recent" className="text-black">Recently Visited</option>
          <option value="help" className="text-black">Help & Support</option>
        </select>
      </div>

      <div 
        ref={menuRef}
        className={`fixed inset-y-0 right-0 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white p-6 transition-transform duration-300 ease-in-out sm:hidden z-50`}
      >
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
          <X className="h-6 w-6" />
        </button>
        <div className="mt-8 space-y-4">
          {/* Explore Button in Mobile Menu */}
          <Link to="/explore" onClick={toggleMenu} className="block w-full text-left py-2">
            <Compass className="inline-block mr-2 h-5 w-5" />
            Explore
          </Link>
          <select className="block w-full bg-transparent text-white py-2">
            <option value="" disabled selected hidden>Language</option>
            <option value="en" className="text-black">English</option>
            <option value="hi" className="text-black">हिन्दी</option>
            <option value="gu" className="text-black">ગુજરાતી</option>
          </select>
          <button className="block w-full text-left py-2">
            Login
          </button>
          <select className="block w-full bg-transparent text-white py-2">
            <option value="" disabled selected hidden>Menu</option>
            <option value="recent" className="text-black">Recently Visited</option>
            <option value="help" className="text-black">Help & Support</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
