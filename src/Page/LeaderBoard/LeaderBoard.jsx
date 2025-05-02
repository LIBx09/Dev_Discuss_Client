import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import LoadingPage from "../Loading/LoadingPage";

const ManageUser = () => {
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["userManage"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/usersAll");
      return data;
    },
  });

  const handleAction = async (action, email, id) => {
    const confirmActions = {
      updateRole: {
        title: "Are you sure?",
        text: "You want to make her admin!",
        confirmButtonText: "Make Admin!",
        request: () => axios.patch(`http://localhost:3000/userRole/update/${email}`),
        successText: "Role updated to Admin!",
      },
      removeUser: {
        title: "Are you sure?",
        text: "You want to remove her!",
        confirmButtonText: "Remove User!",
        request: () => axios.delete(`http://localhost:3000/userRemove/${id}`),
        successText: "User removed!",
      },
      updateMembership: {
        title: "Are you sure?",
        text: "You want to update her plans!",
        confirmButtonText: "Upgrade Plan!",
        request: () => axios.patch(`http://localhost:3000/userMembership/update/${email}`),
        successText: "Membership upgraded to Premium!",
      },
    };

    const actionData = confirmActions[action];
    const result = await Swal.fire({
      title: actionData.title,
      text: actionData.text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8e44ad",
      cancelButtonColor: "#d33",
      confirmButtonText: actionData.confirmButtonText,
    });

    if (result.isConfirmed) {
      await actionData.request();
      await refetch();
      Swal.fire("Success!", actionData.successText, "success");
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <section className="w-full min-h-screen px-4 py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Manage Users
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            Administer user roles, memberships, and access within DevDiscuss.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* User Cards */}
        {users?.length === 0 ? (
          <div className="p-6 text-center text-gray-300">No users found.</div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="rounded-xl p-4 shadow-lg border-l-4 border-pink-500 bg-white/5 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.photo || "https://i.ibb.co/vXBkM2q/avatar.png"}
                    className="w-12 h-12 rounded-full border-2 border-purple-400"
                    alt="user-avatar"
                  />
                  <div>
                    <p className="font-semibold text-pink-400">{user?.userName || "Not Found"}</p>
                    <p className="text-sm text-gray-400">{user?.userEmail || "Not Found"}</p>
                  </div>
                </div>
                <div className="text-left md:text-right space-y-1">
                  <p className="text-sm text-gray-300">Role: <span className="text-purple-400">{user?.role || "Not Found"}</span></p>
                  <p className="text-sm text-gray-300">Membership: <span className="text-purple-400">{user?.member || "Not Found"}</span></p>
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-sm btn-outline text-purple-400 border-pink-400 hover:bg-pink-500 hover:text-white">
                    <BsThreeDots />
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu rounded-box z-10 w-52 p-2 bg-white/10 backdrop-blur-md shadow-md border border-purple-500/20 text-sm">
                    <li>
                      <button onClick={() => handleAction("updateRole", user?.userEmail, user._id)}>
                        Make Admin
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleAction("updateMembership", user?.userEmail, user._id)}>
                        Upgrade Membership
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleAction("removeUser", user?.userEmail, user._id)}>
                        Remove User
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageUser;