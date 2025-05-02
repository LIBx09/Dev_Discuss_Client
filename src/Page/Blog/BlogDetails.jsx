import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaEye, FaHeart, FaShareAlt, FaHome } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IoArrowBackCircle } from "react-icons/io5";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dev-discuss-server-chi.vercel.app/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Blog not found");
        }
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Blog URL copied to clipboard!");
  };

  if (loading) {
    return <p className="text-center text-xl text-white mt-20">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center text-red-500 text-xl mt-20">Blog not found.</p>;
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <img src={blog.image} className="rounded-2xl h-96 w-full object-cover" alt={blog.title} />

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-blue-400">
              <FaEye className="text-xl" />
              <p>10</p>
            </div>
            <div className="flex items-center gap-2 text-pink-400">
              <FcLike className="text-xl" />
              <p>{likes}</p>
            </div>
            <div className="flex items-center gap-2 text-indigo-400">
              <FaShareAlt className="text-xl" />
              <p>110</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-6">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">{blog.title}</h1>
          <p className="text-[#749B3F] w-fit text-center bg-lime-100 rounded-xl text-black px-4 py-2">
            by {blog.author}
          </p>

          <p className="text-justify">{blog.content}</p>
          <p className="text-gray-300"><strong>Date:</strong> {blog.date}</p>

          {/* Action Buttons */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={handleLike}
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              <FaHeart className="inline mr-2" />
              Like ({likes})
            </button>

            <button
              onClick={handleShare}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              <FaShareAlt className="inline mr-2" />
              Share
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              <IoArrowBackCircle className="inline mr-2" />
              Back
            </button>

            <Link
              to="/"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md text-center"
            >
              <FaHome className="inline mr-2" />
              Go Home
            </Link>

            <Link
              to="/blogs"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md text-center"
            >
              All Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;