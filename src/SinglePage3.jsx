// import React, { useState, useEffect, useRef } from "react";
// import {FaStar, FaMapMarkerAlt, FaClock, FaTicketAlt, FaComments, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
// import Navbar from "./components/Navbar";
// import { Link, useParams } from "react-router-dom";
// import { museumData } from "./Museums/museumData";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import ExhibitModal from "./components/ExhibitModel";
// import AskQmate from './components/ask-qmate';

// function SinglePage3() {
//   const { id } = useParams();
//   const museum = museumData.find(m => m.id === parseInt(id));

//  // Chatbot related states
 


// const generateBotResponse = async (message, museumData) => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return `This is a dummy response to "${message}". In a real implementation, you would process the user's message and museumData here.`;
// };

// if (!museum) {
//   return <div>Museum not found</div>;
// }




//   const [selectedImage, setSelectedImage] = useState(0);
//   const [activeTab, setActiveTab] = useState('Exhibits');
//   const [reviewText, setReviewText] = useState('');
//   const [userRating, setUserRating] = useState(0);
//   const [userName, setUserName] = useState('');
//   const [reviews, setReviews] = useState(() => {
//     const savedReviews = localStorage.getItem(`reviews_${id}`);
//     return savedReviews ? JSON.parse(savedReviews) : museum?.reviews || [];
//   });

//   useEffect(() => {
//     if (museum) {
//       localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
//     }
//   }, [reviews, id, museum]);

//   const handlePurchase = () => {
//     console.log(`Initiating ticket purchase for ${museum?.name}`);
//   };

//   const handleReviewSubmit = () => {
//     const newReview = {
//       id: reviews.length + 1,
//       user: userName || "Anonymous",
//       avatar: "/placeholder.svg?height=50&width=50",
//       rating: userRating,
//       comment: reviewText
//     };
//     setReviews([...reviews, newReview]);
//     setReviewText('');
//     setUserRating(0);
//     setUserName('');
//   };

//   if (!museum) {
//     return <div>Museum not found</div>;
//   }

//   const [selectedExhibit, setSelectedExhibit] = useState(null); 

  

//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);
//  const [messages, setMessages] = useState([]);
//  const [inputMessage, setInputMessage] = useState('');
//  const [isLoading, setIsLoading] = useState(false);
//  const messagesEndRef = useRef(null);

//  useEffect(() => {
//   if (museum) {
//     localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
//   }
// }, [reviews, id, museum]);

// useEffect(() => {
//   scrollToBottom();
// }, [messages]);

// const scrollToBottom = () => {
//   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// };

// const [showChatbot, setShowChatbot] = useState(false);
// const handleOpenChatbot = () => {
//   setIsChatbotOpen(true);
// };

// const handleCloseChatbot = () => {
//   setIsChatbotOpen(false);
// };

// const handleSendMessage = async (message) => {
//   if (message.trim() === '') return;

//   const newMessage = {
//     id: Date.now(),
//     text: message,
//     sender: 'user',
//   };

//   setMessages((prevMessages) => [...prevMessages, newMessage]);
//   setInputMessage('');
//   setIsLoading(true);

//   try {
//     // Yahan aap API call ya response generation logic add kar sakte hain
//     const botResponse = await generateBotResponse(message, museum);
    
//     const botMessage = {
//       id: Date.now(),
//       text: botResponse,
//       sender: 'bot',
//     };

//     setMessages((prevMessages) => [...prevMessages, botMessage]);
//   } catch (error) {
//     console.error('Error generating bot response:', error);
//   } finally {
//     setIsLoading(false);
//   }
// };














  
//   return (
//     <div className="min-h-screen ">
//       <Navbar />
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div className="relative">

//             <div className="z-50 bg-gray-500 h-[45px] w-[45px] rounded-full absolute top-[2vh] left-[1vw]">
//             <Link to="/" className="flex items-center justify-center w-full h-full">
//     <IoMdArrowRoundBack size={26} className="text-white" />
//   </Link>
//             </div>
          
