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
  
 
  // Fetch questions
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/questions');
      const data = await response.json();
  
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
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
      }).then((result) => {
        if (result.isConfirmed) {
            try {
            const res = axios.delete(`http://localhost:5000/question/${id}`)
                
                if (res) {
                
                  setQuestions(questions.filter(question => question._id !== id));
                } else {
                  console.error('Failed to delete question');
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

  // Sort questions based on selected option
  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'mostComments') {
      return b.comments?.length - a.comments?.length;
    } else if (sortBy === 'mostLikes') {
      return b.likes?.length - a.likes?.length;
    }
    return 0;
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className="bg-blue-50 p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Manage Questions</h2>
        
        {/* Sort Dropdown */}
        <div className="relative mb-4">
          <button 
            className="bg-white border border-blue-300 rounded px-4 py-2 flex items-center gap-2 text-blue-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 bg-white shadow-md rounded border border-blue-200 w-40">
              <div className="py-1">
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-700"
                  onClick={() => handleSortChange('newest')}
                >
                  Newest
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-700"
                  onClick={() => handleSortChange('oldest')}
                >
                  Oldest
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-700"
                  onClick={() => handleSortChange('mostComments')}
                >
                  Most Comments
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-700"
                  onClick={() => handleSortChange('mostLikes')}
                >
                  Most Likes
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Question Cards - Simplified */}
        <div className="space-y-3">
          {sortedQuestions.map((question) => (
            <div 
              key={question._id}
              className="bg-white rounded shadow p-4 flex justify-between items-center border-l-4 border-blue-500"
            >
              <div className="flex-1">
                <h3 className="font-medium text-lg text-blue-800">{question.title}</h3>
                <div className="flex gap-4 text-sm text-gray-600 mt-1">
                  <span>{question?.likes?.length} Likes</span>
                  <span>{question?.comments?.length} Comments</span>
                </div>
              </div>
              
              <button
                onClick={() => handleDelete(question._id)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Delete question"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          {sortedQuestions?.length === 0 && (
            <div className="bg-white p-4 rounded text-center">
              <p className="text-gray-600">No questions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;