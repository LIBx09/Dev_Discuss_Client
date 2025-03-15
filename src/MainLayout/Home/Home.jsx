import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineQuestionAnswer } from "react-icons/md";

const Home = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-blue-600">Welcome to DevOverflow</h2>
        <p className="text-gray-600 mt-2 text-lg">Ask, answer, and explore coding questions.</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <Link to="/questions" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          Ask a Question
        </Link>
        <Link to="/tags" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 transition">
          Browse Tags
        </Link>
      </div>

      {/* Recent Questions Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MdOutlineQuestionAnswer className="text-blue-600" /> Recent Questions
        </h3>
        <ul className="mt-4 space-y-2">
          <li className="border p-3 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
            <Link to="/questions" className="text-blue-600 font-medium flex justify-between">
              How to use React Router for navigation?
              <FaArrowRight className="text-gray-500" />
            </Link>
          </li>
          <li className="border p-3 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
            <Link to="/questions" className="text-blue-600 font-medium flex justify-between">
              What are the best practices for MongoDB indexing?
              <FaArrowRight className="text-gray-500" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
