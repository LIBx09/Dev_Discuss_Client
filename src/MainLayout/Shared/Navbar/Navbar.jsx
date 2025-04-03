import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
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

  return (
    <div className="navbar bg-base-100 border-b border-b-gray-300">
      <div className="navbar-start">
        <div className="dropdown">
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
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
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </div>
      </div>

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
            <div tabIndex={0} role="button" className="">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL} />
                </div>
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
      </div>
    </div>
  );
};

export default Navbar;
