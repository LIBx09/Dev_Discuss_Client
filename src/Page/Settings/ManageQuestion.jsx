import React, { useState, useEffect } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import LoadingPage from '../Loading/LoadingPage';
import Swal from 'sweetalert2';
import axios from 'axios';

const ManageQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://dev-discuss-server-chi.vercel.app/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`https://dev-discuss-server-chi.vercel.app/question/${id}`);
          if (res.status === 200) {
            setQuestions(questions.filter(q => q._id !== id));
          }
        } catch (error) {
          console.error('Error deleting question:', error);
        }
      }
    });
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setIsDropdownOpen(false);
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'mostComments') return b.comments?.length - a.comments?.length;
    if (sortBy === 'mostLikes') return b.likes?.length - a.likes?.length;
    return 0;
  });

  if (isLoading) return <LoadingPage />;

  return (
    <section className="w-full min-h-screen px-4 py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Manage Questions
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            View, sort, and remove questions in your platform.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative self-end">
          <button 
            className="px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            <ChevronDown size={16} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-1 bg-white shadow-md rounded border border-blue-200 w-44">
              {['newest', 'oldest', 'mostComments', 'mostLikes'].map(option => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-700 capitalize"
                  onClick={() => handleSortChange(option)}
                >
                  {option.replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {sortedQuestions.map((question) => (
            <div
              key={question._id}
              className="rounded-xl bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text p-5 shadow-lg border-l-4 border-pink-500 bg-white flex justify-between items-center hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-pink-500"b>
                  {question.title}
                </h3>
                <div className="text-sm text-gray-500 mt-1 flex gap-6">
                  <span>👍 {question.likes?.length || 0} Likes</span>
                  <span>💬 {question.comments?.length || 0} Comments</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(question._id)}
                className="text-red-500 hover:text-red-700 p-2"
                aria-label="Delete question"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {sortedQuestions.length === 0 && (
            <div className="bg-white p-6 rounded-xl text-center border border-gray-200">
              <p className="text-gray-500">No questions found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageQuestion;