import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import LeftSidebar from "../Sidebars/LeftSidebar";
import RightSidebar from "../Sidebars/RightSidebar"; // ✅ Import RightSidebar

const Layout = () => {


  return (
    <div className=" dark:bg-slate-900 dark:text-white ">
      <div className="w-[98%] md:w-11/12 mx-auto">
      <Navbar />
      <div className="max-w-7xl mx-auto relative min-h-screen md:grid grid-cols-12   dark:bg-slate-900 dark:text-white py-6 gap-6">
        {/* ✅ Left Sidebar */}
        <div className="w-full col-span-2">
          <LeftSidebar />
        </div>

        {/* ✅ Main Content Section */}
        <div className="col-span-8  dark:bg-slate-900 shadow-lg rounded-xl p-6">
          <Outlet />
        </div>

        {/* ✅ Right Sidebar */}
        <div className="w-full col-span-2 dark:bg-slate-900  hidden md:block">
          <RightSidebar />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Layout;
