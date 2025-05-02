import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const QuickStartOption = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-start g-gradient-to-r text-transparent bg-clip-text p-4 bg-gradient-to-br from-pink-400 to-purple-500 dark:from-slate-700 dark:to-slate-800 rounded-xl shadow hover:shadow-lg transition-all border border-pink-300 dark:border-slate-600 text-left w-full"
  >
    <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 mr-4 shadow-lg">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-lg text-pink-500 dark:text-pink-300">{title}</h3>
      <p className="text-sm text-purple-700 dark:text-slate-300 mt-1">{description}</p>
    </div>
  </button>
);

const TwinAI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mutation = useMutation({
    mutationFn: async (message) => {
      const { data } = await axios.post("https://dev-discuss-server-chi.vercel.app/chat", { message });
      return data;
    },
    onSuccess: (data) => {
      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
    },
    onError: () => {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    mutation.mutate(inputMessage);
    setInputMessage('');
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      title: "Help me code",
      description: "Get assistance with programming, debugging, or learning new languages",
      prompt: "I need help with coding. Can you assist me with "
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      title: "Create a routine",
      description: "Get help building daily schedules, workout plans, or study routines",
      prompt: "I want to create a daily routine for "
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: "Explain a concept",
      description: "Get clear explanations on complex topics or ideas",
      prompt: "Could you explain the concept of "
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      title: "Write something",
      description: "Get help writing emails, essays, stories, or other content",
      prompt: "I need help writing "
    }
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen dark:from-slate-800 dark:to-slate-900 text-gray-800 dark:text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 text-white flex items-center">
        <div className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">TwinAI</h1>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center h-full">
            <div className="text-center mt-8 mb-6">
              <h2 className="text-3xl bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text font-semibold">Welcome to TwinAI</h2>
              <p className="mt-2 text-white dark:text-slate-300">Your personal AI assistant. How can I help you today?</p>
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
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-xl max-w-xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-blue-100 to-pink-100 dark:from-pink-600 dark:to-pink-500 ml-auto text-right'
                    : 'bg-gradient-to-tr from-purple-100 to-blue-100 dark:from-pink-500 dark:to-purple-600 mr-auto text-left'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
            {mutation.isLoading && (
              <div className="bg-transparent dark:bg-slate-700 p-3 rounded-lg max-w-xs animate-pulse text-sm text-center dark:text-gray-300">
                TwinAI is typing...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-transparent dark:from-slate-800">
        <div className="flex items-center gap-2">
          <textarea
            rows={1}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 py-3 px-2 border border-gray-600 bg-transparent text-white transition dark:border-slate-600 dark:bg-slate-800  dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={mutation.isLoading}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwinAI;