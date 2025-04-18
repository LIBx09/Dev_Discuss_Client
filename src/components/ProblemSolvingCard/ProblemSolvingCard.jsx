import React from 'react';
import { FaCode } from "react-icons/fa";
import { Link } from 'react-router-dom';
const ProblemSolvingCard = () => {
    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-blue-400 transition-all duration-300 border-t-4 border-blue-600 max-w-sm mx-auto">
        <div className="flex items-center gap-4 mb-4">
            <div className="text-blue-600 text-3xl">
      <FaCode />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">Code Battle Arena</h2>
                <p className="text-sm text-gray-500">Real-time coding challenge</p>
            </div>
        </div>
        <p className="text-gray-700 mb-4">
        Solve algorithmic problems in a live code editor. Get AI-powered feedback and earn your dev badge!
        </p>
<Link to={'/problems'}>
<button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            Start Now
        </button>
</Link>
    </div>
    );
};

export default ProblemSolvingCard;