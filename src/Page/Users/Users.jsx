import { useQuery } from "@tanstack/react-query";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import { motion } from "framer-motion";
import LoadingPage from "../Loading/LoadingPage";

const Users = () => {
  const axiosSecure = useAxios();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/usersAll");
      return data;
    },
  });

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
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Active Users
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-2 mb-4 rounded-full"></div>
          <p className="text-lg text-gray-300">
            Meet our amazing community members.
          </p>
        </div>

        {/* Users List */}
        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          <p className="text-red-500 text-center">Error: {error.message}</p>
        ) : users?.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {users.map((user) => (
              <motion.div
                key={user._id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl shadow-lg hover:shadow-purple-500/50 text-center border-t-4 border-pink-500"
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img
                    src={user.photo}
                    alt={user.userName}
                    className="w-full h-full rounded-full border-2 border-purple-500 shadow-lg object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-[#1f1f2e] rounded-full"></span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {user.userName}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{user.userEmail}</p>
                <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 hover:scale-105 transition-transform font-semibold rounded-full text-sm font-medium shadow-md">
                  Points: {user.points}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Users;