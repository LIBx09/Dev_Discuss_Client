import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const QuestionDetails = () => {
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/questions/${id}`)
      .then((res) => {
        setQuestion(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching question details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6">
      <Link to="/questions" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Questions
      </Link>

      {loading ? (
        <p>Loading question details...</p>
      ) : question ? (
        <div className="border p-4 rounded shadow">
          <h2 className="text-2xl font-bold text-blue-600">{question.title}</h2>
          <p className="mt-2 text-gray-700">{question.body}</p>
          <div className="mt-4 text-sm text-gray-500">
            <span>Tag: {question.tag}</span> | <span>Date: {question.date}</span>
          </div>
        </div>
      ) : (
        <p>Question not found.</p>
      )}
    </div>
  );
};

export default QuestionDetails;
