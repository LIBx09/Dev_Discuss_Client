import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBookmark, FaCircleQuestion, FaUsers } from "react-icons/fa6";
import { IoIosContact, IoMdPricetags } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { FaBrain } from "react-icons/fa";
import { IoBug } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import useCheckAdmin from "../../Shared/Hooks/useCheckAdmin";
import { RiFolderUnknowFill } from "react-icons/ri";

const LeftSidebar = () => {
  const [isAdmin] = useCheckAdmin();
  return (
    <div className="h-full py-6 px-4 hidden lg:block">
      <ul className="space-y-3 text-pink-400">
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/" className="flex items-center gap-2 w-full">
            <AiFillHome className="text-lg" /> Home
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/tags" className="flex items-center gap-2 w-full">
            <IoMdPricetags className="text-lg" /> Tags
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/blogs" className="flex items-center gap-2 w-full">
            <TbLogs className="text-lg" /> Blogs
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/events" className="flex items-center gap-2 w-full">
            <MdEventNote className="text-lg" /> Events
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/twinAI" className="flex items-center gap-2 w-full">
            <FaBrain className="text-lg" /> TwinAI
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/fixFlow" className="flex items-center gap-2 w-full">
            <IoBug className="text-lg" /> FixFlow
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/users" className="flex items-center gap-2 w-full">
            <FaUsers className="text-lg" /> Users
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/aboutUs" className="flex items-center gap-2 w-full">
          <RiFolderUnknowFill/>  About Us
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-800 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/contactUs" className="flex items-center gap-2 w-full">
           <IoIosContact/> Contact Us
          </Link>
        </li>
      </ul>

      <div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/" className="flex items-center gap-2 w-full">
                <AiFillHome className="text-lg" /> Home
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/questions" className="flex items-center gap-2 w-full">
                <FaCircleQuestion className="text-lg" /> Questions
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/tags" className="flex items-center gap-2 w-full">
                <IoMdPricetags className="text-lg" /> Tags
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/saves" className="flex items-center gap-2 w-full">
                <FaBookmark className="text-lg" /> Saves
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/blogs" className="flex items-center gap-2 w-full">
                <TbLogs className="text-lg" /> Blogs
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/twinAI" className="flex items-center gap-2 w-full">
                <FaBrain className="text-lg" /> TwinAI
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/fixFlow" className="flex items-center gap-2 w-full">
                <IoBug className="text-lg" /> FixFlow
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/events" className="flex items-center gap-2 w-full">
                <MdEventNote className="text-lg" /> Events
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
              <Link to="/users" className="flex items-center gap-2 w-full">
                <FaUsers className="text-lg" /> Users
              </Link>
            </li>
            {isAdmin && (
              <li className="flex items-center gap-2 hover:bg-gray-900 hover:text-white p-2 rounded-md">
                <Link to="/settings" className="flex items-center gap-2 w-full">
                  <FiSettings className="text-lg" /> Settings
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;