import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaBookmark, FaCircleQuestion, FaUsers } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { IoIosContact } from "react-icons/io";
import { RiFolderUnknowFill } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import DarkLightToggle from "../../../components/DarkLight/DarkLightToggle";
import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import Swal from "sweetalert2";


const Navbar = () => {

  const { user, logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
      .then(result => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully Logout!",
          icon: "success"
        });
      })
      .catch(error => {
        Swal.fire({
          icon: (error.message),
          title: "Oops...",
          text: "There is problem try again!",
        });
      })
  }


  const [isOpen, setIsOpen] = useState(false);


  return (

    <div className="navbar bg-base-100 border-b border-b-gray-300 px-4">
      {/* Navbar Start */}
    <div className="navbar bg-base-100 border-b border-b-gray-300">

      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-md md:text-xl">
        <FaCode />
          Dev_Discuss
        </Link>
      </div>

      {/* Navbar Center (Hidden in mobile, visible in larger screens) */}
      <div className="hidden lg:flex lg:navbar-center">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-xs px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-500">
            🔍
          </button>
        </div>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex gap-3">

        <div className="text-3xl">
          <IoIosHelpCircleOutline />
        </div>
        <div className="text-2xl">
          <FaRegBookmark />
        </div>
           {/* Profile Dropdown */}
           <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 border rounded-full">
              <img alt="Profile" src="" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile <span className="badge">New</span>
              </a>
            </li>
            <li>

              <Link to={"/blogs"}>Blogs</Link>
            </li>
            <li>
              <Link to={"/add-blogs"}>Add Blogs</Link>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>


              <a>Settings</a>

              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/contactUs">Contact Us</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost -ml-4 text-md md:text-xl">
          Dev_Discuss
        </Link>
        <div className=" hidden lg:flex md:ml-30">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <Link to={"/blogs"}>Blogs</Link>
            </li>
            <li>
              <Link to={"/add-blogs"}>Add Blogs</Link>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/contactUs">Contact Us</Link>
            </li>
            <li>
              {user ? (
                <button className="btn">Logout</button>
              ) : (
                <Link to="/login">
                  <button className="btn">Login</button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Menu (Hidden in larger screens) */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-base-100 shadow-md z-10">
          <ul className="menu p-3">
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/" className="flex items-center gap-2 w-full">
                <AiFillHome className="text-lg" /> Home
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/questions" className="flex items-center gap-2 w-full">
                <FaCircleQuestion className="text-lg" /> Questions
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/tags" className="flex items-center gap-2 w-full">
                <IoMdPricetags className="text-lg" /> Tags
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/saves" className="flex items-center gap-2 w-full">
                <FaBookmark className="text-lg" /> Saves
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/blogs" className="flex items-center gap-2 w-full">
                <TbLogs className="text-lg" /> Blogs
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/events" className="flex items-center gap-2 w-full">
                <MdEventNote className="text-lg" /> Events
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/users" className="flex items-center gap-2 w-full">
                <FaUsers className="text-lg" /> Users
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/aboutUs" className="flex items-center gap-2 w-full">
                <RiFolderUnknowFill className="text-lg" /> About Us
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <Link to="/contactUs" className="flex items-center gap-2 w-full">
                <IoIosContact className="text-lg" /> Contact Us
              </Link>
            </li>
          </ul>
      <div className="navbar-end">
        <div className="mr-4">
          <DarkLightToggle />
        </div>
        <div className="flex gap-2">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="absolute top-1/2 right-2 transform -translate-y-1/2  text-white px-4 py-1 rounded-lg hover:bg-yellow-500">
              🔍
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 border rounded-full">
                <p>{user?.displayName}</p>
                <img alt="pro" src="" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>

              <li>
                {user ? (
                  <Link onClick={handleLogout} className="btn">
                    Logout
                  </Link>
                ) : (
                  <Link to={"/login"} className="btn">Login</Link>

                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
