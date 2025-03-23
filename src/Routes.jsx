import { createBrowserRouter } from "react-router-dom";
import Layout from "./MainLayout/Layout/Layout";
import Login from "./MainLayout/Social/Login/Login";
import ContactUs from "./Page/ContactUs/ContactUs";
import AboutUs from "./Page/AboutUs/AboutUs";
import Registration from "./MainLayout/Social/Registration/Registration";
import Blogs from "./Page/Blogs/Blogs";
import AddBlogs from "./Page/AddBlogs/AddBlogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration></Registration>
      },
      {
        path:"/blogs",
        element:<Blogs></Blogs>
      },
      {
        path:"/add-blogs",
        element:<AddBlogs></AddBlogs>
      }
    ],
  },
]);

export default router;
