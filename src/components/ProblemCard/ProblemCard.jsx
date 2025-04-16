import { Code } from "lucide-react";
import { Link } from "react-router-dom";

const ProblemCard = ({ problem, isLocked = false }) => {
  const { _id, title, description, difficulty } = problem || {};
  
  const getBadgeColor = (level) => {
    switch (level) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  const CardWrapper = ({ children }) => {
    if (isLocked) {
      return (
        <div className="relative cursor-not-allowed">
          {children}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="bg-gray-800/80 text-white py-1 px-4 rounded-full flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">Locked</span>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <Link to={`/problemSolve/${_id}`} className="block">
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      <div className="bg-white shadow-md rounded-2xl my-3 p-5 hover:shadow-lg transition-all border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Code className="text-blue-600" size={22} />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${getBadgeColor(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{description}</p>
      </div>
    </CardWrapper>
  );
};

export default ProblemCard;