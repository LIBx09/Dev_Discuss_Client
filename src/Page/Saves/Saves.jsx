import React from "react";

const Saves = () => {
  // Sample saved questions data (No need for state)
  const savedItems = [
    {
      id: 1,
      title: "How to optimize React performance?",
      votes: 12,
      answers: 3,
      tags: ["react", "performance", "optimization"],
    },
    {
      id: 2,
      title: "Difference between useState and useReducer?",
      votes: 8,
      answers: 5,
      tags: ["react", "hooks", "state-management"],
    },
    {
      id: 3,
      title: "What are closures in JavaScript?",
      votes: 15,
      answers: 7,
      tags: ["javascript", "closures", "functions"],
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Saved Questions</h2>

      {savedItems.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven’t saved any questions yet.
        </p>
      ) : (
        <div className="space-y-4">
          {savedItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-sm bg-gray-100">
              <h3 className="text-lg font-semibold text-blue-600">{item.title}</h3>

              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
                <p>👍 {item.votes} votes</p>
                <p>💬 {item.answers} answers</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saves;
