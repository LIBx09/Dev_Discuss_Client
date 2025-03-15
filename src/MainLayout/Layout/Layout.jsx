import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="w-[98%] md:w-11/12 mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
// github checking now