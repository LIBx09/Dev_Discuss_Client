import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import LoadingPage from "../Loading/LoadingPage";
import SingleShortQuestion from "../../components/ShortQuestionSingleCard/SingleShortQuestion";
import { BookOpen, Lock, Unlock,  Code, RotateCcw, Zap } from "lucide-react";

const ShortQuestions = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [showLocked, setShowLocked] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["shortQuestion", email],
    queryFn: async () => {

      const res = await axios.get(`https://dev-discuss-server-chi.vercel.app//shortQ?email=${email}`);

      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;


  const questions = data?.result || [];
  const totalQuestions = data?.totalQuestion || 0;
  const currentSolveIndex = data?.currentSolveIndex || 0;


  const unlockedQuestions = questions.filter((_, index) => index <= currentSolveIndex);
  const lockedQuestions = questions.filter((_, index) => index > currentSolveIndex);
  
  const questionsToShow = showLocked ? lockedQuestions : unlockedQuestions;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Zap className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Dev Challenges <Code className="w-5 h-5 text-blue-600" />
            </h1>
            <p className="text-gray-600 text-sm">Challenge your skills. Unlock badges.</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 bg-gray-100 p-2 rounded-full">
          <button
            onClick={() => setShowLocked(false)}
            className={`flex items-center gap-2 px-4 py-1 rounded-full transition text-sm ${
              !showLocked ? "bg-white text-blue-600 font-semibold" : "text-gray-600"
            }`}
          >
            <Unlock className="w-4 h-4" /> Available
          </button>
          <button
            onClick={() => setShowLocked(true)}
            className={`flex items-center gap-2 px-4 py-1 rounded-full transition text-sm ${
              showLocked ? "bg-white text-blue-600 font-semibold" : "text-gray-600"
            }`}
          >
            <Lock className="w-4 h-4" /> Locked
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard icon={<BookOpen className="text-green-600" />} label="Total" value={totalQuestions} />
        <StatsCard icon={<Unlock className="text-blue-600" />} label="Available" value={unlockedQuestions.length} />
        <StatsCard icon={<Lock className="text-red-600" />} label="Locked" value={lockedQuestions.length} />
      </div>

      {/* Title + Switch View */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {showLocked ? <Lock className="text-red-500 w-5 h-5" /> : <Unlock className="text-green-500 w-5 h-5" />}
          {showLocked ? "Locked" : "Available"} Challenges
        </h2>
        <button
          onClick={() => setShowLocked(!showLocked)}
          className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-4 h-4" /> Switch View
        </button>
      </div>

     
      {questionsToShow.length ? (
        <div className="grid gap-4">
          {questionsToShow.map((q, index) => (
            <SingleShortQuestion 
              key={q._id} 
              data={{
                ...q,
                isLocked: showLocked 
              }} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-10 bg-gray-50 rounded-lg">
          No {showLocked ? "locked" : "available"} questions found.
        </div>
      )}
    </div>
  );
};

// Reusable stats card component
const StatsCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default ShortQuestions;