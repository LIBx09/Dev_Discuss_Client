import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import LoadingPage from '../Loading/LoadingPage';
import { BsThreeDots } from "react-icons/bs";
import AuthContext from '../../Context/AuthContext';
import Swal from 'sweetalert2';
const ManageUser = () => {
    const {user}=useContext(AuthContext)
    const email = user?.email
    const {data:users,isLoading,refetch}=useQuery({
        queryKey:["userManage"],
        queryFn:async()=>{
            const {data} = await axios.get(`http://localhost:5000/usersAll`)
            return data
        }
    })
    const handleAction = async (action) => {
        console.log(action)
        if(action === 'updateRole'){
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to make her admin!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "make admin!"
            });
            
            if (result.isConfirmed) {
                const res = await axios.patch(`http://localhost:5000/userRole/update/${email}`);
                console.log(res.data);
                await refetch(); // Important 🔥
                Swal.fire('Success!', 'Role updated to Admin!', 'success'); // Optional success msg
            }
        }
    
        if(action === 'removeUser'){
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to remove her!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "remove user!"
            });
            
            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:5000/userRemove/${email}`);
                console.log(res.data);
                await refetch(); // Important 🔥
                Swal.fire('Success!', 'user removed'); 
            }
        }
        if(action === 'updateMembership'){
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to update her plans!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "upgrade plan!"
            });
            
            if (result.isConfirmed) {
                const res = await axios.patch(`http://localhost:5000/userMembership/update/${email}`);
                console.log(res.data);
                await refetch(); // Important 🔥
                Swal.fire('Success!', 'Membership upgraded to Premium!', 'success'); // Optional success msg
            }
        }

    }
    
    if(isLoading){
        return <LoadingPage></LoadingPage>
    }
    return (
        <div>
         <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>member</th>
        <th>Action</th>
     
      </tr>
    </thead>
    <tbody>
 
    {
        users?.map(user=>  <tr key={user._id}>
      
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={user?.photo ?user?.photo:'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}
                      alt="user img" />
                  </div>
                </div>
             
              </div>
            </td>
            <td>
          {user?.userName?user?.userName: <p className='text-red-600'>Not Found</p>}
            </td>
            <td>
                {
                    user?.userEmail?user.userEmail :<p className='text-red-600'>Not Found</p>
                }
            </td>
        <td>
            {user?.role?user?.role:<p className='text-red-600'>Not found</p>}
        </td>
        <td>
            {user?.member?user?.member:<p className='text-red-600'>Not found</p>}
        </td>
        <td>
        <div className="dropdown  dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1"> <BsThreeDots /> </div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 backdrop-blur-2xl rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a onClick={()=>handleAction('updateRole')}>Make Admin</a></li>
    <li><a onClick={()=>handleAction('updateMembership')}>Update Membership</a></li>
    <li><a onClick={()=>handleAction('removeUser')}>Remove User</a></li>
  </ul>
</div>
        </td>
          </tr>)
    }
   
    
    
  
      
    </tbody>

  </table>
</div>
        </div>
    );
};

export default ManageUser;