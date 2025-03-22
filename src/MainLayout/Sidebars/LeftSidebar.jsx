import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBookmark, FaCircleQuestion, FaUsers } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { TbLogs } from "react-icons/tb";

const LeftSidebar = () => {
  return (
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
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
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
        </ul>
      </div>
      <div className="h-full py-6 px-4 hidden md:block">
        <ul className="space-y-3">
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
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
