import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { FaBars,  FaBookmark, FaCircleQuestion, FaUsers, FaRegBookmark, FaCode, FaBrain } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoMdPricetags } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { IoIosContact, IoIosHelpCircleOutline } from "react-icons/io";
import { RiFolderUnknowFill } from "react-icons/ri";
import DarkLightToggle from "../../../components/DarkLight/DarkLightToggle";
import AuthContext from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { button } from "@material-tailwind/react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({ title: "Success!", text: "You have successfully logged out!", icon: "success" });
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "Oops...", text: "There was a problem. Try again!" });
      });
  };

  return (
    <div className="navbar bg-base-100 border-b border-b-gray-300 px-4">
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
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
        
            <li>
              <Link to={"/blogs"}>Blogs</Link>
            </li>
            <li>
              <Link to={"/add-blogs"}>Add Blogs</Link>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/contactUs">Contact Us</Link>
            </li>
        {
          user?<button className="btn" onClick={handleLogout}>Logout</button>:<Link to={'/login'}>
          <button className="btn" >login</button>
          </Link>
        }
          </ul>
        </div>
     
      
      </div>
      

      
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-base-300 shadow-md z-10">
          <ul className="menu p-3">
            <li><Link to="/"> <AiFillHome className="text-lg" /> Home </Link></li>
            <li><Link to="/questions"> <FaCircleQuestion className="text-lg" /> Questions </Link></li>
            <li><Link to="/tags"> <IoMdPricetags className="text-lg" /> Tags </Link></li>
            <li><Link to="/saves"> <FaBookmark className="text-lg" /> Saves </Link></li>
            <li><Link to="/blogs"> <TbLogs className="text-lg" /> Blogs </Link></li>
            <li><Link to="/events"> <MdEventNote className="text-lg" /> Events </Link></li>
            <li><Link to="/users"> <FaUsers className="text-lg" /> Users </Link></li>
            <li><Link to="/twinAI"> <FaBrain  className="text-lg" /> TwinAI </Link></li>
            <li><Link to="/aboutUs"> <RiFolderUnknowFill className="text-lg" /> About Us </Link></li>
            <li><Link to="/contactUs"> <IoIosContact className="text-lg" /> Contact Us </Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
