import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../../Page/Loading/LoadingPage";

const Home = () => {

  const {data:questions,isLoading}=useQuery({
    queryKey:['question'],
    queryFn:async()=>{
      const {data} = await axios(`https://dev-discuss-server-kappa.vercel.app/questions`)
      return data
    }
  })

  return (
    <div className="max-w-4xl mx-auto">
       <Marquee className="text-lg pb-2">
       A Collaborative Space for Developer Discussions | Share Your Dev Thoughts | Learn from Fellow Developers | 
</Marquee> 
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-blue-500 font">Welcome to DevDiscuss</h2>
        <p className="text-gray-600 mt-2 text-lg">Ask, answer, and explore coding questions.</p>

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
        <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
      </div>
      {/* Questions List */}
      <div className="space-y-4">
        {isLoading ? (
        <LoadingPage></LoadingPage>
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
                <span>Tag: {question.tag}</span>
                <span>Date: {question.date}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default Home;
