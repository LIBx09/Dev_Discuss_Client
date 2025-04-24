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

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);
  const navigate = useNavigate();
  const location = useLocation(); // detect route changes

  // Auto-close mobile menu when route changes
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
        <span className="loading loading-spinner text-blue-500"></span>
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
    <div className="relative">
      <div className="navbar bg-base-100 border-b border-b-gray-300 px-4 dark:bg-slate-900 dark:text-white">
        <div className="navbar-start">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost lg:hidden">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <Link to="/" className="btn btn-ghost text-md md:text-xl">
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
            className="w-full max-w-xs px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
          {search.trim() !== "" && (
            <div className="absolute top-full left-0 bg-white dark:bg-gray-800 w-full border mt-1 rounded shadow-lg z-50">
              {filteredResults.length > 0 ? (
                filteredResults.map((q) => (
                  <Link
                    to={`/questions/${q._id}`}
                    key={q._id}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSearch("");
                      setIsOpen(false);
                    }}
                  >
                    {q.title}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No matching questions found.</p>
              )}
            </div>
          )}
        </div>

        <div className="navbar-end flex items-center gap-3">
          <Link to="/questions">
            <IoIosHelpCircleOutline className="text-2xl" />
          </Link>
          <DarkLightToggle />
          <Link to="/saves">
            <FaRegBookmark className="text-xl" />
          </Link>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <FaRegUserCircle className="w-12 h-12 text-gray-600" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 -right-4 shadow-xl dark:bg-gray-800 items-center space-y-3"
            >
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/add-blogs">Add Blogs</Link></li>
              <li><Link to="/aboutUs">About Us</Link></li>
              <li><Link to="/contactUs">Contact Us</Link></li>
              {user && <li><Link to="/myQuestion">My questions</Link></li>}
              {user && <li><Link to="/myProfile">Dashboard</Link></li>}
              {user && <li><Link to="/leaderboard">Leaderboard</Link></li>}
              {user ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li>
                  <Link to="/login"><button className=" w-full">Login</button></Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-base-300 shadow-md z-10 dark:bg-gray-800 transition-all duration-300">
          <ul className="menu p-4 space-y-2">
            <li><Link to="/"><AiFillHome /> Home</Link></li>
            <li><Link to="/questions"><FaCircleQuestion /> Questions</Link></li>
            <li><Link to="/tags"><IoMdPricetags /> Tags</Link></li>
            <li><Link to="/saves"><FaBookmark /> Saves</Link></li>
            <li><Link to="/blogs"><TbLogs /> Blogs</Link></li>
            <li><Link to="/events"><MdEventNote /> Events</Link></li>
            <li><Link to="/users"><FaUsers /> Users</Link></li>
            <li><Link to="/twinAI"><FaBrain /> TwinAI</Link></li>
            <li><Link to="/aboutUs"><RiFolderUnknowFill /> About Us</Link></li>
            <li><Link to="/contactUs"><IoIosContact /> Contact Us</Link></li>
            {user ? (
              <li><button className="btn w-full" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><Link to="/login"><button className="btn w-full">Login</button></Link></li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;