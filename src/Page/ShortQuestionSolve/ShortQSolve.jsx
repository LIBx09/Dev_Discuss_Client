// src/pages/ShortQSolve.jsx
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
  const { user } = useContext(AuthContext);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['shortQSolve', id],
    queryFn: async () => {
      const res = await axios.get(`https://dev-discuss-server-chi.vercel.app/shortQ/${id}`);
      return res.data;
    },
  });

  const { topic, level, question } = data || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.trim() === '') return;

    try {
      setIsSubmitting(true);
      const res = await axios.post(`https://dev-discuss-server-chi.vercel.app/shortQ/${id}`, {
        question,
        answer,
        email: user?.email,
      });

      setSubmitSuccess(true);
      toast.success(res.data.message);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white rounded-2xl shadow-2xl p-6 md:p-8 hover:shadow-pink-500 transition-all duration-300 border-t-4 border-pink-500">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">💻 Code Battle Arena</h1>
          <p className="text-sm text-gray-300">Write your solution in under 200 lines. Get AI feedback & badges!</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
              {topic}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                level === 'beginner'
                  ? 'bg-green-600 bg-opacity-20 text-green-300'
                  : level === 'intermediate'
                  ? 'bg-yellow-600 bg-opacity-20 text-yellow-300'
                  : 'bg-red-600 bg-opacity-20 text-red-300'
              }`}
            >
              {level}
            </span>
            <span className="bg-purple-600 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Clock size={14} /> 5 mins
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6 p-4 rounded-xl bg-white/10">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Code size={18} /> Challenge
          </h2>
          <p className="whitespace-pre-wrap text-sm text-gray-200">{question}</p>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="answer" className="block mb-2 text-lg font-medium text-white">
              Your Solution:
            </label>
            <div className="relative">
              <textarea
                id="answer"
                rows="10"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your code here..."
                className="w-full p-4 rounded-xl bg-white/10 text-white font-mono text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {answer.split('\n').length} / 200 lines
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/events">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all text-sm">
                <FaArrowAltCircleLeft className="text-lg" />
                Back to Event
              </button>
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || answer.trim() === ''}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all text-sm ${
                isSubmitting || answer.trim() === ''
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-indigo-500 hover:shadow-lg hover:scale-[1.03]'
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