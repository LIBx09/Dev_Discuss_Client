import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import LeftSidebar from "../Sidebars/LeftSidebar";
import RightSidebar from "../Sidebars/RightSidebar"; // ✅ Import RightSidebar

const Layout = () => {
  return (
    <div className="w-[98%] md:w-11/12 mx-auto dark:bg-slate-950 dark:text-white ">
      <Navbar />
<<<<<<< HEAD
      <div className="relative min-h-screen flex flex-col md:flex-row  dark:bg-gray-900 dark:text-white py-6 gap-6">
=======
      <div className="relative min-h-screen flex flex-col md:flex-row bg-white  py-6 gap-6">
        
>>>>>>> 65e4790369b350cf9766cfc9bf24e1d4ecab34c5
        {/* ✅ Left Sidebar */}
        <div className="w-full  md:w-1/8">
          <LeftSidebar />
        </div>

        {/* ✅ Main Content Section */}
<<<<<<< HEAD
        <div className="flex-1  dark:bg-gray-950 shadow-lg rounded-xl p-6">
=======
        <div className="flex-1 bg-white  shadow-lg rounded-xl p-6">
>>>>>>> 65e4790369b350cf9766cfc9bf24e1d4ecab34c5
          <Outlet />
        </div>

        {/* ✅ Right Sidebar */}
        <div className="w-full md:w-1/5 dark:bg-gray-950 dark:text-white hidden md:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
