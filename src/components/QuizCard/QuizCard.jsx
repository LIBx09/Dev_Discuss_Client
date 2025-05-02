// src/components/QuizCard.jsx
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuizCard = () => {
  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-2xl rounded-2xl p-6 md:p-8 hover:shadow-blue-500 transition-all duration-300 border-t-4 border-blue-500 max-w-sm mx-auto">
      <div className="flex items-center gap-4 mb-5">
        <div className="text-4xl text-blue-400">
          <FaQuestionCircle />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Quiz Challenge</h2>
          <p className="text-sm text-gray-300">Test your knowledge with MCQs</p>
        </div>
      </div>

      <p className="text-gray-200 mb-6 text-sm leading-relaxed">
        Take this timed quiz to assess your core concepts. Earn badges based on your score!
      </p>

      <Link to="/QuizPage">
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-xl bg-pink-500 hover:bg-pink-600 px-4 ">
          Start Now
        </button>
      </Link>
    </div>
  );
};

export default QuizCard;