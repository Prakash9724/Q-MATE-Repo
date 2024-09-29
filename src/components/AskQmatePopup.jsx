import React, { useState, useRef, useEffect } from 'react';
import { Send } from "lucide-react";

export default function AskQmate({ museumData, onClose, isOpen }) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpen = () => {
    console.log("Button clicked, opening popup");
    setIsOpen(true);
  };

  const handleSendMessage = async (message) => {
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Yahan aap API call ya response generation logic add kar sakte hain
      const botResponse = await generateBotResponse(message, museumData);
      
      const botMessage = {
        id: Date.now(),
        text: botResponse,
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating bot response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dummy function for bot response generation
  const generateBotResponse = async (message, museumData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `This is a dummy response to "${message}". In a real implementation, you would process the user's message and museumData here.`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-black">Qmate</h3>
          <button onClick={onClose} className="text-2xl text-black">&times;</button>
        </div>
        
        <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded">
          {messages.map(message => (
            <div key={message.id} className={`mb-4 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.sender === 'bot' ? 'bg-gray-200 text-black' : 'bg-black text-white'}`}>
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center">
              <div className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded text-black"
          />
          <button type="submit" className="bg-black text-white p-2 rounded">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}