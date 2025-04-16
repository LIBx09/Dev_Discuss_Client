
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuizCard = () => {
    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-blue-400 transition-all duration-300 border-t-4 border-blue-600 max-w-sm mx-auto">
            <div className="flex items-center gap-4 mb-4">
                <div className="text-blue-600 text-3xl">
                    <FaQuestionCircle />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Quiz Challenge</h2>
                    <p className="text-sm text-gray-500">Test your knowledge with MCQs</p>
                </div>
            </div>
            <p className="text-gray-700 mb-4">
                Take this timed quiz to assess your core concepts. Earn badges based on your score!
            </p>
      <Link to={'/QuizPage'}>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Start Now
            </button>
      </Link>
        </div>
    );
};

export default QuizCard;
