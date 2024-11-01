import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Search,
  Mic,
  ChevronLeft,
  ChevronRight,
  Globe,
  Compass,
  Heart,
  Info,
  MapPin,
  Clock,
  Star,
  ArrowLeft,
  ArrowRight,
  X,
  ChevronDown
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { museumData as museums } from "./Museums/museumData";
import Explore from "./Explore";
import AskQmate from './components/Askqmate';  // Import Ask-qmate component

const responsiveContainerClasses = "container mx-auto px-4 sm:px-6 lg:px-8";
const responsiveSectionClasses = "py-8 sm:py-12 lg:py-16";


const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;



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

const navbarStyles = `
  .search-bar {
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .search-bar.visible {
    transform: translateY(0);
    opacity: 1;
  }

`;





// Simple CustomButton component
const CustomButton = ({ children, className, ...props }) => (
  <button {...props} className={`px-4 py-2 bg-black text-white rounded hover:bg-black/80 ${className}`}>
    {children}
  </button>
);

// Simple Input component
const Input = ({ className, ...props }) => (
  <input {...props} className={`px-4 py-2 border rounded ${className}`} />
);

// Simple Select components
const Select = ({ children, className, ...props }) => (
  <select {...props} className={`px-4 py-2 border rounded ${className}`}>
    {children}
  </select>
);


const SelectContent = ({ children }) => <>{children}</>;

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const SelectTrigger = Select;

const SelectValue = ({ placeholder }) => <option value="">{placeholder}</option>;

const carouselImages = [
    {
        url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhykx3SGFwpZXjTrk_7Ee5EFj-N8HXv8zjP_pCyqJbQOgDRxNW_0qD3CHu5mOHvL0plteW9ruSXa4uVKj5xvhX_G-m4lFZHK4qgbqAzQ1X5KLf0AmS8_OGXpoaNYsIsZKiOBmxJ3DgN8v-xAtyPfJD-dJuY7MXfFuE-kPP5a-wUWb7HfFXa4cPxdx1uYpk/s2048/city%20palace.jpeg",
        title: "City Palace",
        subtitle: "Udaipur",
        description: "City Palace, Udaipur is a palace complex situated in the city of Udaipur in the Indian state of Rajasthan.",
        id: 1
    },
    {
        url: "https://www.travelescape.in/wp-content/uploads/2017/07/Jodhpur-1-www_mouthshut_com.jpg",
        title: "Mehrangarh Fort",
        subtitle: "Jodhpur, Rajasthan",
        description: "Mehrangarh Fort, one of the largest forts in India",
        id: 2
    },
    {
        url: "https://images.moneycontrol.com/static-mcnews/2023/04/pexels-ankur-bagai-6440428-770x433.jpg?impolicy=website&width=770&height=431",
        title: "Hawa Mahal",
        subtitle: "Jaipur, Rajasthan",
        description: "Hawa Mahal, or the 'Palace of Winds'.",
        id: 3
    }
];

const featuredMuseums = [
    {
        name: "Birla Industrial & Technological Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1BArikiCRVraIBQysUy6yXeAZwJMzs89B8bWYX7KQGygPP8HgeqhnNc9Q8vfhoVPBkZiODgvLzHqSclAbwMwDsVXCZdBJNlcDMKna3He0TRFYPji2MR9PGp1H76qT2LuzWU3qh5X1sHSCHLkPQSoSesOu_FucD_gRklRm4AoDczfFz0AOf_Dwz7vRs17r/s16000/Birla%20Industrial%20&%20Technological%20Museum.jpg",
        highlight: "Explore the wonders of science and technology.",
        tags: ["Science", "Technology"],
      },
      {
        name: "HAL Heritage Centre and Aerospace Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh345jF0Jk3k1zN1IvWfeXxuL3WLgGxdhAyVoz5pdhSvfjC-md_crD_tPiEf3od7mx_DekFocFLaGz9wjByc1bMFquF86cOw35vClsz8kQzDyvhuwLblLL1iRMg2LJv1ePA0zljnZ9vq-min9aPeZd2zxTtSwbNhge082JNlnLSOZml1VABW7yz3obwpahp/s16000/HAL%20Heritage%20Centre%20and%20Aerospace%20Museum%20in%20Bangalore.jpg",
        highlight: "India's first aerospace museum showcasing aircraft models.",
        tags: ["Science", "Technology", "Aviation"],
      },
      {
        name: "Indian Museum in Central Kolkata",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBfzfbgODtEqB4B0VbIqqV2R5_bZemRarvRwSvwkHai-KYB9gIZMhyv3YJl5NvKdnIYZwmGtcmeQrgDc_1-CtTqVZLlnsGBVuwmVGvHXmFJzUh_KKKYg-4ni0YfAZyQmBgfFgjCfRCFTPKvXfg-LXAsxBNvFK8owagg6QfRXU1M-YyF73L9fWX7QTy3DWl/s16000/Indian%20Museum%20in%20Central%20kolkata.jpg",
        highlight: "Oldest museum in India with diverse collections.",
        tags: ["History", "Art", "Archaeology"],
      },
      {
        name: "Madhya Pradesh Tribal Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgh9D84EklGwMCzQQf_4xqMFQTZwVdUD07HoO5hm1KiG4MVI7RU1HvGdWcgE2_TWjaoZUPSv6qOmV0K7dXcdOhb2gCZjXJQjn4L4quwkL4jEBBTELNmwq_oWHe9d0W17iprvIlYhdCKvbGgEmzuyG3JAF8EkQ3wp_9Y6voPnTgu70aLehB_1RTlN4jC2Lx5/s16000/Madhya%20Pradesh%20Tribal%20Museum.jpg",
        highlight: "A tribute to the indigenous tribes of Madhya Pradesh.",
        tags: ["Culture", "Anthropology"],
      },
      {
        name: "Salar Jung Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSDDGBnvF-P0grMLiZ3OwdJQuU_K4FggXMssVv1RhmBqNX38iI7B_fLge9544xHoPFWVMlWdvLTYHXmE8Obliz2-rzjuaULOz0wZXI9bVhjBj5WN-ofqk5NQynQpoUuLSiPzknT4sKFAsoZGKELp3SpjzlFdcvjJmNFkPHEOp3EB9nzVtIr2paBsBqvd7M/s16000/Salar%20Jung%20Museum%20in%20hyderabad,%20telangana.jpg",
        highlight: "Home to one of the largest art collections in the world.",
        tags: ["Art", "History"],
      },
      {
        name: "Sand Museum Mysuru",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggbhpDpkV1eH_DsrRxkNHU_4RNrughFXEicWTHHz9BslLXlivTgV7IO0qf9zYOJV5D_ty54cj4I-ntJHSY_F6lZYkEElHU95f7jtMNsCAD7G_wK9NJ6n8DzEOoeG-ot1s-iDWnXtOoikMkTbg1-FLgPe3PL3U7zt-RtsXMJeTEH8wsYsdbD1GA9-FhSUoI/s16000/Sand%20Museum%20Mysuru.jpg",
        highlight: "Unique museum showcasing intricate sand sculptures.",
        tags: ["Art", "Sculpture"],
      },
      {
        name: "Victoria Memorial",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1mCj-dShwGdIDbuEPd3WZlmg8SJ5I6OspHlm16QI351QBeMOD2vqUKJwHRHzpzrTZwaRsnr5YzDhyphenhyphenBD0lmneyXfQfxiKGCj15j83efSBF0JeXlMMZ2yIT6L5rQEcNholiLR-4bagGGwomYZjr1Ze-S684j1rRdf9EEbdOA-O_Mam9qf94y9w3uDcj3c1b/s16000/Victoria%20Memorial.jpg",
        highlight: "Stunning monument dedicated to Queen Victoria, featuring British colonial architecture.",
        tags: ["History", "Architecture"],
      },
      {
        name: "Vintage Car Collection at Fateh Vilas by Fateh Collection",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsT5g-c0YZ9hqp8NKp4Co0zqgwKsPyOxWnTsky_ipRFfZB1foHBgorCGGhyolQ3-9Q3XUumTh1noPlusJpiv5WJtunyM9I51R4L4n1kzrAk0PMdC2KNb_yKgEWzgXIpoNjwXOwEZ0bgOUSfV9uZK6tbB6gAOvkX181ULM-g2ZhCe_tk8vvQ0e14ebg5NMb/s16000/Vintage%20Car%20Collection%20at%20Fateh%20Vilas%20by%20Fateh%20Collection%20in%20Udaipur.jpg",
        highlight: "A rare collection of vintage cars from the royal family of Udaipur.",
        tags: ["Automotive", "History"],
      },
      {
        name: "Goa Chitra Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJ-BboghymKrl-Q3jpyUZbVNikoQexxEz0GJZ0HWlHILIlpgdp81fV2SLtjv9bUf5MsSF18vgNqoe6FSiuvc8WAu8Yg6dWbg5QlHRQVuNfbRGQ-KUiA5BRdywXp_EUuconsvjLsvyKUJ87beYHZlh4T4ifyQs6MvjqzQGTAD2YL32lM8RLpVHbpEPkK1w1/s16000/Goa%20Chitra%20Museum.jpg",
        highlight: "A blend of Goa's rich heritage and culture.",
        tags: ["History", "Culture"],
      },
];

const museumsNearYou = [
    {
        name: "Birla Industrial & Technological Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1BArikiCRVraIBQysUy6yXeAZwJMzs89B8bWYX7KQGygPP8HgeqhnNc9Q8vfhoVPBkZiODgvLzHqSclAbwMwDsVXCZdBJNlcDMKna3He0TRFYPji2MR9PGp1H76qT2LuzWU3qh5X1sHSCHLkPQSoSesOu_FucD_gRklRm4AoDczfFz0AOf_Dwz7vRs17r/s16000/Birla%20Industrial%20&%20Technological%20Museum.jpg",
        location: "Kolkata",
        openingHours: "10:00 AM - 5:30 PM",
        distance: "2.5 km",
        rating: 4.5,
        tags: ["Science", "Technology"],
      },
      {
        name: "HAL Heritage Centre and Aerospace Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh345jF0Jk3k1zN1IvWfeXxuL3WLgGxdhAyVoz5pdhSvfjC-md_crD_tPiEf3od7mx_DekFocFLaGz9wjByc1bMFquF86cOw35vClsz8kQzDyvhuwLblLL1iRMg2LJv1ePA0zljnZ9vq-min9aPeZd2zxTtSwbNhge082JNlnLSOZml1VABW7yz3obwpahp/s16000/HAL%20Heritage%20Centre%20and%20Aerospace%20Museum%20in%20Bangalore.jpg",
        location: "Bangalore",
        openingHours: "9:00 AM - 5:00 PM",
        distance: "3.2 km",
        rating: 4.6,
        tags: ["Science", "Technology", "Aviation"],
      },
      {
        name: "Indian Museum in Central Kolkata",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBfzfbgODtEqB4B0VbIqqV2R5_bZemRarvRwSvwkHai-KYB9gIZMhyv3YJl5NvKdnIYZwmGtcmeQrgDc_1-CtTqVZLlnsGBVuwmVGvHXmFJzUh_KKKYg-4ni0YfAZyQmBgfFgjCfRCFTPKvXfg-LXAsxBNvFK8owagg6QfRXU1M-YyF73L9fWX7QTy3DWl/s16000/Indian%20Museum%20in%20Central%20kolkata.jpg",
        location: "Kolkata",
        openingHours: "10:00 AM - 5:00 PM",
        distance: "1.8 km",
        rating: 4.4,
        tags: ["History", "Art", "Archaeology"],
      },
      {
        name: "Madhya Pradesh Tribal Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgh9D84EklGwMCzQQf_4xqMFQTZwVdUD07HoO5hm1KiG4MVI7RU1HvGdWcgE2_TWjaoZUPSv6qOmV0K7dXcdOhb2gCZjXJQjn4L4quwkL4jEBBTELNmwq_oWHe9d0W17iprvIlYhdCKvbGgEmzuyG3JAF8EkQ3wp_9Y6voPnTgu70aLehB_1RTlN4jC2Lx5/s16000/Madhya%20Pradesh%20Tribal%20Museum.jpg",
        location: "Bhopal",
        openingHours: "12:00 PM - 8:00 PM",
        distance: "4.1 km",
        rating: 4.8,
        tags: ["Culture", "Anthropology"],
      },
      {
        name: "Goa Chitra Museum",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJ-BboghymKrl-Q3jpyUZbVNikoQexxEz0GJZ0HWlHILIlpgdp81fV2SLtjv9bUf5MsSF18vgNqoe6FSiuvc8WAu8Yg6dWbg5QlHRQVuNfbRGQ-KUiA5BRdywXp_EUuconsvjLsvyKUJ87beYHZlh4T4ifyQs6MvjqzQGTAD2YL32lM8RLpVHbpEPkK1w1/s16000/Goa%20Chitra%20Museum.jpg",
        location: "Goa",
        openingHours: "9:00 AM - 6:00 PM",
        distance: "5.7 km",
        rating: 4.7,
        tags: ["History", "Culture"],
      },
];

