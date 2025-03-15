import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBookmark, FaCircleQuestion, FaUsers } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { TbLogs } from "react-icons/tb";

const LeftSidebar = () => {

  return (
    <div className="h-full py-6 px-4 border-r border-gray-500">
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
  );
};

export default LeftSidebar;

    return (
        <div className="h-full py-6 px-4 border-r border-r-gray-500">
            <ul className="space-y-3">
                <li className="flex items-center gap-2 hover:bg-gray-100 "><span className="font-bold"><AiFillHome /></span>Home</li>
                <li className="flex items-center gap-2 hover:bg-gray-100"><span><FaCircleQuestion /></span>Questions</li>
                <li className="flex items-center gap-2 hover:bg-gray-100 pb-6"><span><IoMdPricetags /></span>Tags</li>
                <li className="flex items-center gap-2 hover:bg-gray-100"><span><FaBookmark /></span>Saves</li>
                <li className="flex items-center gap-2 hover:bg-gray-100"><span><TbLogs /></span>Blogs</li>
                <li className="flex items-center gap-2 hover:bg-gray-100 pb-6"><span><MdEventNote /></span>Event</li>
                <li className="flex items-center gap-2 hover:bg-gray-100"><span><FaUsers /></span>Users</li>
            </ul>
           
        </div>
    );
};

export default LeftSidebar;


