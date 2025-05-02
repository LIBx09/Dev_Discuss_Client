import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  FaUserEdit, FaImage, FaHeading, FaCalendarAlt,
  FaPen, FaTags
} from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";

const AddBlogs = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    "Web Development", "AI", "Machine Learning", "JavaScript", "Python",
    "React", "Node.js", "Data Science", "Blockchain", "DevOps",
    "Cloud Computing", "Mobile Development", "Cybersecurity", "UI/UX Design",
    "Database", "Frontend", "Backend", "API Development", "Game Development", "IoT"
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const author = form.author.value;
    const image = form.photo.value;
    const title = form.title.value;
    const content = form.content.value;
    const date = startDate;

    const blogData = { author, image, title, content, date, tags: selectedTags };

    try {
      const res = await axios.post("https://dev-discuss-server-chi.vercel.app/blogs", blogData);
      if (res.data) {
        setSuccess(true);
        form.reset();
        setSelectedTags([]);
        setStartDate(new Date());
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to add blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <Helmet>
        <title>Add Blog | Dev Discuss</title>
      </Helmet>

      <div className="max-w-4xl mx-auto  rounded-2xl p-8 shadow-xl space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Create a New Blog</h2>
          <p className="text-gray-300 mt-2">Share your insights with the developer community</p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>

        <form onSubmit={handleAddBlog} className="space-y-6">
          {/* Author */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-1">
              <FaUserEdit className="text-pink-500" /> Author
            </label>
            <input
              type="text"
              name="author"
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <div>
        </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-1">
              <FaImage className="text-pink-500" /> Cover Image URL
            </label>
            <input
              type="url"
              name="photo"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-1">
              <FaHeading className="text-pink-500" /> Blog Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Awesome Blog Title"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-1">
              <FaTags className="text-pink-500" /> Tags (2–5)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                      : "bg-transparent text-gray-300 hover:scale-105"
                  } ${selectedTags.length >= 5 && !selectedTags.includes(tag) ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length < 2 && (
              <p className="text-xs text-red-400 mt-1">Please select at least 2 tags</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-1">
              <FaPen className="text-pink-500" /> Blog Content
            </label>
            <textarea
              name="content"
              rows="6"
              required
              placeholder="Write your blog here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            ></textarea>
          </div>

          {/* Date Picker */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-1">
              <FaCalendarAlt className="text-pink-500" /> Publication Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading || selectedTags.length < 2}
              className={`w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all duration-300 ${
                selectedTags.length < 2 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              className="text-center text-green-400 font-semibold bg-green-900/20 py-2 rounded-lg mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Blog published successfully!
            </motion.div>
          )}
        </form>
      </div>
    </motion.section>
  );
};

export default AddBlogs;