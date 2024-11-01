import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { exploreData } from "./Museums/ExploreData"; // ExploreData se data import karna
import SearchBar from "./SearchBar"; // SearchBar component ko import karna
import { Search } from "lucide-react"; // Ensure you have this import

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search query ka state
  const [isScrolled, setIsScrolled] = useState(false); // Scroll state

  const handleSearch = (query) => {
    setSearchQuery(query); // Search query ko update karna
  };

  const filteredMuseums = exploreData.filter((museum) =>
    museum.name.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Museums ko filter karna based on search query

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  // Updated scroll event listener with lower threshold
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white/5">
      {/* Navbar with search */}
      <Navbar isScrolled={isScrolled}>
        <div
          className={`
          transition-all duration-500 ease-in-out
          ${
            isScrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }
        `}
        >
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Mobile Search Icon */}
        <button
          onClick={scrollToTop} // Call scrollToTop on click
          className="sm:hidden text-white p-2 hover:bg-white/10 rounded-full"
        >
          <Search className="h-6 w-6" />
        </button>
      </Navbar>

      {/* Top fixed search bar with smoother transition */}
      <div
        className={`
        transition-all duration-300 ease-in-out 
        fixed left-1/2 transform -translate-x-1/2
        top-[70px] sm:top-[5vh] md:top-[8vh]
        w-full px-4 sm:px-0
        flex justify-center
        z-10
        ${
          isScrolled
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0 "
        }
      `}
      >
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main content - Updated top margin for mobile */}
      <div className="min-h-screen w-full flex justify-center px-4 py-5 sm:px-6 lg:px-8">
        <div
          className="bg-[#E5E7EB] flex flex-col pt-6 px-3 sm:px-6 gap-6 sm:gap-10 
                      rounded-md w-full sm:w-[90vw] lg:w-[80vw] 
                      mt-[120px] sm:mt-[18vh] lg:mt-[20vh]"
        >
          <div className="w-full py-4 sm:py-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
              Explore Museums
            </h1>
          </div>

          {/* Museum cards - Updated image size */}
          {filteredMuseums.map((museum) => (
            <div
              key={museum.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 
                        min-h-[300px] sm:min-h-[250px]
                        rounded-lg p-4 sm:p-6 
                        bg-white/50 backdrop-blur-sm
                        transition-all duration-300 hover:shadow-lg"
            >
              {/* Image Container - Updated size */}
              <div
                className="w-full sm:w-2/5 h-[200px] sm:h-[300px]
                   rounded-md overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={museum.images}
                  alt={museum.title}
                />
              </div>

              {/* Info Container - Updated width to match new image size */}
              <div className="w-full sm:w-3/5 flex flex-col gap-3 sm:gap-4 ">
                <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-black">
                  {museum.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-700">
                  {museum.description}
                </p>
                <div className="space-y-2">
                  <h2 className="text-sm sm:text-base text-gray-900 font-semibold">
                    <span className="font-semibold">Timing:</span>{" "}
                    {museum.openingHours}
                  </h2>
                  <h2 className="text-sm sm:text-base text-gray-900 font-semibold">
                    <span className="font-semibold">Location:</span>{" "}
                    {museum.address}
                  </h2>
                  <h2 className="text-sm sm:text-base text-gray-900 font-semibold">
                    <span className="font-semibold">TicketPrice:</span>{" "}
                    {museum.ticketPrice}
                  </h2>

                 <div className="">
                  <button class="button type1 ">
                    <span class="btn-txt">Explore</span>
                  </button>
                 </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
