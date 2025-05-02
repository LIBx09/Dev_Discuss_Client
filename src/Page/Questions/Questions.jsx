import { Link } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { motion } from "framer-motion";

const Questions = () => {
  const axiosSecure = useAxios();

  const {
    data: questions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/questions");
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto rounded-2xl shadow-2xl p-4"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            All Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mt-2 mb-4 rounded-full"></div>
          <p className="text-lg text-gray-300">
            Explore the most interesting questions from our community.
          </p>
        </div>

        {/* Questions List */}
        <div className="grid gap-6">
          {isLoading ? (
            <LoadingPage />
          ) : isError ? (
            <p className="text-red-500 text-center">Error: {error.message}</p>
          ) : questions?.length > 0 ? (
            questions.map((question) => (
              <motion.div
                key={question._id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#1f1f2e] via-[#2a2850] to-[#302b63] p-6 rounded-xl shadow-lg border-pink-500 border-l-4 hover:scale-[1.01] transition-transform duration-300"
              >
                <Link to={`/questions/${question._id}`}>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:underline transition-colors">
                    {question.title}
                  </h3>
                </Link>
                <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-purple-400">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full font-semibold shadow">
                    {question.tag}
                  </span>
                  <span>
                    Date: <span className="text-purple-400">{question.date}</span>
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">No questions available.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Questions;