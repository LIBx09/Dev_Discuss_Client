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
    },
  });

  return (
    <section className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between flex-wrap gap-y-6 mb-8">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL}
              alt="user"
              className="h-14 w-14 rounded-full border-2 border-purple-400 shadow-md"
            />
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              {user?.displayName}
            </h3>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link
              to="/askQuestion"
              className="text-purple-300 hover:text-pink-400 transition duration-200 underline-offset-2 hover:underline"
            >
              Ask a Question
            </Link>
            <Link
              to="/myQuestions"
              className="text-purple-300 hover:text-pink-400 transition duration-200 underline-offset-2 hover:underline"
            >
              My Questions
            </Link>
          </div>
        </div>

        {/* Points Description */}
        <p className="mb-8 text-gray-300 max-w-3xl leading-relaxed text-sm">
          Earn <span className="text-purple-400 font-bold">3 points</span> for each post,{" "}
          <span className="text-purple-400 font-bold">2 for every comment</span>, and{" "}
          <span className="text-purple-400 font-bold">1</span> when you like others’ posts.
          <br /> Your activity is your honor here — stay active and make an impact!
        </p>

        {/* Points Breakdown and Chart */}
        <div className="lg:flex gap-8">
          {/* Points Card */}
          <div className="rounded-2xl shadow-xl p-6 w-full flex-1 hover:shadow-purple-500/40 transition duration-300 ease-in-out">
            <h2 className="text-xl font-bold text-purple-300 mb-5">📊 Points Breakdown</h2>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span>📝 Posts</span>
                <span className="font-semibold text-blue-400">
                  {pointsBreakdown?.pointsBreakdown?.questions || 0} pts
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span>💬 Comments</span>
                <span className="font-semibold text-blue-400">
                  {pointsBreakdown?.pointsBreakdown?.comments || 0} pts
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <AiOutlineLike className="text-lg" />
                  Likes Given
                </span>
                <span className="font-semibold text-blue-400">
                  {pointsBreakdown?.pointsBreakdown?.likes || 0} pts
                </span>
              </li>
            </ul>
            <div className="mt-5 pt-3 border-t border-gray-700 flex justify-between font-semibold text-lg text-gray-200">
              <span>Total</span>
              <span>{pointsBreakdown?.totalPoints || 0} pts</span>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-10 lg:mt-0 flex-1">
            <BarCharts />
          </div>
        </div>

        {/* Badges */}
        <div className="mt-12">
          <Badges totalPoints={pointsBreakdown?.totalPoints || 0} />
        </div>
      </div>
    </section>
  );
};

export default MyProfile;