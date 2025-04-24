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
            customAxios.get(`/leaderboard?email=${user.email}`)
                .then(res => {
                    setTopUsers(res.data.topUsers);
                    setCurrentUser(res.data.currentUser);
                })
                .catch(err => console.error("Leaderboard fetch error:", err));
        }
    }, [user?.email]);


    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-700  dark:text-blue-400 flex items-center gap-2 mb-6">
                <Medal className="text-blue-500" /> Top Performers
            </h2>
            {currentUser && (
                <div className="mt-8 border-t py-6">
                    <h3 className="text-blue-800 dark:text-blue-500 font-bold text-lg mb-3">Your Position</h3>
                    <div className="flex items-center justify-between bg-blue-100 dark:bg-slate-500 border-l-4 border-blue-600 px-6 py-4 rounded-lg shadow">
                        <div className="flex items-center gap-4">
                            <img
                                src={currentUser.photo || "https://i.ibb.co/vXBkM2q/avatar.png"}
                                className="w-10 h-10 rounded-full border-2 border-blue-400"
                                alt="your-avatar"
                            />
                            <div>
                                <p className="font-medium text-gray-800 dark:text-gray-100">{currentUser.userName}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-200">{currentUser.userEmail}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-blue-700 dark:text-gray-100">Rank: #{currentUser.rank}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-100">{currentUser.points} pts</p>
                        </div>
                    </div>
                </div>
            )}
            {/* Leaderboard List */}
            <h3 className="text-blue-800 dark:text-blue-500  font-bold text-lg mb-3">Top Position</h3>
            <div className="bg-white dark:bg-slate-900  rounded-2xl">
                {topUsers.map((user, idx) => (
                    <div
                        key={user.userEmail}
                        className="py-4"
                    >
                        <div className="flex items-center justify-between border-l-4 dark:bg-slate-700 border-blue-600 px-6 py-4 rounded-lg shadow">
                            <div className="flex items-center gap-4">
                                <img
                                    src={user.photo || "https://i.ibb.co/vXBkM2q/avatar.png"}
                                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                                    alt="your-avatar"
                                />
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-100">{user.userName}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-200">{user.userEmail}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-blue-700 dark:text-gray-100">Rank: #{idx + 1}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-100">{user.points} pts</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderBoard;
