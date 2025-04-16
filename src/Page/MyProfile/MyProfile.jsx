import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import noQuestionImg from "../../assets/myProfile_image/missing-person-flat-illustration_120816-12662.jpg"


const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axios = useAxios();
    const { data: questions = [], refetch } = useQuery({
        queryKey: ["userQuestions"],
        queryFn: async () => {
            const { data } = await axios(`/userQuestions?email=${user?.email}`)
            return data;
        }
    });

    const handleDelete = (_id) => {
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
                axios.delete(`/userQuestions/${_id}?email=${user?.email}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.result.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }

                    })
                    .catch(error => { console.log(error); })
            }
        });
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-center font-semibold md:text-2xl text-xl">Welcome {user?.displayName}</h1>
                <Link to="/askQuestion"><p className="text-blue-500 hover:underline">Ask a question</p></Link>
            </div>
            <div className="flex items-center justify-around shadow-md py-8">
                <div className="shadow-md ">
                    <img className="rounded-full h-12 w-12 mx-auto my-4" src={user?.photoURL} alt="userPhoto" />
                    <p className="text-center">{user?.displayName}</p>
                    <p className="text-center p-2">{user?.email}</p>
                </div>
                <div className={questions.length > 0 ? "block" : "hidden"}><img className="md:h-60 w-60" src={noQuestionImg} alt="noQuestionImg" /></div>
            </div>
            {
                questions.length > 0 ?

                    <div>
                        <h3 className="md:text-2xl text-xl font-semibold text-center pt-8">My questions</h3>
                        {
                            questions.map(item => <div key={item._id}>
                                <div className=" p-3 rounded-lg shadow-sm my-2">
                                    <Link
                                        to={`/questions/${item._id}`}
                                        className="text-blue-500 hover:text-blue-800 font-medium flex justify-between">
                                        {item.title}
                                    </Link>
                                    <div className="mt-4 text-sm text-gray-500 flex items-center justify-between w-full">
                                        <div>
                                            <span>Tag: {item.tag}</span> | <span>{item.date}</span>
                                        </div>
                                        <button onClick={() => handleDelete(item._id)} className="text-md text-red-500 hover:bg-gray-100 p-3 rounded-sm"><FaTrash></FaTrash></button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    :
                    <div>
                        <p className="text-center pt-8">You have not added any questions yet</p>
                        <div className="flex items-center justify-center"><img className="md:h-60 w-60" src={noQuestionImg} alt="noQuestionImg" /></div>
                    </div>

            }
        </div>
    );
};

export default MyProfile;
