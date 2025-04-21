import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed

const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/userAll") // ✅ Replace with your actual backend URL
      .then((res) => {
        setUsersList(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Active Users</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading users...</p>
      ) : usersList.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {usersList.map((user, index) => (
            <div
              key={user._id || index}
              className="border p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={user.avatar || `https://i.pravatar.cc/100?u=${user.userEmail}`}
                alt={user.userName}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold">{user.userName}</h3>
              <p className="text-sm text-gray-500">
                ⭐ {user.points || 0} Reputation
              </p>
              <p className="text-xs text-gray-400">Email: {user.userEmail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;