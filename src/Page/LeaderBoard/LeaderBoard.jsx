import { useContext, useEffect, useState } from "react";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { Medal } from "lucide-react";
import AuthContext from "../../Context/AuthContext";

const LeaderBoard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const customAxios = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setTopUsers([]);
    setCurrentUser(null);
    if (user?.email) {
      customAxios
        .get(`/leaderboard?email=${user.email}`)
        .then((res) => {
          setTopUsers(res.data.topUsers);
          setCurrentUser(res.data.currentUser);
        })
        .catch((err) => console.error("Leaderboard fetch error:", err));
    }
  }, [user?.email]);

  return (
    <section className="w-full min-h-screen px-4 py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text flex items-center justify-center gap-2">
            <Medal className="w-8 h-8 text-pink-500" /> Top Performers
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            Celebrate the highest achievers in our DevDiscuss community!
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Current User */}
        {currentUser && (
          <div className="rounded-xl p-6 shadow-xl border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-purple-400 mb-4">
              Your Position
            </h3>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentUser.photo || "https://i.ibb.co/vXBkM2q/avatar.png"}
                  className="w-12 h-12 rounded-full border-2 border-pink-400"
                  alt="your-avatar"
                />
                <div>
                  <p className="font-semibold text-pink-500">{currentUser.userName}</p>
                  <p className="text-sm text-gray-400">{currentUser.userEmail}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-purple-400">
                  Rank: {currentUser.rank}
                </p>
                <p className="text-sm text-gray-300">{currentUser.points} pts</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        <div>
          <h3 className="text-xl font-bold">
            Top Positions
          </h3>
          <div className="space-y-4">
            {topUsers.map((user, idx) => (
              <div
                key={user.userEmail}
                className="rounded-xl p-4 shadow-lg border-l-4 border-indigo-500 flex items-center justify-between hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.photo || "https://i.ibb.co/vXBkM2q/avatar.png"}
                    className="w-10 h-10 rounded-full border-2 border-purple-400"
                    alt="user-avatar"
                  />
                  <div>
                    <p className="font-medium text-pink-500">{user.userName}</p>
                    <p className="text-sm text-gray-400">{user.userEmail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-300">Rank: {idx + 1}</p>
                  <p className="text-sm text-gray-300">{user.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderBoard;