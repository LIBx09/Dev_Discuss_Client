import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PiBookmarkSimpleLight, PiShareFatLight } from "react-icons/pi";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaCommentDots, FaUserCircle } from "react-icons/fa";
import useAxios from "../MainLayout/Shared/Hooks/useAxios";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import { AiOutlineLike } from "react-icons/ai";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton,  LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import toast from "react-hot-toast";

const QuestionDetails = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  console.log("userEmail", email);
  const customAxios = useAxios(); // Renamed to avoid conflict with global axios
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const [userEmail, setUserEmail] = useState(`${user?.email}`);
  const [userId, setUserId] = useState("");
  const shareUrl = `${window.location.origin}/questions/${id}`;

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, [user]);
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        try {
          const res = await customAxios.get(`/users?email=${user.email}`);
          // console.log("Fetched user:", res.data);
          if (res.data?._id) {
            setUserId(res.data._id); // _id সেট করা হচ্ছে
          } else {
            console.log("User ID not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    if (user?.email) {
        fetchUser();
    }
}, [user]); // user ডিপেনডেন্সি হিসেবে ব্যবহার


  
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
    const { _id, ...rest } = question;

    const saveCollection = {
      ...rest,
      email,
      questionID: id,
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
        const alreadyBookmarked = res.data.some(item => item.questionID === id);
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
      userName: user?.displayName || "Anonymous",
      photoURL: user?.photoURL || "",
      userId: userId
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

  const handleLike = async (_id) => {
    try {
      const res = await customAxios.post(`/questions/${_id}/like`, {
        userEmail, userId
      });
  
      if (!isLiked) {
        setShowEffect(true);
        setTimeout(() => {
          setShowEffect(false);
        }, 1000);
      }
  
      const updatedLikes = res.data.likes;
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        likes: updatedLikes,
      }));
    } catch (error) {
      console.error("Error while toggling like:", error);
    }
  };
  


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
      document.getElementById('my_modal_3').close();
    } catch (err) {
      toast.error('Failed to copy!');
    }
  };



  const isLiked = question?.likes?.includes(userEmail);
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
              <span className="text-xs">{question.date}</span>
            </div>
          </div>

          <p className="mt-4 text-gray-700 text-xs dark:bg-slate-900 dark:text-white">{question.body}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-500"> {question.tag}</span>
            <div className="flex items-center justify-center gap-4 relative">
              {/* like btn */}
              <button
                onClick={() => handleLike(question._id)}
                className={` z-10 transition px-4 py-1 rounded-md flex items-center justify-center gap-1 ${isLiked ? "bg-blue-200 dark:bg-blue-400 dark:text-blue-950 text-blue-800" : "bg-gray-200 text-gray-800"}`}
              >
                <span className="hover:text-blue-500 dark:hover:text-blue-700 text-xl"><AiOutlineLike /></span>  ({question?.likes?.length || 0})
                {showEffect && (
                  <span className="absolute text-blue-700 text-xl animate-fly pointer-events-none  left-3">
                    <AiOutlineLike />
                  </span>
                )}
              </button>
              {/* share btn */}
              <button onClick={() => document.getElementById('my_modal_3').showModal()}>
                <span className="text-2xl"><PiShareFatLight /></span>
              </button>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h2 className="text-xl font-semibold mb-2">Share this question</h2>
                  <p className="text-gray-600 mb-4">
                    Share this question on your favorite social media platform.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div>
                      <FacebookShareButton url={shareUrl} quote="share this post" hashtag={shareUrl}>
                        <FacebookIcon size={32} round={true}></FacebookIcon>
                      </FacebookShareButton>
                    </div>
                    <div>
                      <LinkedinShareButton url={shareUrl}>
                        <LinkedinIcon size={32} round={true}></LinkedinIcon>
                      </LinkedinShareButton>
                    </div>
                    <div>
                      < WhatsappShareButton url={shareUrl} quote="share this post" hashtag={shareUrl}>
                        <WhatsappIcon size={32} round={true}></WhatsappIcon>
                      </ WhatsappShareButton>
                    </div>
                    <div>
                      < EmailShareButton url={shareUrl} quote="share this post" hashtag={shareUrl}>
                        <EmailIcon size={32} round={true}></EmailIcon>
                      </ EmailShareButton>
                    </div>
                    <div>
                      < TwitterShareButton url={shareUrl} quote="share this post" hashtag={shareUrl}>
                        <TwitterIcon size={32} round={true}></TwitterIcon>
                      </ TwitterShareButton>
                    </div>
                    <div>
                      < TelegramShareButton url={shareUrl} quote="share this post" hashtag={shareUrl}>
                        <TelegramIcon size={32} round={true}></TelegramIcon>
                      </ TelegramShareButton>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button onClick={handleCopyLink} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                      Copy Link
                    </button>
                  </div>
                </div>
              </dialog>
              {/* save btn */}
              <button
                onClick={handleSave}
                disabled={isBookmarked}
                className={`text-2xl ${isBookmarked ? "cursor-not-allowed text-gray-400" : "text-blue-500 hover:text-blue-700"}`}
              >
                {isBookmarked ? <IoBookmarksOutline /> : <PiBookmarkSimpleLight />}
              </button>
            </div>
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
                className="border rounded w-full px-3 py-2 dark:bg-slate-800"
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
