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
    <div 
      className="h-full py-6 px-4 hidden lg:block"
      style={{ background: 'var(--background)' }}
    >
      <ul className="space-y-3" style={{ color: 'var(--button-bg)' }}>
        {[
          { to: "/", icon: <AiFillHome className="text-lg" />, text: "Home" },
         
          { to: "/tags", icon: <IoMdPricetags className="text-lg" />, text: "Tags" },
          { to: "/blogs", icon: <TbLogs className="text-lg" />, text: "Blogs" },
          { to: "/events", icon: <MdEventNote className="text-lg" />, text: "Events" },
          { to: "/twinAI", icon: <FaBrain className="text-lg" />, text: "TwinAI" },
          { to: "/fixFlow", icon: <IoBug className="text-lg" />, text: "FixFlow" },
          { to: "/users", icon: <FaUsers className="text-lg" />, text: "Users" },
          { to: "/aboutUs", icon: <RiFolderUnknowFill />, text: "About Us" },
          { to: "/contactUs", icon: <IoIosContact />, text: "Contact Us" },
        ].map((item, index) => (
          <li 
            key={index}
            className="p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            style={{
              backgroundColor: 'var(--background)',
              '&:hover': {
                backgroundColor: 'var(--button-hover-bg)',
                opacity: 0.8
              }
            }}
          >
            <Link 
              to={item.to} 
              className="flex items-center gap-2 w-full"
              style={{ color: 'var(--text-color)' }}
            >
              {item.icon} {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile dropdown menu */}
      <div>
        <div className="dropdown">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden"
            style={{ color: 'var(--text-color)' }}
          >
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
            className="menu menu-sm dropdown-content z-1 mt-3 w-52 p-2 shadow"
            style={{ 
              background: 'var(--background)',
              color: 'var(--text-color)'
            }}
          >
            {[
              { to: "/", icon: <AiFillHome className="text-lg" />, text: "Home" },
              { to: "/questions", icon: <FaCircleQuestion className="text-lg" />, text: "Questions" },
              { to: "/tags", icon: <IoMdPricetags className="text-lg" />, text: "Tags" },
              { to: "/saves", icon: <FaBookmark className="text-lg" />, text: "Saves" },
              { to: "/blogs", icon: <TbLogs className="text-lg" />, text: "Blogs" },
              { to: "/twinAI", icon: <FaBrain className="text-lg" />, text: "TwinAI" },
              { to: "/fixFlow", icon: <IoBug className="text-lg" />, text: "FixFlow" },
              { to: "/events", icon: <MdEventNote className="text-lg" />, text: "Events" },
              { to: "/users", icon: <FaUsers className="text-lg" />, text: "Users" },
              ...(isAdmin ? [{ to: "/settings", icon: <FiSettings className="text-lg" />, text: "Settings" }] : [])
            ].map((item, index) => (
              <li 
                key={index}
                className="p-2 rounded-md"
                style={{
                  '&:hover': {
                    backgroundColor: 'var(--button-hover-bg)',
                    color: 'var(--button-text)'
                  }
                }}
              >
                <Link 
                  to={item.to} 
                  className="flex items-center gap-2 w-full"
                >
                  {item.icon} {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;