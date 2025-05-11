import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const SingleShortQuestion = ({ data }) => {
  const { topic, level, question, isLocked, _id } = data;

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case "beginner":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100";
      case "intermediate":
        return "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200";
      case "advanced":
        return "bg-blue-300 text-blue-900 dark:bg-blue-700 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  return (
    <div
      className={`bg-[var(--background)] shadow-md ${
        isLocked ? "" : "hover:shadow-xl"
      } transition-shadow duration-300 p-5 rounded-2xl border border-[var(--text-color)]/20 flex flex-col justify-between gap-4 relative ${
        isLocked ? "cursor-not-allowed opacity-75" : ""
      }`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-[var(--background)]/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 border border-[var(--text-color)]/20">
          <div className="flex flex-col items-center">
            <Lock className="w-8 h-8 text-[var(--text-color)] mb-2" />
            <p className="text-[var(--text-color)] font-medium">
              Complete previous challenges to unlock
            </p>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className="bg-[var(--button-bg)] text-[var(--button-text)] rounded-full text-xs font-semibold px-2 py-1 capitalize"
          >
            {topic}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${getLevelBadgeColor(
              level
            )}`}
          >
            {level}
          </span>
        </div>
        <p
          className={`text-sm text-[var(--text-color)] font-medium ${
            isLocked ? "select-none" : ""
          }`}
        >
          {question}
        </p>
      </div>

      <Link to={`/shortQSolve/${_id}`}>
        <button
          className={`btn w-full ${
            isLocked
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-[1.02] transition-transform duration-200"
          }`}
          disabled={isLocked}
        >
          {isLocked ? "🔒 Locked" : "🚀 Start Challenge"}
        </button>
      </Link>
    </div>
  );
};

export default SingleShortQuestion;