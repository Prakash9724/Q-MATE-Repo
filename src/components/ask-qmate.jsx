import React, { useState, useEffect, useRef } from 'react';
import { Star, MapPin, Calendar, Clock, Ticket, MessageCircle, Send, Globe, Info, Gift, Instagram, Facebook, Twitter, Youtube, Compass, Menu, Mic, Search, ChevronLeft, ChevronRight } from "lucide-react";

const initialMessages = [
  {
    id: 1,
    text: `Welcome to City Palace! To personalize your experience, what are you most interested in?`,
    sender: 'bot',
    type: 'checkbox',
    checkboxes: [
      { id: 'architecture', label: 'Architecture' },
      { id: 'history', label: 'History' },
      { id: 'art', label: 'Art' },
    ]
  }
];

const quickReplies = ['Book a ticket', 'Today\'s Exhibitions', 'Play Trivia', 'Palace Map', 'Special Events'];

const triviaQuestions = [
  {
    question: "In which city is the City Palace located?",
    options: ["Jaipur", "Udaipur", "Jodhpur", "Bikaner"],
    correctAnswer: "Udaipur"
  },
  {
    question: "Which lake offers panoramic views from the City Palace?",
    options: ["Lake Pichola", "Fateh Sagar Lake", "Udai Sagar Lake", "Jaisamand Lake"],
    correctAnswer: "Lake Pichola"
  },
  {
    question: "Which architectural styles are fused in the City Palace?",
    options: ["Gothic and Renaissance", "Rajasthani and Mughal", "Baroque and Rococo", "Victorian and Edwardian"],
    correctAnswer: "Rajasthani and Mughal"
  }
];

