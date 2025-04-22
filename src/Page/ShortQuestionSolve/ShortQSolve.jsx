import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingPage from '../Loading/LoadingPage';
import { Clock, Send, Code, CheckCircle } from 'lucide-react';
import AuthContext from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const ShortQSolve = () => {
  const { id } = useParams();
  const {user}=useContext(AuthContext)
  
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { data, isLoading } = useQuery({
    queryKey: ['shortQSolve', id],
    queryFn: async () => {
      const res = await axios.get(`https://dev-discuss-server-chi.vercel.app//shortQ/${id}`);
      return res.data;
    }
  });
  const { topic, level, question } = data || {};

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (answer.trim() === '') return;
    
    try {
      setIsSubmitting(true);
      
      // Send answer to backend
   const res =   await axios.post(`https://dev-discuss-server-chi.vercel.app//shortQ/${id}`, {
        question,
        answer,
        email:user?.email
      
      });
    
      setSubmitSuccess(true);

      toast.success(res.data.message)
      setTimeout(() => {setSubmitSuccess(false)
    }, 3000);
      
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('something went wrong please try again later')
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <LoadingPage />;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 md:p-8">
        {/* Challenge Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
            Coding Challenge
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Write your solution in under 200 lines. Good luck!
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
              {topic}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              level === "beginner" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                : level === "intermediate" 
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" 
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}>
              {level}
            </span>
            <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Clock size={14} /> 5 minutes
            </span>
          </div>
        </div>
        
        {/* Question */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-white">
            <Code size={18} /> Challenge
          </h2>
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
            {question}
          </p>
        </div>
        
        {/* Answer Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="answer" 
              className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Your Solution:
            </label>
            <div className="relative">
              <textarea
                id="answer"
                rows="10"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your code here..."
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400">
                {answer.length} / 200 lines
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
         <Link to={'/events'}>
         <button className='btn px-6 py-6 rounded-xl bg-gray-900 text-white'>
             <FaArrowAltCircleLeft></FaArrowAltCircleLeft>   Back to event
            </button>
         </Link>
            <button
              type="submit"
              disabled={isSubmitting || answer.trim() === ''}
              className={`px-6 py-3 flex items-center gap-2 rounded-xl text-white font-medium transition-all ${
                isSubmitting || answer.trim() === '' 
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : submitSuccess ? (
                <>
                  <CheckCircle size={18} />
                  Submitted!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Solution
                </>
              )}
            </button>
         
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShortQSolve;