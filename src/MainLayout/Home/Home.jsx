import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import LoadingPage from "../../Page/Loading/LoadingPage";
import { fetchQuestions } from "../../redux/questionsSlice";

const QUESTIONS_PER_PAGE = 6;

const Home = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // Calculate pagination
  const indexOfLastQuestion = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="md:text-5xl text-4xl font-extrabold text-blue-500">Welcome to DevDiscuss</h2>
        <div className="flex items-center justify-center pt-2 text-gray-500">
          <Marquee className="text-lg pb-2">
            A Collaborative Space for Developer Discussions | Share Your Dev Thoughts | Learn from Fellow Developers |
          </Marquee>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <Link to="/askQuestion">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Ask a Question
          </button>
        </Link>
        <Link
          to="/tags"
          className="bg-gray-200 text-center text-gray-800 px-6 py-2 rounded-lg shadow-md hover:text-white hover:bg-blue-600 transition"
        >
          Browse Tags
        </Link>
      </div>

      {/* Recent Questions Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MdOutlineQuestionAnswer className="text-blue-500" /> Recent Questions
        </h3>

        <div className="space-y-4">
          {loading ? (
            <LoadingPage />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : currentQuestions.length > 0 ? (
            currentQuestions.map((question) => (
              <div
                key={question._id}
                className="border p-2 border-gray-300 rounded-md shadow-sm hover:shadow-md transition"
              >
                <Link to={`/questions/${question._id}`}>
                  <h3 className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">
                    {question.title}
                  </h3>
                </Link>
                <div className="flex gap-2 text-xs mt-1 justify-between">
                  <span>{question.tag}</span>
                  <span>{question.date}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>

        {/* Pagination */}
        {questions.length > QUESTIONS_PER_PAGE && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;