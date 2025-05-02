import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import noData from "../../assets/saves_iamge/No-Data.png";
import { motion } from "framer-motion";
import LoadingPage from "../Loading/LoadingPage";

const Saves = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const {
    data: saveData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["saves", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`/saves?email=${user?.email}`);
      return data;
    },
  });

  const handleDelete = (questionID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/saves/${questionID}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your bookmark has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error("Error deleting bookmark:", error);
          });
      }
    });
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Saved Bookmarks
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mt-2 mb-4 rounded-full"></div>
          <p className="text-lg text-gray-300">
            Easily access and manage your bookmarked questions.
          </p>
        </div>
        {/* Bookmarks List */}
        {isLoading ? (
          <LoadingPage />
        ) : saveData?.length > 0 ? (
          <div className="grid gap-6">
            {saveData.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl shadow-lg hover:shadow-2xl border-l-4 border-pink-500 transition-transform"
              >
                <Link to={`/questions/${item.questionID}`}>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:underline transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-300 hover:text-white transition-colors">
                    {item.body}
                  </p>
                </Link>
                <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-400">
                  <div>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-semibold shadow">
                      {item.tag}
                    </span>{" "}
                    | <span>{item.date}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(item.questionID)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img className="md:h-96 md:w-96 mx-auto" src={noData} alt="No Bookmarks" />
            </div>
            <p className="text-gray-400 mt-4">You have not bookmarked any questions yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Saves;