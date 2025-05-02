import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingPage from '../Loading/LoadingPage';
import { BsThreeDots } from "react-icons/bs";
import Swal from 'sweetalert2';

const ManageUser = () => {
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["userManage"],
    queryFn: async () => {
      const { data } = await axios.get(`https://dev-discuss-server-chi.vercel.app/usersAll`);
      return data;
    },
  });

  const handleAction = async (action, email, id) => {
    const confirmActions = {
      updateRole: {
        title: "Are you sure?",
        text: "You want to make her admin!",
        confirmButtonText: "Make Admin!",
        request: () => axios.patch(`https://dev-discuss-server-chi.vercel.app/userRole/update/${email}`),
        successText: "Role updated to Admin!",
      },
      removeUser: {
        title: "Are you sure?",
        text: "You want to remove her!",
        confirmButtonText: "Remove User!",
        request: () => axios.delete(`https://dev-discuss-server-chi.vercel.app/userRemove/${id}`),
        successText: "User removed!",
      },
      updateMembership: {
        title: "Are you sure?",
        text: "You want to update her plans!",
        confirmButtonText: "Upgrade Plan!",
        request: () => axios.patch(`https://dev-discuss-server-chi.vercel.app/userMembership/update/${email}`),
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

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className=" mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Manage Users
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Administer user roles, memberships, and access within DevDiscuss.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl shadow-xl border border-purple-600/20 backdrop-blur-lg">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gradient-to-r from-purple-800 to-pink-600 text-white">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Image</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Name</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Email</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Role</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Membership</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white/5 divide-y divide-purple-500/10">
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-purple-900/20 transition-colors">
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-pink-400 object-cover"
                      src={user?.photo || "https://i.ibb.co/vXBkM2q/avatar.png"}
                      alt="User"
                    />
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 font-semibold text-pink-400 whitespace-nowrap">
                    {user?.userName || <span className="text-red-500">Not Found</span>}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{user?.userEmail || <span className="text-red-500">Not Found</span>}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{user?.role || <span className="text-red-500">Not Found</span>}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{user?.member || <span className="text-red-500">Not Found</span>}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* No Users */}
          {users?.length === 0 && (
            <div className="p-6 text-center text-gray-300">No users found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageUser;