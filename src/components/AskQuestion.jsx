import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import questionImg from "../assets/Questions.png";
import useAxios from "../MainLayout/Shared/Hooks/useAxios";
import moment from "moment";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";

const AskQuestion = () => {
  const customAxios = useAxios();
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const axios = useAxios();
  const navigate = useNavigate(); 
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        try {
          const res = await customAxios.get(`/users?email=${user.email}`);
          if (res.data?._id) {
            setUserId(res.data._id); 
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, [user]);

  const onSubmit = (data) => {
    const date = moment().format("MMM Do YY");
    const questionData = {
      ...data,
      date,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      likes: [],
      userId,
    };

    axios.post("/questions", questionData)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Success",
            text: "Your question has been added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            reset();
            navigate("/questions");
          });
        }
      })
      .catch(console.error);
  };

  return (
    <section className="min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Ask a Public Question
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Share detailed information to get better answers from the community.
            </p>
          </div>
          <img src={questionImg} alt="Ask Question" className="h-24 md:h-28" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6 rounded-2xl shadow-md shadow-purple-700/20 border border-gray-700">
          {/* Title */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-purple-300">Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter a title for your question"
              className="w-full px-4 py-3 rounded-md bg-transparent text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-sm text-gray-400 mt-1">Be specific and clear about your issue.</p>
          </div>

          {/* Body */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-purple-300">Body</label>
            <textarea
              {...register("body", { required: true })}
              rows={6}
              placeholder="Explain your question in detail..."
              className="w-full px-4 py-3 rounded-md bg-transparent text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <p className="text-sm text-gray-400 mt-1">Include all the information someone would need to answer your question.</p>
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-purple-300">Tags</label>
            <select
              {...register("tag", { required: true })}
              className="w-full px-4 py-3 rounded-md bg-slate-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="default"
              required
            >
              <option disabled value="default">Select a category</option>
              <option>HTML5</option>
              <option>CSS3</option>
              <option>Tailwind CSS</option>
              <option>JavaScript</option>
              <option>React JS</option>
              <option>Redux</option>
              <option>Firebase</option>
              <option>Node.js</option>
              <option>Express.js</option>
              <option>MongoDB</option>
              <option>JWT</option>
              <option>Next.js</option>
              <option>TypeScript</option>
            </select>
            <p className="text-sm text-gray-400 mt-1">Select a tag to categorize your question.</p>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
            >
              Submit Your Question
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AskQuestion;