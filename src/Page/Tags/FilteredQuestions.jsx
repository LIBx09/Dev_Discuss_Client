import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const FilteredQuestions = () => {
  const { tagName } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/questions?tag=${tagName}`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [tagName]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Questions tagged with "{tagName}"
      </h2>

      <div className="mt-4 space-y-4">
        {questions.length ? (
          questions.map((q) => (
            <div key={q._id} className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md rounded-lg">
              <Link to={`/questions/${q._id}`}>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  {q.title}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {q.body.slice(0, 100)}...
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {q.tags.map((tag, index) => (
                  <span key={index} className="text-sm bg-blue-500 text-white px-2 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No questions found for this tag.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredQuestions;
