import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaCommentDots, FaUserCircle } from "react-icons/fa";

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock authenticated user (Replace with actual authentication)
  const currentUser = {
    userName: "Md. Habibur Rahman",
    photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKK4gxBgp8ai6tCRA3Nx8OI1RtUgLJSYlT0ARVA5cxi2GLUU2A=s96-c",
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/questions/${id}`);
        setQuestion(res.data);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Failed to load question details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      userName: currentUser.userName,  // Passing commenter's name
      photoURL: currentUser.photoURL,  // Passing commenter's photo
    };

    try {
      const res = await axios.post(`http://localhost:5000/questions/comments/${id}`, commentData);
      setComments((prevComments) => [...prevComments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/questions" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Questions
      </Link>

      {loading ? (
        <p className="text-center text-gray-600">Loading question details...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : question ? (
        <div className="border p-6 rounded-lg shadow-lg bg-white">
          <div className="flex items-center gap-3">
            {question.photoURL ? (
              <img src={question.photoURL} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <FaUserCircle className="w-12 h-12 text-gray-600" />
            )}
            <div>
              <h2 className="text-xl font-bold text-blue-600">{question.title}</h2>
              <p className="text-sm text-gray-500">Asked by: {question.userName || "Anonymous"}</p>
              <span>Date: {question.date}</span>
            </div>
          </div>

          <p className="mt-4 text-gray-700">{question.body}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Comments</h3>
            <div className="mt-2 space-y-3">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="border p-2 rounded bg-gray-100 flex items-start gap-3">
                    {comment.photoURL ? (
                      <img src={comment.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-gray-600" />
                    )}
                    <div>
                      <p className="text-sm font-semibold">{comment.userName || "Anonymous"}</p>
                      <p className="text-sm">{comment.text}</p>
                      <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Comment input */}
            <div className="mt-4 flex items-center gap-2">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-600" />
              )}
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="border rounded w-full px-3 py-2"
              />
              <button onClick={handleCommentSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                <FaCommentDots />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Question not found.</p>
      )}
    </div>
  );
};

export default QuestionDetails;
