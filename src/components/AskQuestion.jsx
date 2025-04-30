import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import question from "../assets/Questions.png";
import useAxios from "../MainLayout/Shared/Hooks/useAxios";
import moment from "moment";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const AskQuestion = () => {
  const customAxios = useAxios();
  const {user} = useContext(AuthContext);
 
    const [userId, setUserId] = useState("");
  const axios = useAxios();
  const navigate = useNavigate(); 
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        try {
          const res = await customAxios.get(`/users?email=${user.email}`);
          // console.log("Fetched user:", res.data);
          if (res.data?._id) {
            setUserId(res.data._id); 
          } else {
            console.log("User ID not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    if (user?.email) {
      fetchUser();
    }
  }, [user]);
  const onSubmit = (data) => {
    const date = moment().format("MMM Do YY");
    const updateData = {
      ...data,
      date,
      userName: user?.displayName,  
      userEmail: user?.email,       
      userPhoto: user?.photoURL,    
      likes: [],
      userId: userId
    };
    console.log(updateData);
    axios
      .post("/questions", updateData)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Success",
            text: "Your question has been added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            reset(); // ✅ Reset form after submission
            navigate("/questions"); // ✅ Redirect to All Questions page
          });
        }else if(res.data.message){
          toast.error(res.data.message)
        }
      })
     
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="md:text-3xl md:pt-6 pt-0 font-semibold text-lg">
          Ask a public question
        </h2>
        <img className="h-28 w-80 hidden md:block" src={question} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend md:text-xl text-md">Title</legend>
          <p className="fieldset-label dark:text-white">
            Be specific and imagine you're asking a question to another person
          </p>
          <input
            {...register("title", { required: true })}
            type="text"
            required
            className="input w-full dark:bg-slate-800"
            placeholder="Enter a title for your question"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend md:text-xl text-md">Body</legend>
          <p className="fieldset-label dark:text-white">
            Include all the information someone would need to answer your
            question
          </p>
          <textarea
            {...register("body", { required: true })}
            required
            className="textarea min-h-60 w-full dark:bg-slate-800 row-span-12"
            placeholder="Enter a body for your question"
          ></textarea>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend md:text-xl text-md">Tags</legend>
          <p className="fieldset-label dark:text-white">
            Add tags to describe what your question is about
          </p>
          <select
            {...register("tag", { require: true })}
            defaultValue="default"
            required
            className="select select-md w-full dark:bg-slate-800"
          >
            <option disabled={true}>Category</option>
            <option>HTML5</option>
            <option>CSS3</option>
            <option>Tailwind CSS</option>
            <option>Javascript</option>
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
        </fieldset>

        <button className="bg-blue-500 hover:bg-blue-700 rounded-sm text-white px-2 py-2 font-semibold mt-8">
          Add your Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
