import React, { useEffect, useState } from "react";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";

const Users = () => {
  const customAxios = useAxios();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    customAxios.get("/usersAll")
      .then(res => {
        console.log(res.data);
        setUsers(res.data)
      })
  }, []);
  console.log(users);



  return (
    <div className=" max-w-4xl mx-auto border-t-8 border-t-blue-500 rounded-xl">
      <h2 className="text-2xl font-bold my-8 text-center">Active Users</h2>
      {users?.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users?.map((user) => (
            <div
            key={user._id}
            className="bg-white  p-6 rounded-xl border-t-8 border-t-blue-500 shadow-lg hover:scale-110  hover:shadow-blue-300 transition-all duration-300 flex flex-col items-center text-center max-w-sm w-full"
          >
            <div className="relative w-20 h-20 mb-4">
              <img
                src={user.photo}
                alt={user.userName}
                className="w-full h-full rounded-full border border-blue-500 shadow-[0_0_10px_#006eff] object-cover  hover:scale-110 transition-all duration-300"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
          
            <h3 className="text-xl font-semibold text-gray-800">{user?.userName}</h3>
            <p className="text-sm text-gray-500 mb-2">{user?.userEmail}</p>
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
              Points: {user.points}
            </div>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
