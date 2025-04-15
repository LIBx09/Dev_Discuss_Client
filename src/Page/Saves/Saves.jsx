<<<<<<< HEAD
import { useContext } from "react";
=======
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedQuestions } from "../../redux/saveSlice";
>>>>>>> dafe25064c0faf0b599eeae5a2a3b88b20cef328
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import noData from "../../assets/saves_iamge/No-Data.png"

const Saves = () => {
<<<<<<< HEAD
  // const [saveData, setSavedata] = useState([]);
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  // useEffect(() => {
  //   axios.get(`/saves?email=${user?.email}`)
  //     .then(res => {
  //       setSavedata(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, []);
  const { data: saveData = [], refetch } = useQuery({
    queryKey: ['saves'],
    queryFn: async () => {
      const { data } = await axios(`http://localhost:5000/saves?email=${user?.email}`)
      return data;
    }
  })
  const handleDelete = (questionID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("mm");
        console.log(result);
        axios.delete(`/saves/${questionID}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }

          })
          .catch(error => { console.log(error); })
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
      <h3 className=" pb-4"> All bookmarks</h3>
      <Link to="/questions"><h3 className=" text-blue-500 cursor-pointer pb-3 hover:underline">View questions</h3></Link>
      </div>
      {saveData?.length > 0 ? (
        saveData?.map((item) => (
          <div key={item._id}>
            <div className="p-4 shadow-md my-4">
              <Link to={`/questions/${item.questionID}`}>
                <h2 className="text-2xl font-bold text-blue-600">{item.title}</h2>
                <p className="mt-2 text-gray-700 hover:text-blue-500">{item.body}</p>
              </Link>
              <div className="flex items-center justify-between">
                <div className="mt-4 text-sm text-gray-500 flex items-center justify-between w-full">
                  <div>
                    <span>Tag: {item.tag}</span> | <span>{item.date}</span>
                  </div>
                  <button onClick={() => handleDelete(item.questionID)} className="text-md text-red-500 hover:bg-gray-100 p-3 rounded-sm"><FaTrash></FaTrash></button>
=======
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const { saveData, loading, error } = useSelector((state) => state.saves);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchSavedQuestions(user.email));
    }
  }, [dispatch, user?.email]);

  return (
    <div>
      <h3 className="text-2xl font-bold pb-4"> All bookmarks</h3>
      {loading && <p>Loading bookmarks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {saveData?.length > 0 ? (
        saveData.map((question) => (
      {saveData?.length > 0 ? (
        saveData?.map(question => (
          <Link to={`/questions/${question._id}`}>
            <div key={question._id}>
              <div className="p-4 shadow-md my-4">
                <h2 className="text-2xl font-bold text-blue-600">{question.title}</h2>
                <p className="mt-2 text-gray-700">{question.body}</p>
                <div className="flex items-center justify-between">
                  <div className="mt-4 text-sm text-gray-500">
                    <span>Tag: {question.tag}</span> | <span>{question.date}</span>
                  </div>
          <div key={question._id}>
            <div className="border p-4 rounded shadow">
              <h2 className="text-base font-semibold text-blue-600">{question.title}</h2>
              <p className="mt-2 text-gray-700 dark:bg-slate-900 dark:text-white">
                {question.body}
              </p>
              <div className="flex items-center justify-between">
                <div className="mt-4 text-sm text-gray-500">
                  <span>Tag: {question.tag}</span> | <span>{question.date}</span>
>>>>>>> dafe25064c0faf0b599eeae5a2a3b88b20cef328
                </div>
              </div>
            </div>
          </div>
        ))
<<<<<<< HEAD
      ) :
        <div>
          <div className="flex items-center justify-center"><img className="md:h-96 md:w-96" src={noData} alt="noData" /></div>
          <p className="text-center">You have not bookmarked any questions yet</p>
        </div>
      }
=======
      ) : !loading ? (
        <p>No bookmark question available.</p>
      ) : null}
>>>>>>> dafe25064c0faf0b599eeae5a2a3b88b20cef328
    </div>
  );
};

export default Saves;