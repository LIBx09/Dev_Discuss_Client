import React, { useState, useRef, useEffect } from 'react';

const QuickStartOption = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left w-full"
  >
    <div className="rounded-full bg-blue-100 p-3 mr-4">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-lg text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
    </div>
  </button>
);

const TwinAI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://dev-discuss-server-kappa.vercel.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from TwinAI');
      }
      
      const data = await response.json();
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai'
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai'
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const setQuickStartPrompt = (prompt) => {
    setInputMessage(prompt);
  };

  const quickStartOptions = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>,
      title: "Help me code",
      description: "Get assistance with programming, debugging, or learning new languages",
      prompt: "I need help with coding. Can you assist me with "
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>,
      title: "Create a routine",
      description: "Get help building daily schedules, workout plans, or study routines",
      prompt: "I want to create a daily routine for "
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>,
      title: "Explain a concept",
      description: "Get clear explanations on complex topics or ideas",
      prompt: "Could you explain the concept of "
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>,
      title: "Write something",
      description: "Get help writing emails, essays, stories, or other content",
      prompt: "I need help writing "
    }
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50 rounded-lg shadow-lg">
      {/* Header - Fixed height */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex items-center">
        <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">TwinAI</h1>
      </div>
      
      {/* Messages Container - Scrollable with flex-1 to take remaining space */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-4 overflow-y-auto"
        style={{ overflowAnchor: 'none' }} // Prevents browser auto-scroll behavior
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center h-full">
            <div className="text-center mt-8 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Welcome to TwinAI</h2>
              <p className="text-gray-600 mt-2">Your personal AI assistant. How can I help you today?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl px-4">
              {quickStartOptions.map((option, index) => (
                <QuickStartOption 
                  key={index}
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  onClick={() => setQuickStartPrompt(option.prompt)}
                />
              ))}
            </div>
            
            <div className="text-center mt-8 text-gray-500">
              <p>Or type your own question below to get started</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                )}
                <div 
                  className={`rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg whitespace-pre-wrap shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center space-x-1 shadow-sm border border-gray-200 rounded-tl-none">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Input Area - Fixed height */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <textarea
            className="flex-1 px-4 py-3 focus:outline-none resize-none"
            placeholder="Type your message..."
            rows="1"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button
            className={`px-4 flex items-center justify-center text-white transition-colors ${isLoading || inputMessage.trim() === '' ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            onClick={handleSendMessage}
            disabled={isLoading || inputMessage.trim() === ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwinAI;