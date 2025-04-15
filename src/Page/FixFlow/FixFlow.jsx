// FixFlow.jsx
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
      const response = await axios.post('https://dev-discuss-server-kappa.vercel.appfixFlow', {
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
console.log(result)
  return (
    <div className="min-h-screen bg-slate-50  dark:bg-slate-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Dev Discuss Error Analyzer</h1>
            <p className="text-slate-600 mt-2">Paste your error code and choose how you'd like to solve it</p>
          </div>

          {/* Error Code Input */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 dark:bg-slate-900 dark:text-white">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="errorCode" className="block text-sm font-medium text-slate-700 mb-2">
                  Error Code
                </label>
                <textarea
                  id="errorCode"
                  className="w-full h-40 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Paste your error code here..."
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  required
                />
              </div>

              {/* Options Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
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
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-300 text-white cursor-not-allowed'
                }`}
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

          {/* Results Area */}
          {result && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-800">
                  {result.type === 'blog' && 'Related Blog Posts'}
                  {result.type === 'question' && 'Community Questions & Answers'}
                  {result.type === 'ai_code' && 'AI Fixed Code'}
                </h2>
                {result.type === 'ai_code' && (
                  <button
                    onClick={() => copyToClipboard(result.aiResponse)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
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
                    <p className="text-slate-600">No related blog posts found. Try rephrasing your error or choose another option.</p>
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
                    <p className="text-slate-600">No related questions found. Try rephrasing your error or choose another option.</p>
                  )}
                </div>
              )}

              {result.type === 'ai_code' && (
                <div className="space-y-4">
                  {/* Change to render formatted text instead of raw JSON string */}
                  <div className="bg-slate-800 text-white p-4 rounded-md overflow-x-auto">
                    {/* Use white-space-pre-wrap to respect line breaks */}
                    <div className="font-mono text-sm whitespace-pre-wrap">
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
      selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-medium text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const BlogCard = ({ blog }) => (
  <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
    <h3 className="font-medium text-blue-700 hover:text-blue-800">{blog.title}</h3>
    <p className="text-sm text-slate-600 mt-1">{blog.excerpt || blog.description}</p>
    <div className="mt-2 flex items-center text-xs text-slate-500">
      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      <span className="mx-2">•</span>
      <span>{blog.author?.name || 'Anonymous'}</span>
    </div>
  </div>
);


const QuestionCard = ({ question }) => (
<Link to={`/questions/${question._id}`}>
<div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
    <h3 className="font-medium text-blue-700 hover:text-blue-800">{question.title}</h3>
    <p className="text-sm text-slate-600 mt-1">{question.body?.substring(0, 150) + (question.body?.length > 150 ? '...' : '')}</p>
    <div className="mt-2 flex items-center justify-between">
      <div className="text-xs text-slate-500">
        <span>{question.date}</span>
        <span className="mx-2">•</span>
        <span>{question.userName || 'Anonymous'}</span>
      </div>
      <div className="flex items-center space-x-3 text-xs">
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          {question.comments?.length || 0} comments
        </span>
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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