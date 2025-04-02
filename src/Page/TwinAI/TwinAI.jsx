import React, { useState, useRef, useEffect } from 'react';

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
            const response = await fetch('https://dev-discuss-server-chi.vercel.app/chat', {
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

    return (
        <div className="flex flex-col h-screen max-h-screen bg-gray-100 rounded-lg shadow-lg">
            {/* Header - Fixed height */}
            <div className="bg-blue-600 p-4 text-white flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center mr-3">
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
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p className="text-lg">Start a conversation with TwinAI</p>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {messages.map(message => (
                            <div 
                                key={message.id} 
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg whitespace-pre-wrap ${
                                        message.sender === 'user' 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-200 text-gray-800'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 rounded-lg p-3 flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Input Area - Fixed height */}
            <div className="p-4 border-t border-gray-300 bg-white">
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <textarea
                        className="flex-1 px-4 py-2 focus:outline-none resize-none"
                        placeholder="Type your message..."
                        rows="1"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyUp={handleKeyPress}
                    />
                    <button
                        className={`px-4 text-white ${isLoading || inputMessage.trim() === '' ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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