// Helper function to create dates
const createDate = (year, month, day) => new Date(year, month - 1, day);

const upcomingEvents = [
    {
        title: "Art Workshop for Kids",
        museum: "Birla Industrial & Technological Museum",
        events: [
          { date: createDate(2024, 9, 15), name: "Painting Workshop" },
          { date: createDate(2024, 9, 22), name: "Sculpture Class" },
          { date: createDate(2024, 10, 5), name: "Drawing Basics" },
          { date: createDate(2024, 10, 19), name: "Mixed Media Art" },
          { date: createDate(2024, 11, 3), name: "Digital Art Introduction" },
          { date: createDate(2024, 11, 17), name: "Art History for Kids" },
        ]
      },
      {
        title: "Curator's Talk: Modern Art",
        museum: "National Gallery of Modern Art",
        events: [
          { date: createDate(2024, 9, 10), name: "Impressionism Overview" },
          { date: createDate(2024, 9, 24), name: "Cubism and Its Influence" },
          { date: createDate(2024, 10, 8), name: "Abstract Expressionism" },
          { date: createDate(2024, 10, 22), name: "Pop Art Movement" },
          { date: createDate(2024, 11, 5), name: "Contemporary Art Trends" },
          { date: createDate(2024, 11, 19), name: "Digital Art in Museums" },
        ]
      },
      {
        title: "Night at the Museum",
        museum: "Indian Museum in Central Kolkata",
        events: [
          { date: createDate(2024, 9, 18), name: "Nocturnal Wildlife Tour" },
          { date: createDate(2024, 10, 2), name: "Stargazing and Astronomy" },
          { date: createDate(2024, 10, 16), name: "Ghost Stories and Legends" },
          { date: createDate(2024, 10, 30), name: "Night Photography Workshop" },
          { date: createDate(2024, 11, 13), name: "Bioluminescence Exhibition" },
          { date: createDate(2024, 11, 27), name: "Midnight in the Museum" },
        ]
      }
  // ... other upcoming events ...
];

