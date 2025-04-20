import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import noQuestionImg from "../../assets/myProfile_image/missing-person-flat-illustration_120816-12662.jpg"
import { AiOutlineLike } from "react-icons/ai";
import BarCharts from "../../components/BarChart/BarCharts";

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
    const { data: pointsBreakdown = {} } = useQuery({
        queryKey: ["pointsBreakdownData"],
        queryFn: async () => {
            const { data } = await axios(`/users/points-breakdown?email=${user.email}`);
            // console.log("Fetched Points Breakdown:", data);
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
                <div className="flex items-center justify-center gap-2">
                    <img className="h-12 w-12 rounded-full" src={user?.photoURL} alt="userPhoto" />
                    <h3> {user?.displayName}</h3>
                </div>
                <Link to="/askQuestion"><p className="text-blue-500 hover:underline">Ask a question</p></Link>
            </div>
            <p className="pt-5 text-gray-600 dark:text-gray-200"> Earn 3 points for each post, 2 for every comment, and 1 when you like others’ posts—your activity is your honor here! Stay active and boost your community impact</p>
            <div className="lg:flex items-center justify-between">
                <div class="bg-white dark:bg-slate-700 shadow-md rounded-xl p-5 w-full mx-auto flex-1">
                    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">📊 Points Breakdown</h2>
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex justify-between border-b pb-2">
                            <span className="dark:text-gray-200">📝 Posts </span>
                            <span class="font-bold text-blue-600 dark:text-gray-200">{pointsBreakdown.pointsBreakdown?.questions || 0} pts</span>
                        </li>
                        <li class="flex justify-between border-b pb-2">
                            <span className="dark:text-gray-200">💬 Comments </span>
                            <span class="font-bold text-blue-600 dark:text-gray-200">{pointsBreakdown.pointsBreakdown?.comments ||0} pts</span>
                        </li>
                        <li class="flex justify-between">
                            <span className="flex items-center justify-center gap-2 dark:text-gray-200"><AiOutlineLike className="text-xl" />Likes Given </span>
                            <span class="font-bold text-blue-600 dark:text-gray-200">{pointsBreakdown.pointsBreakdown?.likes || 0}pts</span>
                        </li>
                    </ul>
                    <div class="border-t mt-4 pt-2 flex justify-between font-semibold text-gray-900">
                        <span className="dark:text-gray-200">Total</span>
                        <span className="dark:text-gray-200">{pointsBreakdown?.totalPoints || 0} pts</span>
                    </div>
                </div>
                <div className="flex-1">
                   <BarCharts></BarCharts>
                </div>
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
