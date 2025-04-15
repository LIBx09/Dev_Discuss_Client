import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../Loading/LoadingPage";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";

const Questions = () => {
const axios = useAxios()

const {data:questions,isLoading}=useQuery({
  queryKey:['question'],
  queryFn:async()=>{
    const {data} = await axios(`/questions`)
    return data
  }
})


  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold">All Questions</h2>
        <Link to="/askQuestion">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Ask a Question
          </button>
        </Link>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {isLoading ? (
        <LoadingPage></LoadingPage>
        ) : questions?.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <Link to={`/questions/${question._id}`}>
                <h3 className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer">
                  {question.title}
                </h3>
              </Link>
              <div className="flex gap-4 text-xs justify-between mt-1">
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
  );
};

export default Questions;
