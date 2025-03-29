import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaCommentDots, FaUserCircle } from "react-icons/fa";

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch question details and comments
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/questions/${id}`);
        setQuestion(res.data);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Failed to load question details.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    const commentData = { text: newComment };

    try {
      const res = await axios.post(`http://localhost:5000/questions/comments/${id}`, commentData);
      setComments((prevComments) => [...prevComments, res.data]); // Add new comment to state
      setNewComment(""); // Clear comment input
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/questions" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Questions
      </Link>

      {loading ? (
        <p>Loading question details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : question ? (
        <div className="border p-6 rounded-lg shadow-lg bg-white">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-gray-600" />
            <div>
              <h2 className="text-xl font-bold text-blue-600">{question.title}</h2>
              <p className="text-sm text-gray-500">Asked by: {question.author || "Anonymous"}</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">{question.body}</p>

          <div className="mt-4 flex items-center gap-3 text-gray-600">
            <span className="ml-auto text-sm">Tag: {question.tag || "General"}</span>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Comments</h3>
            <div className="mt-2 space-y-3">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="border p-2 rounded bg-gray-100">
                    <p className="text-sm">{comment.text}</p>
                    <span className="text-xs text-gray-500">
                      Posted at: {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Add Comment Section */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="border rounded w-full px-3 py-2"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                <FaCommentDots />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Question not found.</p>
      )}
    </div>
  );
};

export default QuestionDetails;
