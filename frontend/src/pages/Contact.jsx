import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  // --- FIX IS HERE ---
  // We use 'gemini-pro' because it is the most stable model on the free tier.
  // If you really want flash, try 'gemini-1.5-flash-latest' (but gemini-pro is safer).
  const genAI = new GoogleGenerativeAI(apiKey);
  // Using the model available in your list
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to UI immediately
    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setLoading(true);
    setUserInput(''); // Clear input early

    try {
      // Send the message to Gemini
      const result = await model.generateContent(userInput);
      const response = await result.response;
      const text = response.text();

      setMessages([...newMessages, { text, sender: 'bot' }]);
    } catch (error) {
      console.error("AI Error:", error);
      let errorMessage = "Sorry, I encountered an error. Please try again.";
      
      if (error.message.includes('404')) {
        errorMessage = "Error: Model not found. Please check Contact.jsx and ensure model is set to 'gemini-pro'.";
      } else if (error.message.includes('API key')) {
        errorMessage = "Error: Invalid API Key. Please check your .env file.";
      }

      setMessages([...newMessages, { text: errorMessage, sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <header className="py-6 px-6 shadow-sm border-b bg-white sticky top-0 z-10">
        <h1 className="text-3xl font-semibold text-blue-600">💬 AI Assistant</h1>
        <p className="text-sm text-gray-500">Ask anything you want, I'm here to help.</p>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm shadow ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-blue-500 animate-pulse">AI is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white border-t px-6 py-4 sticky bottom-0 z-10">
        <div className="flex gap-3">
          <textarea
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 h-16 resize-none p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`p-4 rounded-full transition ${
              loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } shadow`}
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Contact;