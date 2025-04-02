import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Fetch tags from the backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("https://dev-discuss-server-chi.vercel.app/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  // Fetch questions based on the selected tag
  useEffect(() => {
    if (!selectedTag) return;
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://dev-discuss-server-chi.vercel.app/questions/tag/${selectedTag}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions for tag:", error);
      }
    };
    fetchQuestions();
  }, [selectedTag]);

  // Filter the tags based on the search term
  const filteredTags = tags.filter((tag) =>
    tag.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Popular Tags</h2>
        <p className="text-gray-600 dark:text-gray-400">Browse the most used tags in the community</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredTags.length > 0 ? (
          filteredTags.map((tagData, index) => (
            <div
              key={index}
              onClick={() => setSelectedTag(tagData.tag)}
              className="grid gap-4 bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-lg justify-between items-center min-h-[50px] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base truncate">#{tagData.tag}</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{tagData.count} questions</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">No tags found</p>
        )}
      </div>

      {/* Display Questions for Selected Tag */}
      {selectedTag && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Questions tagged with #{selectedTag}
          </h3>
          <div className="mt-4 space-y-4">
            {questions.length > 0 ? (
              questions.map((question) => (
                <div key={question._id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <Link to={`/questions/${question._id}`}>
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      {question.title}
                    </h4>
                  </Link>
                  <p className="text-gray-700 dark:text-gray-300">{question.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No questions found for this tag.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
