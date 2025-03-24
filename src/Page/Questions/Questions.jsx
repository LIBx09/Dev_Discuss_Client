import React from "react";
import { Link } from "react-router-dom";

const Questions = () => {
  // Sample questions (You can replace these with dynamic data later)
  const questions = [
    {
      id: 1,
      title: "How to use React Router for navigation?",
      votes: 5,
      answers: 2,
      views: 100,
    },
    {
      id: 2,
      title: "Best practices for MongoDB indexing?",
      votes: 10,
      answers: 4,
      views: 200,
    },
    {
      id: 3,
      title: "What is the difference between useState and useReducer?",
      votes: 8,
      answers: 3,
      views: 150,
    },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Questions</h2>
        <Link to="/askQuestion">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Ask a Question
          </button>
        </Link>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
              {question.title}
            </h3>
            <div className="flex gap-4  text-sm mt-1">
              <span>{question.votes} votes</span>
              <span>{question.answers} answers</span>
              <span>{question.views} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
