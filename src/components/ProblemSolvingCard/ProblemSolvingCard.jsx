import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProblemSolvingCard = () => {
  return (
    <div
      className="bg-[var(--background)] shadow-md rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-[var(--button-bg)] max-w-sm mx-auto"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="text-4xl text-[var(--button-bg)]">
          <FaCode />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-color)]">Code Battle Arena</h2>
          <p className="text-sm text-[var(--text-color)]/70">Real-time coding challenge</p>
        </div>
      </div>

      <p className="text-[var(--text-color)] mb-6 text-sm leading-relaxed">
        Solve algorithmic problems in a live code editor. Get AI-powered feedback and earn your dev badge!
      </p>

      <Link to="/problems">
        <button className="btn w-full hover:scale-105 transition-transform duration-300">
          Start Now
        </button>
      </Link>
    </div>
  );
};

export default ProblemSolvingCard;