import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import noData from "../../assets/saves_iamge/No-Data.png";

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

  // Handle bookmark deletion
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
              refetch(); // refetch the saved data after deletion
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
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold pb-4">All bookmarks</h3>
        <Link to="/questions">
          <h3 className="text-blue-500 cursor-pointer pb-3 hover:underline">View questions</h3>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading bookmarks...</p>
      ) : saveData?.length > 0 ? (
        saveData.map((item) => (
          <div key={item._id} className="p-4 shadow-md my-4">
            <Link to={`/questions/${item.questionID}`}>
              <h2 className="text-2xl font-bold text-blue-600">{item.title}</h2>
              <p className="mt-2 text-gray-700 hover:text-blue-500">{item.body}</p>
            </Link>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div>
                <span>{item.tag}</span> | <span>{item.date}</span>
              </div>
              <button
                onClick={() => handleDelete(item.questionID)}
                className="text-md text-red-500 hover:bg-gray-100 p-3 rounded-sm"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <img className="md:h-96 md:w-96" src={noData} alt="No Data" />
          </div>
          <p>You have not bookmarked any questions yet.</p>
        </div>
      )}
    </div>
  );
};

export default Saves;