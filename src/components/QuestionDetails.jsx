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
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
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
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 bg-[var(--background)]">
      <Link
        to="/questions"
        className="text-[var(--button-bg)] hover:underline mb-6 block"
      >
        ← Back to Questions
      </Link>

      {loading ? (
        <p className="text-center text-[var(--text-color)]">
          Loading question details...
        </p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : question ? (
        <div className="bg-[var(--background)] rounded-2xl shadow-md overflow-hidden border border-[var(--text-color)]/20">
          <div className="p-6 md:p-10 space-y-6">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              {question.photoURL ? (
                <img
                  src={question.photoURL}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-[var(--text-color)]" />
              )}
              <div>
                <h1 className="text-3xl font-bold text-[var(--button-bg)] hover:underline">
                  {question.title}
                </h1>
                <p className="text-sm text-[var(--text-color)]/70">
                  Asked by: {question.userName || "Anonymous"} • {question.date}
                </p>
              </div>
            </div>

            <p className="text-[var(--text-color)] leading-relaxed text-base">
              {question.body}
            </p>

            {/* Tags & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <span className="bg-[var(--button-bg)] text-[var(--button-text)] px-3 py-1 font-semibold rounded-full capitalize">
                {question.tag}
              </span>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(question._id)}
                  className={`px-3 py-1 rounded-lg flex items-center gap-2 transition ${
                    question.likes?.includes(userEmail)
                      ? "bg-[var(--button-bg)] text-[var(--button-text)]"
                      : "bg-[var(--background)] text-[var(--text-color)] border border-[var(--text-color)]/20"
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

                <button
                  onClick={() =>
                    document.getElementById("share_modal").showModal()
                  }
                >
                  <PiShareFatLight className="text-xl text-[var(--text-color)] hover:text-[var(--button-bg)]" />
                </button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[var(--text-color)]">
                Comments
              </h3>
              <ul className="space-y-3">
                {comments.map((comment, idx) => (
                  <li
                    key={idx}
                    className="bg-[var(--background)] p-3 rounded-lg border border-[var(--text-color)]/20"
                  >
                    <p className="text-[var(--button-bg)] font-semibold">
                      {comment.userName}
                    </p>
                    <p className="text-[var(--text-color)]">{comment.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 w-full px-4 py-3 rounded-xl border border-[var(--text-color)]/20 bg-[var(--background)] text-[var(--text-color)] placeholder-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={handleCommentSubmit}
                  className="btn hover:scale-105 transition-transform"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center">Question not found.</p>
      )}

      {/* Share Modal */}
      <dialog id="share_modal" className="modal">
        <div className="modal-box text-center bg-[var(--background)] border border-[var(--text-color)]/20">
          <form method="dialog">
            <button className="btn btn-sm btn-circle bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover-bg)] absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-[var(--button-bg)] text-lg mb-4">
            Share this question
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <EmailShareButton url={shareUrl}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
          <button
            onClick={handleCopyLink}
            className="btn w-full mt-4 hover:scale-105 transition-transform"
          >
            Copy Link
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default QuestionDetails;