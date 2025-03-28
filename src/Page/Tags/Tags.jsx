import React, { useState } from "react";

const Tags = () => {
  // Sample tags data
  const allTags = [
    { name: "react", count: 120 },
    { name: "javascript", count: 200 },
    { name: "mongodb", count: 90 },
    { name: "express", count: 60 },
    { name: "node.js", count: 150 },
    { name: "firebase", count: 75 },
    { name: "tailwindcss", count: 50 },
    { name: "next.js", count: 110 },
    { name: "typescript", count: 130 },
    { name: "redux", count: 80 },
  ];

  // State for search input and filtered tags
  const [search, setSearch] = useState("");
  const filteredTags = allTags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Popular Tags
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Browse the most used tags in the community
        </p>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-lg flex justify-between items-center min-h-[50px] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base truncate">
                #{tag.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {tag.count} questions
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
            No tags found
          </p>
        )}
      </div>
    </div>
  );
};

export default Tags;