function CalendarCard({
  title,
  museum,
  events,
  currentDate,
  onPrevMonth,
  onNextMonth
}) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const fillerDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{museum}</p>
      <div className="flex justify-between items-center mb-4">
        <button onClick={onPrevMonth} className="p-2 hover:bg-gray-200 rounded-full">
          <ArrowLeft size={20} />
        </button >
        <span className="font-medium">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={onNextMonth} className="p-2 hover:bg-gray-200 rounded-full">
          <ArrowRight size={20} />
        </button >
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        {fillerDays.map((_, index) => (
          <div key={`filler-${index}`} className="h-8"></div>
        ))}
        {days.map(day => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const event = events.find(
            e => e.date.toDateString() === date.toDateString()
          );
          return (
            <div
              key={day}
              className={`h-8 flex items-center justify-center text-sm rounded-full ${
                event ? "bg-blue-500 text-white" : ""
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        {events
          .filter(event => event.date.getMonth() === currentDate.getMonth())
          .map((event, index) => (
            <div key={index} className="text-sm mb-1">
              {event.date.getDate()}: {event.name}
            </div>
          ))}
      </div>
    </div>
  );
}

function Landing() {

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);//Search Bar
  const searchBarRef = useRef(null);//Search Bar
  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const searchBarPosition = searchBarRef.current.getBoundingClientRect().top;
        const navbarHeight = 64; // Adjust this value based on your navbar height
        setIsSearchBarVisible(searchBarPosition <= navbarHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // Language Dropdown

  const [searchQuery, setSearchQuery] = useState(""); // Search Bar 
  const [filterCategory, setFilterCategory] = useState("all");
  const [featuredScrollPosition, setFeaturedScrollPosition] = useState(0);
  const featuredMuseumsRef = useRef(null);
  const museumsNearYouRef = useRef(null);
  const [calendarDates, setCalendarDates] = useState(
    upcomingEvents.map(() => new Date())
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "Category:", filterCategory);
  };

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      prevIndex =>
        (prevIndex - 1 + carouselImages.length) % carouselImages.length
    );
  };



  const [isQmateOpen, setIsQmateOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleQmate = () => {
    setIsQmateOpen(!isQmateOpen);
    if (!isQmateOpen) {
      setMessages([]); // Reset messages when opening
    }
  };

  const handleSendMessage = async (message) => {
    if (message.trim() === '') return;
    
    setIsLoading(true);
    // Add user message
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add Qmate response
      setMessages(prev => [...prev, {
        text: "This is a sample response from Qmate. Replace with actual API response.",
        sender: 'qmate'
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  const scrollFeaturedSection = (direction) => {
    const container = featuredMuseumsRef.current;
    const cardWidth = 280; // width of each card including margin
    const visibleWidth = container.offsetWidth;
    const maxScroll = container.scrollWidth - visibleWidth;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    
    let newPosition = featuredScrollPosition + scrollAmount;
    newPosition = Math.max(0, Math.min(newPosition, maxScroll));
    
    setFeaturedScrollPosition(newPosition);
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
  };
  
  const scrollSection = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filteredMuseums =
    filterCategory === "all"
      ? museumsNearYou
      : museumsNearYou.filter(museum => museum.tags.includes(filterCategory));

  const handlePrevMonth = index => {
    setCalendarDates(prev =>
      prev.map((date, i) =>
        i === index
          ? new Date(date.getFullYear(), date.getMonth() - 1, 1)
          : date
      )
    );
  };


  const navigate = useNavigate();

  const handleLearnMore = (index) => {
    const selectedMuseum = museums[index];
    navigate(`/museum/${selectedMuseum.id}`);
    window.scrollTo(0, 0);
  };


  const handlecarosel = (index) => {
    const selectedMuseum = carouselImages[index];
    navigate(`/museum/${selectedMuseum.id}`);
    window.scrollTo(0, 0);
  };

  const handleNextMonth = index => {
    setCalendarDates(prev =>
      prev.map((date, i) =>
        i === index
          ? new Date(date.getFullYear(), date.getMonth() + 1, 1)
          : date
      )
    );
  };

  const scrollToSearchBar = () => {
    searchBarRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="relative overflow-x-hidden">
      <style>{scrollbarHideStyles}</style>
      <style>{dropdownStyles}</style>
      <style>{navbarStyles}</style>
      
      
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-gray-900 to-transparent">
      <div className="text-white text-xl sm:text-3xl font-bold tracking-wider pointer-events-none">
    Heritage Hub
  </div>
  
  <div className={`search-bar flex-1 flex justify-center items-center ml-14 ${isSearchBarVisible ? 'visible' : ''}`}>
    {/* Desktop Search Bar */}
    <form
      onSubmit={handleSearch}
      className="hidden sm:flex w-[30vw] max-w-3xl items-center overflow-hidden text-ellipsis bg-[#B4A1A1] rounded-full shadow-lg"
    >
      <Input
        type="text"
        placeholder="Search Your Favorite Museum"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="flex-grow bg-transparent text-white placeholder-white border-none focus:ring-0 focus:outline-none text-base sm:text-lg"
      />
      <button
        type="button"
        variant="ghost"
        className="text-white p-2 sm:p-4 rounded-full hover:bg-white/10 transition-colors"
      >
        <Mic className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
      <button
        type="submit"
        variant="ghost"
        className="text-white p-2 pr-4 sm:p-4 rounded-full hover:bg-white/10 transition-colors"
      >
        <Search className="h-4 w-4 mr-2 sm:h-6 sm:w-6" />
      </button>
    </form>

    {/* Mobile Search Icon */}
    <button 
      onClick={scrollToSearchBar} 
      className="sm:hidden absolute right-1  text-white p-2 hover:bg-white/10 rounded-full"
    >
      <Search className="h-5 w-5" />
    </button>
  </div>

        <button onClick={toggleMenu} className="text-white sm:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden sm:flex items-center space-x-6">
          <Link to={"/explore"} className="text-white hover:text-gray-300 transition-colors">
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
            <button className="block w-full text-left py-2">
              <Compass className="inline-block mr-2 h-5 w-5" />
              <Link to={"/explore"}> Explore</Link>
            </button>
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
  
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-screen overflow-hidden">
        <img
          src={carouselImages[currentImageIndex].url}
          alt={carouselImages[currentImageIndex].title}
          className="w-full h-full object-cover absolute"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4 sm:p-8">
          <div ref={searchBarRef} className="w-full max-w-3xl px-4 mb-4 sm:mb-8">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[#B4A1A1] rounded-full pl-2 shadow-lg"
            >
              <Input
                type="text"
                placeholder="Search Your Favorite Museum"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-white border-none focus:ring-0 focus:outline-none text-base sm:text-lg"
              />
              <button
                type="button"
                variant="ghost"
                className="text-white p-2 sm:p-4 rounded-full hover:bg-white/10 transition-colors"
              >
                <Mic className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
              <button
                type="submit"
                variant="ghost"
                className="text-white p-2 pr-4 sm:p-4 rounded-full hover:bg-white/10 transition-colors"
              >
                <Search className="h-4 w-4 mr-2 sm:h-6 sm:w-6" />
              </button>
            </form>
          </div>

          <div className="text-center max-w-3xl px-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-2">
              {carouselImages[currentImageIndex].title}
            </h2>
            <h4 className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-4">
              {carouselImages[currentImageIndex].subtitle}
            </h4>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-8">
              {carouselImages[currentImageIndex].description}{" "}
              <a
              onClick={() => handleLearnMore(currentImageIndex)}
                href="#"
                className="underline hover:text-gray-300 transition-colors"
              >
                Know more
              </a>
            </p>
            <button 
              onClick={() => handlecarosel(currentImageIndex)} 
              className="bg-[#B4A1A1] rounded-lg text-white hover:bg-[#A08E8E] transition-colors text-lg sm:text-xl px-6 sm:px-10 py-2 sm:py-3"
            >
              Book now
            </button>
          </div>

          
        </div>
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black text-white rounded-full p-1 sm:p-2 hover:bg-gray-800 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <button
          onClick={nextImage}
          onMouseMove={{style:{opacity:0,hover:{opacity:1},transition:'all 0.3s ease-in-out'}}}
          className="absolute top-1/2 right-2 sm:right-4  transform -translate-y-1/2 bg-black text-white rounded-full p-1 sm:p-2 hover:bg-gray-800 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>
  
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
  
      {/* Featured Museums Section */}
      <section className={`${responsiveSectionClasses} bg-gray-100`}>
        <div className={responsiveContainerClasses}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Featured Museums</h2>
          <div className="relative">
            <div
              ref={featuredMuseumsRef}
              className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {museums.map((museum, index) => (
                <div
                  key={museum.id}
                  className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-36 sm:h-40">
                    <img
                      src={museum.images[0]}
                      alt={museum.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute left-2 top-2 bg-white/80 text-black shadow-md rounded-full p-1 sm:p-2 hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    </button>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-base sm:text-lg mb-2 truncate">{museum.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                      {museum.description.substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">Sept 2024 - Jan 2025</span>
                      <button 
                        onClick={() => handleLearnMore(index)} 
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-white text-black border hover:bg-black/10 border-black rounded-lg text-xs sm:text-sm font-semibold" 
                        variant="outline"
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollFeaturedSection("left")}
              className="absolute ml-2 sm:ml-4 left-0 top-1/2 transform -translate-y-1/2 bg-white text-black shadow-md rounded-full p-1 sm:p-2 hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => scrollFeaturedSection("right")}
              className="absolute mr-2 sm:mr-4 right-0 top-1/2 transform -translate-y-1/2 bg-white text-black shadow-md rounded-full p-1 sm:p-2 hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </section>
  
      {/* Museums Near You Section */}
      <section className={`${responsiveSectionClasses} bg-white`}>
      <div className={responsiveContainerClasses}>
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Museums Near You</h2>
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      <Input
        type="text"
        placeholder="Search museums..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full sm:w-[930px]" // Changed this line
      />
      <Select 
        value={filterCategory} 
        onChange={e => setFilterCategory(e.target.value)}
        className="w-full sm:w-auto"
      >
        <option value="all">All Museums</option>
        <option value="Art">Art</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </Select>
      <button onClick={handleSearch} className="w-full sm:w-auto bg-black text-white rounded-lg px-4 py-2 flex items-center justify-center font-semibold">
        <Search className="mr-2 text-white h-4 w-4"/> Search
      </button>
    </div>
          <div className="relative">
            <div
              ref={museumsNearYouRef}
              className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
              {filteredMuseums.map((museum, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-40 sm:h-48">
                    <img
                      src={museum.image}
                      alt={museum.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 bg-white p-1 sm:p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    </button>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-base sm:text-lg mb-2 truncate">
                      {museum.name}
                    </h3>
                    <div className="flex items-center mb-1 sm:mb-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-500" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {museum.location}
                      </span>
                    </div>
                    <div className="flex items-center mb-1 sm:mb-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-500" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {museum.openingHours}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-xs sm:text-sm text-gray-600 mr-2">
                        {museum.distance}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                        <span className="text-xs sm:text-sm text-gray-600 ml-1">
                          {museum.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {museum.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-200 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-black px-3 sm:px-4 py-1 sm:py-2 text-white font-semibold rounded-lg hover:bg-black/80 text-sm sm:text-base">Book Tickets Now</button>
                      
                    <button onClick={toggleQmate} className="bg-black w-full mt-2 text-white border border-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-zinc-800 hover:scale-105 transition:ease-in-out duration-150 hover:animate-pulse hover:text-white">
                Ask Qmate
            </button>
            {isQmateOpen && (
                <AskQmate
                    isOpen={isQmateOpen}
                    onClose={toggleQmate}
                    messages={messages}
                    isLoading={isLoading}
                    onSendMessage={handleSendMessage}
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                />
            )}

   
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollSection("left", museumsNearYouRef)}
              className="absolute ml-2 sm:ml-4 left-0 top-1/2 transform -translate-y-1/2 bg-black text-white shadow-md rounded-full p-1 sm:p-2 hover:bg-gray-800"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => scrollSection("right", museumsNearYouRef)}
              className="absolute mr-2 sm:mr-4 right-0 top-1/2 transform -translate-y-1/2 bg-black text-white shadow-md rounded-full p-1 sm:p-2 hover:bg-gray-800"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </section>
  
      {/* Upcoming Events Section */}
      <section className={`${responsiveSectionClasses} bg-gray-100`}>
        <div className={responsiveContainerClasses}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {upcomingEvents.map((event, index) => (
              <CalendarCard
                key={index}
                title={event.title}
                museum={event.museum}
                events={event.events}
                currentDate={calendarDates[index]}
                onPrevMonth={() => handlePrevMonth(index)}
                onNextMonth={() => handleNextMonth(index)}
              />
            ))}
          </div>
        </div>
      </section>
  
      {/* Virtual Exploration Section */}
      <section className={`${responsiveSectionClasses} bg-white`}>
        <div className={responsiveContainerClasses}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Explore Museums Virtually</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Virtual Tours</h3>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Experience our museums from the comfort of your home with our
                immersive virtual tours.
              </p>
              <CustomButton>Start Virtual Tour</CustomButton>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Online Exhibitions</h3>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                Explore our curated online exhibitions featuring artworks and
                artifacts from around the world.
              </p>
              <CustomButton>View Exhibitions</CustomButton>
            </div>
          </div>
        </div>
      </section>
  
      {/* Newsletter Section */}
      <section className={`${responsiveSectionClasses} bg-gray-100`}>
        <div className={responsiveContainerClasses}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Stay Connected</h2>
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <form className="space-y-4">
              <Input className="w-full" type="email" placeholder="Enter your email" />
              <CustomButton className="w-full">Subscribe</CustomButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
  



}

export default Landing;
                