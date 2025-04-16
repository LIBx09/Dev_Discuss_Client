import { Lock } from "lucide-react"; // Import Lock icon for locked questions
import { Link } from "react-router-dom";

const SingleShortQuestion = ({ data }) => {
  const { topic, level, question, isLocked ,_id} = data;

  return (
    <div 
      className={`bg-white dark:bg-[#1e1e1e] shadow-md ${isLocked ? '' : 'hover:shadow-xl'} transition-shadow duration-300 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between gap-4 relative ${
        isLocked ? 'cursor-not-allowed opacity-75' : ''
      }`}
    >
   
      {isLocked && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <Lock className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
            <p className="text-gray-700 dark:text-gray-300 font-medium">Complete previous challenges to unlock</p>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full capitalize">
            {topic}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
              level === "beginner"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : level === "intermediate"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {level}
          </span>
        </div>
        <p className={`text-sm text-gray-800 dark:text-gray-100 font-medium ${isLocked ? 'select-none' : ''}`}>
          {question}
        </p>
      </div>

<Link to={`/shortQSolve/${_id}`}>

<button
        className={`mt-2 w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-sm font-semibold py-2 rounded-xl ${
          isLocked 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-[1.02] transition-transform duration-200'
        }`}
       
        disabled={isLocked}
      >
        {isLocked ? '🔒 Locked' : '🚀 Start Challenge'}
      </button>
</Link>
    </div>
  );
};

export default SingleShortQuestion;