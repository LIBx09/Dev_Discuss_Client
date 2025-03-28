import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/questions") // ✅ API Call
      .then((res) => {
        setQuestions(res.data); // ✅ Store questions in state
        setLoading(false); // ✅ Stop loading after fetching
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false); // ✅ Stop loading even if an error occurs
      });
  }, []);

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
        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <Link to={`/questions/${question._id}`}>
                <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                  {question.title}
                </h3>
              </Link>
              <div className="flex gap-4 text-sm mt-1">
                <span>Tag: {question.tag}</span>
                <span>Date: {question.date}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default Questions;
