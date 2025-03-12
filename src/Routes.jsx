import { createBrowserRouter } from "react-router-dom";
import Layout from "./MainLayout/Layout/Layout";
import Login from "./MainLayout/Social/Login/Login";
import ContactUs from "./Page/ContactUs/ContactUs";
import AboutUs from "./Page/AboutUs/AboutUs";

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
    ],
  },
]);

export default router;
