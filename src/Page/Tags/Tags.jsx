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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Popular Tags</h2>
        <p className="text-gray-600">Browse the most used tags in the community</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tags Grid (Responsive) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag, index) => (
            <div key={index} className="bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
              <span className="text-blue-600 font-semibold">#{tag.name}</span>
              <span className="text-gray-500 text-sm">{tag.count} questions</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No tags found</p>
        )}
      </div>
    </div>
  );
};

export default Tags;
