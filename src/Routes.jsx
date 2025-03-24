import { createBrowserRouter } from "react-router-dom";
import Layout from "./MainLayout/Layout/Layout";
import Login from "./MainLayout/Social/Login/Login";
import ContactUs from "./Page/ContactUs/ContactUs";
import AboutUs from "./Page/AboutUs/AboutUs";
import Registration from "./MainLayout/Social/Registration/Registration";
import Blogs from "./Page/Blogs/Blogs";
import AddBlogs from "./Page/AddBlogs/AddBlogs";
import Home from "./MainLayout/Home/Home";
import Questions from "./Page/Questions/Questions";
import Tags from "./Page/Tags/Tags";
import Saves from "./Page/Saves/Saves";

import Events from "./Page/Events/Events";
import Users from "./Page/Users/Users";
import AskQuestion from "./components/AskQuestion";
import TwinAI from "./Page/TwinAI/TwinAI";

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
      },
      { path: "/", element: <Home /> },
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/contactUs", element: <ContactUs /> },
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },
      { path: "/questions", element: <Questions /> },
      { path: "/tags", element: <Tags /> },
      { path: "/saves", element: <Saves /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/events", element: <Events /> },
      { path: "/users", element: <Users /> },
      {path: "/askQuestion", element: <AskQuestion></AskQuestion>},
      {path:'/twinAI',element:<TwinAI></TwinAI>}
    ],
    
  },
  
]);

export default router;
