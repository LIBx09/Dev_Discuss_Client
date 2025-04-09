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
import QuestionDetails from "./components/QuestionDetails";
import FilteredQuestions from "./Page/Tags/FilteredQuestions";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "./Page/MyProfile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/contactUs", element: <ContactUs /> },
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },
      { path: "/questions", element: <Questions /> },
      { path: "/questions/:id", element: <PrivateRoute><QuestionDetails /></PrivateRoute> },
      { path: "/questions/tag/:tagName", element: <FilteredQuestions /> },
      { path: "/tags", element: <Tags /> },
      { path: "/saves", element: <Saves /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/add-blogs", element: <AddBlogs /> },
      { path: "/events", element: <Events /> },
      { path: "/users", element: <Users /> },
      { path: "/askQuestion", element: <PrivateRoute><AskQuestion /></PrivateRoute> },
      { path: "/twinAI", element: <TwinAI /> },
      {path: "/myProfile", element: <MyProfile></MyProfile>}
    ],
  },
]);

export default router;
