import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PiShareFatLight } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import useAxios from "../MainLayout/Shared/Hooks/useAxios";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  EmailShareButton, FacebookShareButton, LinkedinShareButton,
  TelegramShareButton, TwitterShareButton, WhatsappShareButton,
  EmailIcon, FacebookIcon, LinkedinIcon, TelegramIcon,
  TwitterIcon, WhatsappIcon,
} from "react-share";

const QuestionDetails = () => {
  const { user } = useContext(AuthContext);
  const customAxios = useAxios();
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [userId, setUserId] = useState("");
  const shareUrl = `${window.location.origin}/questions/${id}`;

  useEffect(() => {
    if (user?.email) setUserEmail(user.email);
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await customAxios.get(`/users?email=${user.email}`);
        if (res.data?._id) setUserId(res.data._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (user?.email) fetchUser();
  }, [user, customAxios]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await customAxios.get(`/questions/${id}`);
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
  }, [id, customAxios]);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const res = await customAxios.get(`/saves?email=${userEmail}`);
        const alreadyBookmarked = res.data.some((item) => item.questionID === id);
        setIsBookmarked(alreadyBookmarked);
      } catch (err) {
        console.error("Bookmark check failed:", err);
      }
    };
    if (userEmail) checkBookmark();
  }, [customAxios, userEmail, id]);

  const handleLike = async (_id) => {
    try {
      const res = await customAxios.post(`/questions/${_id}/like`, {
        userEmail,
        userId,
      });

      if (!question.likes?.includes(userEmail)) {
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 1000);
      }

      const updatedLikes = res.data.likes;
      setQuestion((prev) => ({
        ...prev,
        likes: updatedLikes,
      }));
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      userName: user?.displayName || "Anonymous",
      photoURL: user?.photoURL || "",
      userId: userId,
    };

    try {
      const res = await customAxios.post(`/questions/comments/${id}`, commentData);
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment.");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
      document.getElementById("share_modal").close();
    } catch (err) {
      toast.error("Copy failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <Link to="/questions" className="text-blue-400 hover:underline mb-6 block">
        ← Back to Questions
      </Link>

      {loading ? (
        <p className="text-center text-white">Loading question details...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : question ? (
        <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-2xl shadow-2xl overflow-hidden text-white">
          <div className="p-6 md:p-10 space-y-6">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              {question.photoURL ? (
                <img src={question.photoURL} alt="User" className="w-12 h-12 rounded-full" />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-300" />
              )}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:underline transition-colors">{question.title}</h1>
                <p className="text-sm text-purple-300">
                  Asked by: {question.userName || "Anonymous"} • {question.date}
                </p>
              </div>
            </div>

            <p className="text-gray-200 leading-relaxed text-base">{question.body}</p>

            {/* Tags & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 hover:scale-105 transition-transform font-semibold rounded-full shadow-md">
                {question.tag}
              </span>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(question._id)}
                  className={`px-3 py-1 rounded-lg flex items-center gap-2 transition ${
                    question.likes?.includes(userEmail)
                      ? "bg-pink-400 text-white"
                      : "bg-pink-200 text-gray-800"
                  }`}
                >
                  <AiOutlineLike className="text-lg" />
                  {question.likes?.length || 0}
                  {showEffect && (
                    <span className="absolute animate-fly left-3 pointer-events-none">
                      <AiOutlineLike />
                    </span>
                  )}
                </button>

                <button onClick={() => document.getElementById("share_modal").showModal()}>
                  <PiShareFatLight className="text-xl text-white hover:text-pink-400" />
                </button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-xl font-semibold mt-8 mb-4">Comments</h3>
              <ul className="space-y-3">
                {comments.map((comment, idx) => (
                  <li key={idx} className="bg-white/10 p-3 rounded-lg">
                    <p className="text-pink-400  font-semibold">{comment.userName}</p>
                    <p className="text-gray-300">{comment.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={handleCommentSubmit}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg shadow-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-400 text-center">Question not found.</p>
      )}

      {/* Share Modal */}
      <dialog id="share_modal" className="modal">
        <div className="modal-box text-center">
          <form method="dialog">
            <button className="btn btn-sm btn-circle bg-pink-400 hover:bg-pink-500 btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-pink-400 text-lg mb-4">Share this question</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <FacebookShareButton url={shareUrl}><FacebookIcon size={32} round /></FacebookShareButton>
            <TwitterShareButton url={shareUrl}><TwitterIcon size={32} round /></TwitterShareButton>
            <LinkedinShareButton url={shareUrl}><LinkedinIcon size={32} round /></LinkedinShareButton>
            <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round /></WhatsappShareButton>
            <TelegramShareButton url={shareUrl}><TelegramIcon size={32} round /></TelegramShareButton>
            <EmailShareButton url={shareUrl}><EmailIcon size={32} round /></EmailShareButton>
          </div>
          <button
            onClick={handleCopyLink}
            className="my-4 bg-pink-500 hover:bg-pink-600w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-lg text-white hover:scale-105 duration-300 shadow-xl  px-5 rounded-lg font-medium transition"
          >
            Copy Link
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default QuestionDetails;