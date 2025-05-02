import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import noQuestionImg from "../../assets/myProfile_image/missing-person-flat-illustration_120816-12662.jpg"
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const MyQuestions = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const { data: questions = [], refetch } = useQuery({
    queryKey: ["userQuestions"],
    queryFn: async () => {
      const { data } = await axios(`/userQuestions?email=${user?.email}`);
      return data;
    },
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8B5CF6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/userQuestions/${_id}?email=${user?.email}`)
          .then((res) => {
            if (res.data.result.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your question has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <section className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {questions.length > 0 ? (
          <div>
            <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8">
              My Questions
            </h3>

            <div className="space-y-6">
              {questions.map((item) => (
                <div
                  key={item._id}
                  className="p-5 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition transform hover:scale-105 duration-300"
                >
                  <Link
                    to={`/questions/${item._id}`}
                    className="text-lg font-semibold text-pink-400 hover:text-purple-400 transition"
                  >
                    {item.title}
                  </Link>
                  <div className="mt-3 flex justify-between items-center text-sm text-gray-300">
                    <div>
                      <span className="mr-2">🏷 Tag: {item.tag}</span> |{" "}
                      <span className="ml-2">📅 {item.date}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:bg-red-100 hover:text-red-700 p-2 rounded-full transition"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center mt-16">
            <p className="text-xl text-gray-300 mb-4">You haven't added any questions yet.</p>
            <img
              className="mx-auto w-60 h-auto rounded-xl shadow-md"
              src={noQuestionImg}
              alt="No questions"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default MyQuestions;