//             <img 
//               src={museum.images[selectedImage]} 
//               alt={museum.name} 
//               className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-md"
//             />
//             <div className="flex mt-4 space-x-2 overflow-x-auto">
              
//               {museum.images.map((images, index) => (
//                 <img 
//                   key={index}
//                   src={images} 
//                   alt={`${museum.name} thumbnail`} 
//                   className={`w-18 h-16 sm:w-18 sm:h-16 object-cover rounded cursor-pointer ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
//                   onClick={() => setSelectedImage(index)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="border-[1px] border-black/10 p-4 rounded-lg">
//             <h1 className="text-xl sm:text-2xl font-bold mb-6">{museum.name}</h1>
//             <p className="text-gray-900 font-medium text-[16px] sm:text-[19px] mb-8">{museum.description}</p>
//             <div className="space-y-4 mb-4">
//               <p><FaMapMarkerAlt className="inline mr-2 text-gray-900" />{museum.address}</p>
//               <p><FaClock className="inline mr-2 text-gray-900" />{museum.openingHours}</p>
//               <p><FaTicketAlt className="inline mr-2 text-gray-900" />Ticket Price: ₹{museum.ticketPrice.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between mt-16">
//               <button 
//                onClick={handleOpenChatbot}
//                 className="bg-black text-white border border-gray-300 px-4 py-2 rounded-md hover:bg-zinc-800 hover:scale-105 transition:ease-in-out duration-150 hover:animate-pulse hover:text-white"
//               >
//                 <FaComments className="inline mr-2 text-white" /> Ask Qmate
//               </button>
//               <AskQmate
//           museumData={museum}
//           onClose={handleCloseChatbot}
//           isOpen={showChatbot}
//         />
//               <button 
                 
//                 className="bg-white text-black border-[1px] border-black px-4 py-2 rounded-md hover:bg-black hover:text-white"
//               >
//                 <FaTicketAlt className="inline mr-2 hover:text-white" /> Purchase Tickets
//               </button>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl sm:text-3xl font-bold mb-8">Featured Exhibit: {museum.featuredExhibit.name}</h2>
//           <div className="flex flex-col sm:flex-row gap-6">
//             <img 
//               src={museum.featuredExhibit.image} 
//               alt={museum.featuredExhibit.name} 
//               className="w-full sm:w-96 h-64 object-cover rounded-lg"
//             />
//             <div>
//               <p className="text-gray-900 font-medium mb-4">{museum.featuredExhibit.description}</p>
//               <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Learn More</button>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap mb-4 text-grey-700 outline-none text-[14px] tracking-lighter font-semibold bg-[#c9c9c95c] rounded-md">
//           {['Exhibits', 'Events', 'Visitor Information', 'Reviews'].map((tab) => (
//             <button
//               key={tab}
//               className={`px-4 py-2 ${activeTab === tab ? 'inline-block py-1 rounded-md text-black bg-white m-3' : 'text-gray-600 hover:text-black transition-all duration-1000'}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md mb-8">
//           {activeTab === 'Exhibits' && (
//             <div className="p-6">
//               <h2 className="text-xl sm:text-2xl font-bold mb-4">Current Exhibits</h2>
//               <div className="flex flex-wrap sm:p-0">
//                 {museum.exhibits.map((exhibit) => (
//                   <div key={exhibit.id} className='w-full sm:w-[45vw] md:w-[22vw] rounded-lg overflow-hidden flex justify-between flex-col h-[64vh] m-6 mt-10 bg-white border-[1px] border-gray-300'>
//                     <div className='w-full h-64'>
//                       <img className='w-full h-full object-cover aspect-square' src={exhibit.images[0]} alt={exhibit.name} />
//                     </div>
//                     <div className='flex h-full flex-col justify-between'>
//                       <div className='pl-6 pr-2 w-full h-20 flex items-center mt-10'>
//                         <h1 className='text-2xl sm:text-4xl font-semibold'>{exhibit.name}</h1>
//                       </div>
//                       <div className='overflow-hidden text-ellipsis w-full flex items-center'>
//                         <h3 className='text-base sm:text-xl/2 font-semibold pl-6 pr-2'>{exhibit.description}</h3>
//                       </div>
//                       <div className='m-6 flex mt-10 mb-4'>
//                       <button 
//                     className='bg-black mb-3 text-white px-8 py-2 text-base sm:text-xl/2 font-semibold rounded-md w-full'
//                     onClick={() => setSelectedExhibit(exhibit)}
//                   >
//                     View More
//                   </button>
//                       </div>  
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//            {selectedExhibit && (
//         <ExhibitModal 
//           exhibit={selectedExhibit} 
//           onClose={() => setSelectedExhibit(null)} 
//         />
//       )}

