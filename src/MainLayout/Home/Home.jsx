import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import Marquee from "react-fast-marquee";
import LoadingPage from "../../Page/Loading/LoadingPage";
import { fetchQuestions } from "../../redux/questionsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { questions, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="md:text-5xl text-4xl font-extrabold text-blue-500">Welcome to DevDiscuss</h2>

        <div className="flex items-center justify-center pt-2 text-gray-500">
            Ask, answer, and explore coding questions.
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
          ) : questions?.length > 0 ? (
            questions.map((question) => (
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
                  <span> {question.date}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;