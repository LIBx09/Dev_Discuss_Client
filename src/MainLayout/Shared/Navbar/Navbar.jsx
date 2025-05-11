import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {
  FaBars,
  FaBookmark,
  FaCircleQuestion,
  FaUsers,
  FaRegBookmark,
  FaCode,
  FaBrain
} from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { IoMdPricetags } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { IoIosContact, IoIosHelpCircleOutline } from "react-icons/io";
import { RiFolderUnknowFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../redux/questionsSlice";
import DarkLightToggle from "../../../components/DarkLight/DarkLightToggle";
import AuthContext from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { FaRegUserCircle, FaTimes } from 'react-icons/fa';
import useCheckAdmin from "../Hooks/useCheckAdmin";
import { FiSettings } from "react-icons/fi";

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isAdmin] = useCheckAdmin();
  const [filteredResults, setFilteredResults] = useState([]);
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredResults([]);
    } else {
      const filtered = questions?.filter((q) =>
        q?.title?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredResults(filtered.slice(0, 5));
    }
  }, [search, questions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner" style={{ color: 'var(--button-bg)' }}></span>
      </div>
    );
  }

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged out!",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was a problem. Try again!",
        });
      });
  };

  return (
    <div className="relative" style={{ color: 'var(--button-bg)' }}>
      <div 
        className="navbar bg-transparent border-b-gray-300 px-4"
        style={{ background: 'var(--background)' }}
      >
        <div className="navbar-start">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="btn btn-ghost border-none lg:hidden py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-xl"
            style={{
              background: 'linear-gradient(to right, var(--button-bg), var(--button-hover-bg))',
              color: 'var(--button-text)'
            }}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <Link 
            to="/" 
            className="hidden sm:flex btn btn-ghost border-none text-md md:text-xl"
            style={{
              background: 'linear-gradient(to right, var(--button-bg), var(--button-hover-bg))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            <FaCode />
            Dev_Discuss
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden lg:flex lg:navbar-center relative flex-col items-start">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              background: 'var(--background)',
              color: 'var(--text-color)',
              borderColor: 'var(--button-bg)',
              '&:focus': {
                ringColor: 'var(--button-bg)'
              }
            }}
          />
          {search.trim() !== "" && (
            <div 
              className="absolute top-full left-0 w-full border mt-1 rounded shadow-lg z-50"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--button-bg)'
              }}
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((q) => (
                  <Link
                    to={`/questions/${q._id}`}
                    key={q._id}
                    className="block px-4 py-2 hover:opacity-80"
                    style={{ color: 'var(--text-color)' }}
                    onClick={() => {
                      setSearch("");
                      setIsOpen(false);
                    }}
                  >
                    {q.title}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2" style={{ color: 'var(--text-color)' }}>No matching questions found.</p>
              )}
            </div>
          )}
        </div>

        <div className="navbar-end flex items-center gap-3">
          <Link to="/questions" >
            <IoIosHelpCircleOutline className="text-2xl" />
          </Link>
          <DarkLightToggle />
          <Link to="/saves" >
            <FaRegBookmark className="text-xl" />
          </Link>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaRegUserCircle className="w-8 h-8"  />
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 -right-4 shadow-xl items-center space-y-3"
              style={{ background: 'var(--background)' }}
            >
              {user && <li><Link to="/myQuestion" style={{ color: 'var(--text-color)' }}>My questions</Link></li>}
              {user && <li><Link to="/myProfile" style={{ color: 'var(--text-color)' }}>Dashboard</Link></li>}
              {user && <li><Link to="/leaderboard" style={{ color: 'var(--text-color)' }}>Leaderboard</Link></li>}
              {isAdmin && <li><Link to="/settings" style={{ color: 'var(--text-color)' }}>settings</Link></li>}
              {user ? (
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="py-1 rounded-lg text-base font-semibold hover:scale-105 transition-transform duration-300 shadow-xl"
                    style={{
                      background: 'linear-gradient(to right, var(--button-bg), var(--button-hover-bg))',
                      color: 'var(--button-text)'
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <button 
                      className="w-full px-2 py-1 rounded-lg text-base font-semibold hover:scale-105 transition-transform duration-300 shadow-xl"
                      style={{
                        background: 'linear-gradient(to right, var(--button-bg), var(--button-hover-bg))',
                        color: 'var(--button-text)'
                      }}
                    >
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          className="lg:hidden absolute top-16 left-0 w-full shadow-md z-10"
          style={{ background: 'var(--background)' }}
        >
          <ul className="menu p-4 space-y-2">
            {[
              { to: "/", icon: <AiFillHome />, text: "Home" },
              { to: "/tags", icon: <IoMdPricetags />, text: "Tags" },
              { to: "/blogs", icon: <TbLogs />, text: "Blogs" },
              { to: "/add-blogs", icon: <MdEventNote />, text: "Add Blogs" },
              { to: "/events", icon: <MdEventNote />, text: "Events" },
              { to: "/users", icon: <FaUsers />, text: "Users" },
              { to: "/twinAI", icon: <FaBrain />, text: "TwinAI" },
              { to: "/aboutUs", icon: <RiFolderUnknowFill />, text: "About Us" },
              { to: "/contactUs", icon: <IoIosContact />, text: "Contact Us" }
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.to} 
                  style={{ color: 'var(--text-color)' }}
                >
                  {item.icon} {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;