export default function AskQmate({ museumData, onClose, isOpen }) {
  if (!isOpen) return null;
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const [userPreferences, setUserPreferences] = useState([]);
  const [currentTriviaQuestion, setCurrentTriviaQuestion] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [bookingState, setBookingState] = useState({
    date: '',
    groupSize: 0,
    guidedTour: false,
    workshop: false,
  });
  const [chatEnded, setChatEnded] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text) => {
    if (chatEnded) return;

    const newMessage = { id: messages.length + 1, text, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse;
      switch (text.toLowerCase()) {
        case 'book a ticket':
          botResponse = {
            id: messages.length + 2,
            text: 'Great! Let\'s book a ticket for you. What date would you like to visit?',
            sender: 'bot',
            type: 'buttons',
            buttons: ['Today', 'Tomorrow', 'This weekend', 'Other date']
          };
          break;
        case 'today\'s exhibitions':
          botResponse = {
            id: messages.length + 2,
            text: `Based on your interests in ${userPreferences.join(', ')}, I recommend checking out our ${userPreferences[0]} exhibition. Here's a glimpse:`,
            sender: 'bot',
            type: 'image',
            image: museumData.exhibits[0].images[0]
          };
          break;
        case 'play trivia':
          botResponse = {
            id: messages.length + 2,
            text: triviaQuestions[currentTriviaQuestion].question,
            sender: 'bot',
            type: 'buttons',
            buttons: triviaQuestions[currentTriviaQuestion].options
          };
          break;
        case 'palace map':
          botResponse = {
            id: messages.length + 2,
            text: 'Here\'s the City Palace map. You can find the ' + userPreferences[0] + ' section highlighted.',
            sender: 'bot',
            type: 'image',
            image: '/placeholder.svg?height=300&width=300'
          };
          break;
        case 'special events':
          botResponse = {
            id: messages.length + 2,
            text: 'We have some exciting events coming up! Here are a few you might be interested in:',
            sender: 'bot',
            type: 'text'
          };
          setMessages(prev => [...prev, botResponse, ...museumData.events.map((event, index) => ({
            id: messages.length + 3 + index,
            text: `${event.name} on ${event.date} at ${event.time}`,
            sender: 'bot',
            type: 'text'
          }))]);
          setIsTyping(false);
          return;
        case 'preferences set':
          botResponse = {
            id: messages.length + 2,
            text: `Thank you for submitting your preferences. I'll now suggest museum exhibits based on your interests. Is there anything specific you'd like to know about ${userPreferences.join(', ')} in the City Palace?`,
            sender: 'bot',
            type: 'text'
          };
          break;
        default:
          if (triviaQuestions[currentTriviaQuestion].options.includes(text)) {
            if (text === triviaQuestions[currentTriviaQuestion].correctAnswer) {
              setTriviaScore(prev => prev + 1);
              botResponse = {
                id: messages.length + 2,
                text: 'Correct! Well done. Let\'s move to the next question.',
                sender: 'bot',
                type: 'text'
              };
            } else {
              botResponse = {
                id: messages.length + 2,
                text: `Sorry, that's not correct. The right answer is ${triviaQuestions[currentTriviaQuestion].correctAnswer}. Let's try the next question.`,
                sender: 'bot',
                type: 'text'
              };
            }
            setCurrentTriviaQuestion(prev => (prev + 1) % triviaQuestions.length);
            if (currentTriviaQuestion === triviaQuestions.length - 1) {
              setMessages(prev => [...prev, botResponse, {
                id: messages.length + 3,
                text: `You've completed the trivia! Your score is ${triviaScore + (text === triviaQuestions[currentTriviaQuestion].correctAnswer ? 1 : 0)} out of ${triviaQuestions.length}. Thank you for playing! Is there anything else I can help you with?`,
                sender: 'bot',
                type: 'text'
              }]);
              setIsTyping(false);
              return;
            }
          } else if (['today', 'tomorrow', 'this weekend', 'other date'].includes(text.toLowerCase())) {
            setBookingState(prev => ({ ...prev, date: text }));
            botResponse = {
              id: messages.length + 2,
              text: `Great, I've noted down ${text} for your visit. How many people will be in your group?`,
              sender: 'bot',
              type: 'buttons',
              buttons: ['1', '2', '3-5', '6+']
            };
          } else if (['1', '2', '3-5', '6+'].includes(text)) {
            setBookingState(prev => ({ ...prev, groupSize: text }));
            botResponse = {
              id: messages.length + 2,
              text: 'Would you like to add a guided tour to your visit?',
              sender: 'bot',
              type: 'buttons',
              buttons: ['Yes', 'No']
            };
          } else if (['yes', 'no'].includes(text.toLowerCase())) {
            setBookingState(prev => ({ ...prev, guidedTour: text.toLowerCase() === 'yes' }));
            botResponse = {
              id: messages.length + 2,
              text: 'Would you like to add a workshop to your visit? Our current workshop is on Rajasthani miniature painting techniques.',
              sender: 'bot',
              type: 'buttons',
              buttons: ['Yes', 'No']
            };
          } else {
            setBookingState(prev => ({ ...prev, workshop: text.toLowerCase() === 'yes' }));
            botResponse = {
              id: messages.length + 2,
              text: `Great! I've booked your visit for ${bookingState.date} for a group of ${bookingState.groupSize}. ${bookingState.guidedTour ? 'A guided tour is included.' : ''} ${text.toLowerCase() === 'yes' ? 'The Rajasthani miniature painting workshop is also booked for you.' : ''} Your booking is confirmed. Thank you for choosing City Palace!`,
              sender: 'bot',
              type: 'text'
            };
            setMessages(prev => [...prev, botResponse, {
              id: messages.length + 3,
              text: "Is there anything else I can help you with? Feel free to ask about exhibits, events, or any other information about the City Palace.",
              sender: 'bot',
              type: 'text'
            }]);
            setIsTyping(false);
            return;
          }
      }
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleCheckboxChange = (id) => {
    setUserPreferences(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Qmate</h3>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div className="flex justify-end mb-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="gu">ગુજરાતી</option>
          </select>
        </div>
        <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded">
          {messages.map(message => (
            <div key={message.id} className={`mb-4 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                {message.text}
                {message.type === 'image' && message.image && (
                  <img src={message.image} alt="Exhibition preview" className="mt-2 rounded-md" />
                )}
                {message.type === 'buttons' && message.buttons && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.buttons.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(button)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        {button}
                      </button>
                    ))}
                  </div>
                )}
                {message.type === 'checkbox' && message.checkboxes && (
                  <div className="flex flex-col gap-2 mt-2">
                    {message.checkboxes.map((checkbox) => (
                      <label key={checkbox.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={userPreferences.includes(checkbox.id)}
                          onChange={() => handleCheckboxChange(checkbox.id)}
                          className="mr-2"
                        />
                        <span>{checkbox.label}</span>
                      </label>
                    ))}
                    <button
                      onClick={() => handleSendMessage('Preferences set')}
                      disabled={userPreferences.length === 0}
                      className="bg-bl text-black px-2 py-1 rounded text-sm mt-2"
                    >
                      Set Preferences
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-left mb-4">
              <div className="inline-block bg-gray-200 p-2 rounded-lg">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(reply)}
              className="bg-gray-200 px-2 py-1 rounded text-sm"
            >
              {reply}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded"
          />
          <button type="submit" className="bg-black text-white p-2 rounded">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

