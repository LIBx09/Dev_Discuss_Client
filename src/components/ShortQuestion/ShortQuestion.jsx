// src/components/ShortQuestionCard.jsx
import { BsLightningCharge } from "react-icons/bs";
import { Link } from "react-router-dom";

const ShortQuestionCard = () => {
  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-2xl rounded-2xl p-6 md:p-8 hover:shadow-blue-500 transition-all duration-300 border-t-4 border-blue-500 max-w-sm mx-auto">
      <div className="flex items-center gap-4 mb-5">
        <div className="text-4xl text-yellow-400">
          <BsLightningCharge />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Short Q&A Sprint</h2>
          <p className="text-sm text-gray-300">Rapid-fire theoretical questions</p>
        </div>
      </div>

      <p className="text-gray-200 mb-6 text-sm leading-relaxed">
        Sharpen your core concepts with quick answer challenges. Perfect for brushing up your knowledge.
      </p>

      <Link to="/shortQuestions">
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-xl bg-pink-500 hover:bg-pink-600 px-4 ">
          Start Now
        </button>
      </Link>
    </div>
  );
};

export default ShortQuestionCard;