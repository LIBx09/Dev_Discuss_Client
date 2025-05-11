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
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="min-h-screen w-full px-4 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center">
          <h2 className="md:text-5xl text-4xl font-extrabold text-[var(--button-bg)]">
            Welcome to DevDiscuss
          </h2>
          <div className="flex items-center justify-center pt-4 text-[var(--text-color)]/70">
            <Marquee className="text-lg pb-2">
              A Collaborative Space for Developer Discussions | Share Your Dev
              Thoughts | Learn from Fellow Developers |
            </Marquee>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/askQuestion">
            <button className="btn px-6 py-3 hover:scale-105 transition-transform">
              Ask a Question
            </button>
          </Link>
          <Link to="/tags">
            <button className="btn px-6 py-3 hover:scale-105 transition-transform">
              Browse Tags
            </button>
          </Link>
        </div>

        {/* Recent Questions Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold flex items-center gap-2 mb-6 text-[var(--button-bg)]">
            <MdOutlineQuestionAnswer className="text-[var(--button-bg)] text-3xl" />
            Recent Questions
          </h3>

          {loading ? (
            <LoadingPage />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : currentQuestions.length > 0 ? (
            <div className="grid md:grid-cols-1 gap-6">
              {currentQuestions.map((question) => (
                <div
                  key={question._id}
                  className="bg-[var(--background)] p-6 rounded-xl shadow-md border-l-4 border-[var(--button-bg)] hover:scale-[1.01] transition-transform duration-300"
                >
                  <Link to={`/questions/${question._id}`}>
                    <h3 className="text-lg font-semibold text-[var(--text-color)] hover:underline mb-2">
                      {question.title}
                    </h3>
                  </Link>
                  <div className="flex justify-between text-sm text-[var(--text-color)]/70">
                    <span className="bg-[var(--button-bg)] text-[var(--button-text)] px-3 py-1 rounded-full">
                      {question.tag}
                    </span>
                    <span>{question.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-color)]/70">No questions available.</p>
          )}

          {/* Pagination */}
          {questions.length > QUESTIONS_PER_PAGE && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`btn rounded-full ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "hover:scale-105 transition-transform"
                }`}
              >
                Prev
              </button>
              <span className="text-[var(--text-color)] font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`btn rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-500 cursor-not-allowed"
                    : "hover:scale-105 transition-transform"
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