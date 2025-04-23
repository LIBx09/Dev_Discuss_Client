import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLike } from "react-icons/ai";
import BarCharts from "../../components/BarChart/BarCharts";
import Badges from "./Badges";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axios = useAxios();

    const { data: pointsBreakdown = {} } = useQuery({
        queryKey: ["pointsBreakdownData"],
        queryFn: async () => {
            const { data } = await axios(`/users/points-breakdown?email=${user.email}`);
            return data;
        }
    });
    // console.log(pointsBreakdown.pointsBreakdown?.comments);


    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    <img className="h-12 w-12 rounded-full" src={user?.photoURL} alt="userPhoto" />
                    <h3> {user?.displayName}</h3>
                </div>

                <div class="flex items-center gap-4">
                    <Link to="/askQuestion"><p className="text-blue-500 hover:underline">Ask a question</p></Link>
                    <Link to="/myQuestions"><p className="text-blue-500 hover:underline">My questions</p></Link>
                </div>
            </div>
            <p className="pt-5 text-gray-600 dark:text-gray-200"> Earn 3 points for each post, 2 for every comment, and 1 when you like others’ posts—your activity is your honor here! Stay active and boost your community impact</p>
            <div className="lg:flex items-center justify-between">
                <div class="bg-white dark:bg-slate-700 shadow-md rounded-xl p-5 w-full mx-auto flex-1">
                    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">📊 Points Breakdown</h2>
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex justify-between border-b pb-2">
                            <span className="dark:text-gray-200">📝 Posts </span>
                            <span class="font-bold text-blue-600 dark:text-gray-200">{pointsBreakdown?.pointsBreakdown?.questions || 0} pts</span>
                        </li>
                        <li class="flex justify-between border-b pb-2">
                            <span className="dark:text-gray-200">💬 Comments </span>
                            <span class="font-bold text-blue-600 dark:text-gray-200">{pointsBreakdown?.pointsBreakdown?.comments || 0} pts</span>
                        </li>
                        <li class="flex justify-between">
                            <span className="flex items-center justify-center gap-2 dark:text-gray-200"><AiOutlineLike className="text-xl" />Likes Given </span>
                            <span class="font-bold text-blue-600 dark:text-gray-200">{pointsBreakdown?.pointsBreakdown?.likes || 0}pts</span>
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
            <Badges totalPoints={pointsBreakdown?.totalPoints || 0} />
        </div>
    );
};

export default MyProfile;
