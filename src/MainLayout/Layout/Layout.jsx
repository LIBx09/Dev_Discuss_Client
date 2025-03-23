import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { useState } from "react";

const Layout = () => {


  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Layout;
