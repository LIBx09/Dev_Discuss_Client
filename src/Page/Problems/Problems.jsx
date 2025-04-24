import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GiMightyForce } from "react-icons/gi";
import ProblemCard from '../../components/ProblemCard/ProblemCard';
import LoadingPage from '../Loading/LoadingPage';
import AuthContext from '../../Context/AuthContext';

const Problems = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [activeFilter, setActiveFilter] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['problems', email],
    queryFn: async () => {

      const { data } = await axios.get(`https://dev-discuss-server-chi.vercel.app//problems?email=${email}`);

      return data;
    }
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const { result: allProblems, currentProblemIndex } = data;
  
  // Filter problems based on the active filter
  const filteredProblems = allProblems.filter(problem => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unlocked') return allProblems.indexOf(problem) <= currentProblemIndex;
    if (activeFilter === 'locked') return allProblems.indexOf(problem) > currentProblemIndex;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-gray-900">
            <GiMightyForce className="text-blue-600" />
            Dev Discuss Problem Solving
          </h1>
          
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-white text-blue-600 shadow' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Problems
            </button>
            <button 
              onClick={() => setActiveFilter('unlocked')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === 'unlocked' 
                  ? 'bg-white text-blue-600 shadow' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unlocked
            </button>
       
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Problems: {allProblems.length}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-sm text-green-600 font-medium">Unlocked: {currentProblemIndex + 1}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProblems.map((problem, idx) => (
          <ProblemCard
            key={problem?._id}
            problem={problem}
            isLocked={idx > currentProblemIndex}
          />
        ))}
      </div>
      
      {filteredProblems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-gray-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a7 7 0 110-14 7 7 0 010 14z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No problems found</h3>
          <p className="text-gray-500 text-center mt-1">Try changing your filter selection</p>
        </div>
      )}
    </div>
  );
};

export default Problems;