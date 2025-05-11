import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FixFlow = () => {
  const [errorCode, setErrorCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorCode || !selectedOption) return;
    
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await axios.post('https://dev-discuss-server-chi.vercel.app/fixFlow', {
        userInput: errorCode,
        selectedOption
      });
      
      setResult(response.data);
    } catch (error) {
      console.error('Error processing request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{background: 'var(--background)', color: 'var(--text-color)'}}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text font-bold">Dev Discuss Error Analyzer</h1>
            <p className="mt-2" style={{color: 'var(--button-bg)'}}>Paste your error code and choose how you'd like to solve it</p>
          </div>

          {/* Error Code Input */}
          <div className="bg-transparent rounded-lg shadow-md p-6 mb-8" style={{border: '1px solid color-mix(in srgb, var(--text-color) 20%, transparent)'}}>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="errorCode" className="block text-sm font-medium mb-2" style={{color: 'color-mix(in srgb, var(--text-color) 60%, transparent)'}}>
                  Error Code
                </label>
                <textarea
                  id="errorCode"
                  className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 font-mono text-sm"
                  style={{
                    background: 'var(--background)',
                    borderColor: 'var(--button-bg)',
                    color: 'var(--text-color)',
                    '&:focus': {
                      ringColor: 'var(--button-bg)'
                    }
                  }}
                  placeholder="Paste your error code here..."
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3" style={{color: 'var(--button-bg)'}}>
                  How would you like to solve this error?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <OptionCard
                    title="Blog"
                    description="Find related articles from Dev Discuss community"
                    icon="📚"
                    selected={selectedOption === 'blog'}
                    onClick={() => setSelectedOption('blog')}
                  />
                  <OptionCard
                    title="Question"
                    description="View related questions and answers"
                    icon="❓"
                    selected={selectedOption === 'question'}
                    onClick={() => setSelectedOption('question')}
                  />
                  <OptionCard
                    title="AI Generated Code"
                    description="Get AI-powered code fix and explanation"
                    icon="🤖"
                    selected={selectedOption === 'ai_code'}
                    onClick={() => setSelectedOption('ai_code')}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  errorCode && selectedOption 
                    ? 'hover:scale-105 text-white' 
                    : 'cursor-not-allowed'
                }`}
                style={{
                  background: errorCode && selectedOption 
                    ? 'var(--button-bg)' 
                    : 'color-mix(in srgb, var(--button-bg) 40%, transparent)',
                  '&:hover': {
                    background: errorCode && selectedOption 
                      ? 'var(--button-hover-bg)' 
                      : 'color-mix(in srgb, var(--button-bg) 40%, transparent)'
                  }
                }}
                disabled={!errorCode || !selectedOption}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Analyze Error'
                )}
              </button>
            </form>
          </div>

          {result && (
            <div className="rounded-lg shadow-md p-6 mb-8" style={{background: 'color-mix(in srgb, var(--background) 90%, var(--button-bg))'}}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold" style={{color: 'var(--button-bg)'}}>
                  {result.type === 'blog' && 'Related Blog Posts'}
                  {result.type === 'question' && 'Community Questions & Answers'}
                  {result.type === 'ai_code' && 'AI Fixed Code'}
                </h2>
                {result.type === 'ai_code' && (
                  <button
                    onClick={() => copyToClipboard(result.aiResponse)}
                    className="flex items-center text-sm hover:underline"
                    style={{color: 'var(--button-bg)'}}
                  >
                    {isCopied ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                )}
              </div>

              {result.type === 'blog' && (
                <div className="space-y-4">
                  {result.blogs && result.blogs.length > 0 ? (
                    result.blogs.map((blog, index) => (
                      <BlogCard key={index} blog={blog} />
                    ))
                  ) : (
                    <p style={{color: 'color-mix(in srgb, var(--text-color) 60%, transparent)'}}>
                      No related blog posts found. Try rephrasing your error or choose another option.
                    </p>
                  )}
                </div>
              )}

              {result.type === 'question' && (
                <div className="space-y-4">
                  {result.questions && result.questions.length > 0 ? (
                    result.questions.map((question, index) => (
                      <QuestionCard key={index} question={question} />
                    ))
                  ) : (
                    <p style={{color: 'color-mix(in srgb, var(--text-color) 60%, transparent)'}}>
                      No related questions found. Try rephrasing your error or choose another option.
                    </p>
                  )}
                </div>
              )}

              {result.type === 'ai_code' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-md overflow-x-auto" style={{background: 'color-mix(in srgb, var(--background) 80%, black)'}}>
                    <div className="font-mono text-sm whitespace-pre-wrap" style={{color: 'var(--text-color)'}}>
                      {result.aiResponse}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const OptionCard = ({ title, description, icon, selected, onClick }) => (
  <div
    className={`border rounded-lg p-4 cursor-pointer transition-all ${
      selected ? 'border-blue-500' : 'hover:border-blue-300'
    }`}
    style={{
      background: selected 
        ? 'color-mix(in srgb, var(--button-bg) 15%, transparent)' 
        : 'var(--background)',
      borderColor: selected 
        ? 'var(--button-bg)' 
        : 'color-mix(in srgb, var(--text-color) 20%, transparent)'
    }}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-medium" style={{color: 'var(--text-color)'}}>{title}</h3>
        <p className="text-sm mt-1" style={{color: 'color-mix(in srgb, var(--text-color) 60%, transparent)'}}>
          {description}
        </p>
      </div>
    </div>
  </div>
);

const BlogCard = ({ blog }) => (
  <div 
    className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
    style={{
      borderColor: 'color-mix(in srgb, var(--text-color) 20%, transparent)',
      '&:hover': {
        borderColor: 'var(--button-bg)'
      }
    }}
  >
    <h3 
      className="font-medium hover:underline"
      style={{color: 'var(--button-bg)'}}
    >
      {blog.title}
    </h3>
    <p className="text-sm mt-1" style={{color: 'color-mix(in srgb, var(--text-color) 70%, transparent)'}}>
      {blog.excerpt || blog.description}
    </p>
    <div className="mt-2 flex items-center text-xs" style={{color: 'color-mix(in srgb, var(--text-color) 50%, transparent)'}}>
      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      <span className="mx-2">•</span>
      <span>{blog.author?.name || 'Anonymous'}</span>
    </div>
  </div>
);

const QuestionCard = ({ question }) => (
  <Link to={`/questions/${question._id}`}>
    <div 
      className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
      style={{
        borderColor: 'color-mix(in srgb, var(--text-color) 20%, transparent)',
        '&:hover': {
          borderColor: 'var(--button-bg)'
        }
      }}
    >
      <h3 
        className="font-medium hover:underline"
        style={{color: 'var(--button-bg)'}}
      >
        {question.title}
      </h3>
      <p className="text-sm mt-1" style={{color: 'color-mix(in srgb, var(--text-color) 70%, transparent)'}}>
        {question.body?.substring(0, 150) + (question.body?.length > 150 ? '...' : '')}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs" style={{color: 'color-mix(in srgb, var(--text-color) 50%, transparent)'}}>
          <span>{question.date}</span>
          <span className="mx-2">•</span>
          <span>{question.userName || 'Anonymous'}</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center" style={{color: 'color-mix(in srgb, var(--text-color) 50%, transparent)'}}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            {question.comments?.length || 0} comments
          </span>
          <span className="flex items-center" style={{color: 'color-mix(in srgb, var(--text-color) 50%, transparent)'}}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            {question.votes || 0} votes
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default FixFlow;