import React from "react";

const Users = () => {
  // Sample users data
  const usersList = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/100?img=1",
      reputation: 1200,
      joined: "Jan 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/100?img=2",
      reputation: 950,
      joined: "Mar 2023",
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/100?img=3",
      reputation: 780,
      joined: "Dec 2022",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Active Users</h2>

      {usersList.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {usersList.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg shadow-md bg-gray-50 flex flex-col items-center">
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mb-2" />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">⭐ {user.reputation} Reputation</p>
              <p className="text-xs text-gray-400">Joined: {user.joined}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
