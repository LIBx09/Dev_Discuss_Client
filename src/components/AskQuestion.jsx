import { useForm } from "react-hook-form";
import question from "../assets/Questions.png";
import useAxios from "../MainLayout/Shared/Hooks/useAxios";
import moment from "moment";
import Swal from "sweetalert2";

const AskQuestion = () => {
  const axios = useAxios();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const date = moment().format("MMM Do YY");
    const updateData = { ...data, date };
    axios
      .post("/questions", updateData)
      .then((res) => {
        reset();
        console.log(res.data);
        if (res.data.acknowledged) {
          // console.log("jj");
          Swal.fire({
            title: "Success",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="flex  justify-between">
        <h2 className="md:text-3xl md:pt-6 pt:0 font-semibold text-lg">
          Ask a public question
        </h2>
        <img className="h-28 w-80  hidden md:block" src={question} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend md:text-xl text-md">Title</legend>
          <p className="fieldset-label">
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            {...register("title", { required: true })}
            type="text"
            required
            className="input w-full"
            placeholder="Enter a title for your question"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend md:text-xl text-md">Body</legend>
          <p className="fieldset-label">
            Include all the information someone would need to answer your
            question
          </p>
          <textarea
            {...register("body", { required: true })}
            required
            className="textarea min-h-60 w-full row-span-12"
            placeholder="Enter a body for your question"
          ></textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend md:text-xl text-md">Tags</legend>
          <p className="fieldset-label">
            Add tags to describe what your question is about
          </p>
          <select
            {...register("tag", { require: true })}
            defaultValue="default"
            required
            className="select select-md w-full"
          >
            <option disabled={true}>Category</option>
            <option>React.js</option>
            <option>Javascript</option>
            <option>Next.js</option>
            <option>redux</option>
            <option>Node.js</option>
            <option>Express.js</option>
            <option>Firebase</option>
            <option>Tailwind CSS</option>
            <option>MongoDB</option>
            <option>typescript</option>
            <option>JWT</option>
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
