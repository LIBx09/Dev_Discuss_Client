import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaCommentDots, FaUserCircle } from "react-icons/fa";
import useAxios from "../MainLayout/Shared/Hooks/useAxios";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";

const QuestionDetails = () => {
  const customAxios = useAxios(); // Renamed to avoid conflict with global axios
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  console.log(id);

  const { user } = useContext(AuthContext);
  const email = user?.email || "anonymous@example.com"; // Handle undefined user



  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await customAxios.get(`/questions/${id}`);
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
  }, [id, customAxios]);
  // const questionID = id;
  const handleSave = () => {
    const { _id, ...rest } = question; // শুধু _id বাদ দিচ্ছি
  
    const saveCollection = {
      ...rest,              // সব কিছু: title, body, comments, votes, tag, user info
      email,                // ইউজারের ইমেইল যিনি bookmark করছেন
      questionID: id,       // যাতে future check করা যায় already bookmarked কিনা
    };
  
    customAxios
      .post("/saves", saveCollection)
      .then((res) => {
        if (res.data.acknowledged) {
          setIsBookmarked(true);
          Swal.fire({
            title: "This question has been successfully bookmarked",
            icon: "success",
          });
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const res = await customAxios.get(`/saves?email=${email}`);
        const alreadyBookmarked = res.data.some(item => item.questionID === id); // ✅ Compare with actual question ID
        setIsBookmarked(alreadyBookmarked);
      } catch (err) {
        console.error("Bookmark check failed:", err);
      }
    };

    checkBookmark();
  }, [customAxios, email, id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      userName: user?.displayName || "Anonymous", // Use authenticated user
      photoURL: user?.photoURL || "", // Use authenticated user's photo
    };

    try {
      const res = await customAxios.post(`/questions/comments/${id}`, commentData);
      setComments((prevComments) => [...prevComments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto dark:bg-slate-900 dark:text-white">
      <Link to="/questions" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Questions
      </Link>

      {loading ? (
        <p className="text-center text-gray-600  dark:bg-slate-900 dark:text-white">Loading question details...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : question ? (
        <div className="border p-4 rounded-lg shadow-lg bg-white dark:bg-slate-900 dark:text-white">
          {/* Question Details */}
          <div className="flex items-center gap-3">
            {question.photoURL ? (
              <img src={question.photoURL} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <FaUserCircle className="w-12 h-12 text-gray-600" />
            )}
            <div>
              <h2 className="text-base font-semibold text-blue-600">{question.title}</h2>
              <p className="text-xs text-gray-500">Asked by: {question.userName || "Anonymous"}</p>
              <span className="text-xs">Date: {question.date}</span>
            </div>
          </div>

          <p className="mt-4 text-gray-700 text-xs dark:bg-slate-900 dark:text-white">{question.body}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-500">Tag: {question.tag}</span>
            <button
              onClick={handleSave}
              disabled={isBookmarked}
              className={`text-2xl ${isBookmarked? "cursor-not-allowed text-gray-400" : "text-blue-500 hover:text-blue-700"}`}
            >
              {isBookmarked? <IoBookmarksOutline /> : <PiBookmarkSimpleLight />}
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-6 dark:bg-slate-900 dark:text-white">
            <h3 className="text-lg font-semibold ">Comments</h3>
            <div className="mt-2 space-y-3">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="border p-2 rounded bg-gray-100 flex items-start gap-3 dark:bg-slate-900 dark:text-white">
                    {comment.photoURL ? (
                      <img src={comment.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-gray-600" />
                    )}
                    <div>
                      <p className="text-sm font-semibold">{comment.userName || "Anonymous"}</p>
                      <p className="text-sm">{comment.text}</p>
                      <span className="text-xs text-gray-500">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "Just now"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Comment Input */}
            <div className="mt-4 flex items-center gap-2">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-600 " />
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