// {isChatbotOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] flex flex-col">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-black">Qmate</h3>
//               <button onClick={handleCloseChatbot} className="text-2xl text-black">&times;</button>
//             </div>
              
//               <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded">
//                 {messages.map(message => (
//                   <div key={message.id} className={`mb-4 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
//                     <div className={`inline-block p-2 rounded-lg ${message.sender === 'bot' ? 'bg-gray-200 text-black' : 'bg-black text-white'}`}>
//                       {message.text}
//                     </div>
//                   </div>
//                 ))}
//                 {isLoading && (
//                   <div className="text-center">
//                     <div className="inline-block p-2 rounded-lg bg-gray-200 text-black">
//                       Typing...
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>
              
//               <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }} className="flex gap-2">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   placeholder="Type your message..."
//                   className="flex-grow p-2 border rounded text-black"
//                 />
//                 <button type="submit" className="bg-black text-white p-2 rounded">
//                   <FaPaperPlane className="w-5 h-5" />
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}




//           {activeTab === 'Events' && (
//             <div className="p-6">
//               <h2 className="text-xl sm:text-2xl tracking-tight font-bold mb-4">Upcoming Events</h2>
//               <div className="bg-white rounded-lg border-[1px] border-gray-300 shadow-md p-6">
//                 {museum.events.map((event, index) => (
//                   <div key={index} className="mb-6 last:mb-0">
//                     <h3 className="text-lg sm:text-xl font-semibold">{event.name}</h3>
//                     <p className="text-gray-600 font-medium">{event.date} | {event.time}</p>
//                     <button className="mt-3 px-4 py-1 text-[15px] bg-white text-black rounded border-[1px] border-gray-300 font-semibold tracking-tight hover:bg-blue-700">
//                       Set Reminder
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'Visitor Information'  && (
//             <div className="p-6 border-[1px] border-gray-300 rounded-lg">
//               <h2 className="text-xl sm:text-2xl font-semibold mb-8">Visitor Information</h2>
//               <div className='pl-5 border-[1px] pb-6 border-gray-300 rounded-lg py-4'>
//                 <ul className="list-disc pl-5 space-y-2">
//                   {museum.visitorInfo.map((info, index) => (
//                     <li key={index} className="text-gray-700">{info}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}

//           {activeTab === 'Reviews' && (
//             <div className="p-6">
//               <h2 className="text-xl sm:text-2xl font-bold mb-4">Visitor Reviews</h2>
//               <div className="space-y-6">
//                 {reviews.map((review) => (
//                   <div key={review.id} className="flex items-start space-x-4">
//                     <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full" />
//                     <div>
//                       <h3 className="font-semibold">{review.user}</h3>
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
//                         ))}
//                       </div>
//                       <p className="text-gray-600 mt-1">{review.comment}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-8">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-4">Leave a Review</h3>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Your Name"
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                 />
//                 <div className="flex mb-2">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={i < userRating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
//                       onClick={() => setUserRating(i + 1)}
//                     />
//                   ))}
//                 </div>
//                 <textarea
//                   className="w-full p-2 border rounded"
//                   rows="4"
//                   placeholder="Write your review here..."
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                 ></textarea>
//                 <button 
//                   className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//                   onClick={handleReviewSubmit}
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>



        
        
//         <div className="rounded-lg p-6 mb-8">
//           <h2 className="text-xl sm:text-2xl font-bold mb-4">Connect with Us</h2>
//           <div className="flex gap-4">
//             <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-blue-600"><FaFacebookF size={24} /></a>
//             <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-blue-400"><FaTwitter size={24} /></a>
//             <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-pink-600"><FaInstagram size={24} /></a>
//             <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-red-600"><FaYoutube size={24} /></a>
//           </div>
//         </div>
//       </div>

//       <footer className="bg-gray-800 text-white py-6">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p>&copy; 2023 Museum Explorer. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default SinglePage3;






import React, { useState, useEffect, useRef } from "react";
import {FaStar, FaMapMarkerAlt, FaClock, FaTicketAlt, FaComments, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import Navbar from "./components/Navbar";
import { Link, useParams } from "react-router-dom";
import { museumData } from "./Museums/museumData";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ExhibitModal from "./components/ExhibitModel";
import AskQmate from './components/ask-qmate';

function SinglePage3() {
  const { id } = useParams();
  const museum = museumData.find(m => m.id === parseInt(id));

  const [reviews, setReviews] = useState(() => {
    if (museum) {
      const savedReviews = localStorage.getItem(`reviews_${id}`);
      return savedReviews ? JSON.parse(savedReviews) : museum.reviews || [];
    }
    return [];
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Exhibits');
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (museum) {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
    }
  }, [reviews, id, museum]);

  const handlePurchase = () => {
    console.log(`Initiating ticket purchase for ${museum?.name}`);
  };

  const handleReviewSubmit = () => {
    const newReview = {
      id: reviews.length + 1,
      user: userName || "Anonymous",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: userRating,
      comment: reviewText
    };
    setReviews([...reviews, newReview]);
    setReviewText('');
    setUserRating(0);
    setUserName('');
  };

  const handleOpenChatbot = () => {
    setShowChatbot(true);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };


  if (!museum) {
    return <div>Museum not found</div>;
  }

  return (
    <div className="min-h-screen ">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative">
            <div className="z-50 bg-gray-500 h-[45px] w-[45px] rounded-full absolute top-[2vh] left-[1vw]">
              <Link to="/" className="flex items-center justify-center w-full h-full">
                <IoMdArrowRoundBack size={26} className="text-white" />
              </Link>
            </div>
          
            <img 
              src={museum.images[selectedImage]} 
              alt={museum.name} 
              className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-md"
            />
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {museum.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${museum.name} thumbnail`} 
                  className={`w-18 h-16 sm:w-18 sm:h-16 object-cover rounded cursor-pointer ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="border-[1px] border-black/10 p-4 rounded-lg">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">{museum.name}</h1>
            <p className="text-gray-900 font-medium text-[16px] sm:text-[19px] mb-8">{museum.description}</p>
            <div className="space-y-4 mb-4">
              <p><FaMapMarkerAlt className="inline mr-2 text-gray-900" />{museum.address}</p>
              <p><FaClock className="inline mr-2 text-gray-900" />{museum.openingHours}</p>
              <p><FaTicketAlt className="inline mr-2 text-gray-900" />Ticket Price: ₹{museum.ticketPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-16">
              <button 
                onClick={handleOpenChatbot}
                className="bg-black text-white border border-gray-300 px-4 py-2 rounded-md hover:bg-zinc-800 hover:scale-105 transition:ease-in-out duration-150 hover:animate-pulse hover:text-white"
              >
                <FaComments className="inline mr-2 text-white" /> Ask Qmate
              </button>
                <AskQmate
                  museumData={museum}
                  onClose={handleCloseChatbot}
                  isOpen={showChatbot}
                />

              <button 
                onClick={handlePurchase}
                className="bg-white text-black border-[1px] border-black px-4 py-2 rounded-md hover:bg-black hover:text-white"
              >
                <FaTicketAlt className="inline mr-2 hover:text-white" /> Purchase Tickets
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl sm:text-3xl font-bold mb-8">Featured Exhibit: {museum.featuredExhibit.name}</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <img 
              src={museum.featuredExhibit.image} 
              alt={museum.featuredExhibit.name} 
              className="w-full sm:w-96 h-64 object-cover rounded-lg"
            />
            <div>
              <p className="text-gray-900 font-medium mb-4">{museum.featuredExhibit.description}</p>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Learn More</button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mb-4 text-grey-700 outline-none text-[14px] tracking-lighter font-semibold bg-[#c9c9c95c] rounded-md">
          {['Exhibits', 'Events', 'Visitor Information', 'Reviews'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${activeTab === tab ? 'inline-block py-1 rounded-md text-black bg-white m-3' : 'text-gray-600 hover:text-black transition-all duration-1000'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md mb-8">
        {activeTab === 'Exhibits' && (
    <div className="p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Current Exhibits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {museum.exhibits.map((exhibit) => (
          <div key={exhibit.id} className='rounded-lg overflow-hidden flex flex-col justify-between bg-white border border-gray-300 h-full'>
            <div className='w-full h-48 sm:h-64'>
              <img className='w-full h-full object-cover' src={exhibit.images[0]} alt={exhibit.name} />
            </div>
            <div className='flex-grow flex flex-col p-4'>
              <div className='mb-2'>
                <h1 className='text-xl sm:text-2xl font-semibold'>{exhibit.name}</h1>
              </div>
              <div className='flex-grow overflow-hidden'>
                <h3 className='text-sm sm:text-base text-gray-600'>{exhibit.description}</h3>
              </div>
              <div className='mt-4'>
                <button 
                  className='bg-black text-white px-4 py-2 text-sm sm:text-base font-semibold rounded-md w-full'
                  onClick={() => setSelectedExhibit(exhibit)}
                >
                  View More
                </button>
              </div>  
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

          {activeTab === 'Events' && (
            <div className="p-6">
              <h2 className="text-xl sm:text-2xl tracking-tight font-bold mb-4">Upcoming Events</h2>
              <div className="bg-white rounded-lg border-[1px] border-gray-300 shadow-md p-6">
                {museum.events.map((event, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="text-lg sm:text-xl font-semibold">{event.name}</h3>
                    <p className="text-gray-600 font-medium">{event.date} | {event.time}</p>
                    <button className="mt-3 px-4 py-1 text-[15px] bg-white text-black rounded border-[1px] border-gray-300 font-semibold tracking-tight hover:bg-blue-700">
                      Set Reminder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Visitor Information'  && (
            <div className="p-6 border-[1px] border-gray-300 rounded-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-8">Visitor Information</h2>
              <div className='pl-5 border-[1px] pb-6 border-gray-300 rounded-lg py-4'>
                <ul className="list-disc pl-5 space-y-2">
                  {museum.visitorInfo.map((info, index) => (
                    <li key={index} className="text-gray-700">{info}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Visitor Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="flex items-start space-x-4">
                    <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-semibold">{review.user}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <p className="text-gray-600 mt-1">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Leave a Review</h3>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < userRating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                      onClick={() => setUserRating(i + 1)}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <button 
                  className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Connect with Us</h2>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-blue-600"><FaFacebookF size={24} /></a>
            <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-blue-400"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-pink-600"><FaInstagram size={24} /></a>
            <a href="#" className="text-gray-600 border-[1px] border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-2 rounded-md hover:text-red-600"><FaYoutube size={24} /></a>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <p>&copy; 2023 Museum Explorer. All rights reserved.</p>
         </div>
       </footer>
       {selectedExhibit && (
         <ExhibitModal exhibit={selectedExhibit} onClose={() => setSelectedExhibit(null)} />
        )}
        
              <AskQmate
                museumData={museum}
                onClose={handleCloseChatbot}
                isOpen={showChatbot}
              />
     </div>
   );
 }

 



export default SinglePage3;
        


