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
    <section className="min-h-screen w-full px-4">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center">
          <h2 className="md:text-5xl text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            Welcome to DevDiscuss
          </h2>
          <div className="flex items-center justify-center pt-4 text-purple-300">
            <Marquee className="text-lg pb-2">
              A Collaborative Space for Developer Discussions | Share Your Dev Thoughts | Learn from Fellow Developers |
            </Marquee>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/askQuestion">
            <button className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 hover:scale-105 transition-transform font-semibold rounded-full shadow-md">
              Ask a Question
            </button>
          </Link>
          <Link to="/tags">
            <button className="inline-block bg-gradient-to-r from-blue-400 to-teal-500 text-white px-6 py-3 hover:scale-105 transition-transform font-semibold rounded-full shadow-md">
              Browse Tags
            </button>
          </Link>
        </div>

        {/* Recent Questions Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold flex items-center gap-2 mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            <MdOutlineQuestionAnswer className="text-pink-500 text-3xl" />
            Recent Questions
          </h3>

          {loading ? (
            <LoadingPage />
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : currentQuestions.length > 0 ? (
            <div className="grid md:grid-cols-1 gap-6">
  {currentQuestions.map((question) => (
    <div
      key={question._id}
      className="bg-gradient-to-br from-[#1f1f2e] via-[#2a2850] to-[#302b63] p-6 rounded-xl shadow-lg border-pink-500 border-l-4 hover:scale-[1.01] transition-transform duration-300"
    >
      <Link to={`/questions/${question._id}`}>
        <h3 className="text-lg font-semibold text-white hover:underline mb-2">
          {question.title}
        </h3>
      </Link>
      <div className="flex justify-between text-sm text-gray-300">
        <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full">
          {question.tag}
        </span>
        <span>{question.date}</span>
      </div>
    </div>
  ))}
</div>
          ) : (
            <p className="text-gray-400">No questions available.</p>
          )}

          {/* Pagination */}
          {questions.length > QUESTIONS_PER_PAGE && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105"
                }`}
              >
                Prev
              </button>
              <span className="text-white font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  currentPage === totalPages
                    ? "bg-gray-500 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;