import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaUserEdit,
  FaImage,
  FaHeading,
  FaCalendarAlt,
  FaPen,
  FaTags,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const AddBlogs = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    "Web Development",
    "AI",
    "Machine Learning",
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Data Science",
    "Blockchain",
    "DevOps",
    "Cloud Computing",
    "Mobile Development",
    "Cybersecurity",
    "UI/UX Design",
    "Database",
    "Frontend",
    "Backend",
    "API Development",
    "Game Development",
    "IoT",
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
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
      const res = await axios.post(
        "https://dev-discuss-server-chi.vercel.app/blogs",
        blogData
      );
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
      className="min-h-screen bg-[var(--background)]"
    >
      <Helmet>
        <title>Add Blog | Dev Discuss</title>
      </Helmet>

      <div className="max-w-4xl mx-auto rounded-2xl p-8 shadow-md border border-[var(--text-color)]/20 bg-[var(--background)] space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-[var(--button-bg)]">
            Create a New Blog
          </h2>
          <p className="text-[var(--text-color)]/70 mt-2">
            Share your insights with the developer community
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-[var(--button-bg)] rounded-full" />
        </div>

        <form onSubmit={handleAddBlog} className="space-y-6">
          {/* Author */}
          <div>
            <label className="flex items-center gap-2 text-sm text-[var(--text-color)] font-medium mb-1">
              <FaUserEdit className="text-[var(--button-bg)]" /> Author
            </label>
            <input
              type="text"
              name="author"
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-[var(--text-color)]/20 bg-[var(--background)] text-[var(--text-color)] placeholder-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm text-[var(--text-color)] font-medium mb-1">
              <FaImage className="text-[var(--button-bg)]" /> Cover Image URL
            </label>
            <input
              type="url"
              name="photo"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-[var(--text-color)]/20 bg-[var(--background)] text-[var(--text-color)] placeholder-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition"
            />
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm text-[var(--text-color)] font-medium mb-1">
              <FaHeading className="text-[var(--button-bg)]" /> Blog Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Awesome Blog Title"
              className="w-full px-4 py-3 rounded-xl border border-[var(--text-color)]/20 bg-[var(--background)] text-[var(--text-color)] placeholder-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm text-[var(--text-color)] font-medium mb-1">
              <FaTags className="text-[var(--button-bg)]" /> Tags (2–5)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  disabled={
                    selectedTags.length >= 5 && !selectedTags.includes(tag)
                  }
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? "bg-[var(--button-bg)] text-[var(--button-text)]"
                      : "bg-[var(--background)] text-[var(--text-color)] border border-[var(--text-color)]/20 hover:scale-105"
                  } ${
                    selectedTags.length >= 5 && !selectedTags.includes(tag)
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length < 2 && (
              <p className="text-xs text-red-500 mt-1">
                Please select at least 2 tags
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="flex items-center gap-2 text-sm text-[var(--text-color)] font-medium mb-1">
              <FaPen className="text-[var(--button-bg)]" /> Blog Content
            </label>
            <textarea
              name="content"
              rows="6"
              required
              placeholder="Write your blog here..."
              className="w-full px-4 py-3 rounded-xl border border-[var(--text-color)]/20 bg-[var(--background)] text-[var(--text-color)] placeholder-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition"
            ></textarea>
          </div>

          {/* Date Picker */}
          <div>
            <label className="flex items-center gap-2 text-sm text-[var(--text-color)] font-medium mb-1">
              <FaCalendarAlt className="text-[var(--button-bg)]" /> Publication
              Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--text-color)]/20 bg-[var(--background)] text-[var(--text-color)] placeholder-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading || selectedTags.length < 2}
              className={`btn w-full ${
                selectedTags.length < 2
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 transition-transform"
              }`}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              className="text-center text-[var(--button-bg)] font-semibold bg-[var(--background)] border border-[var(--button-bg)]/20 py-2 rounded-lg mt-4"
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