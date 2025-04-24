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
import FixFlow from "./Page/FixFlow/FixFlow";
import Problems from "./Page/Problems/Problems";
import ProblemSolve from "./Page/ProblemSolve/ProblemSolve";
import QuizPage from "./Page/Quiz/QuizPage";
import ShortQuestions from "./Page/ShortQuestion/ShortQuestions";
import ShortQSolve from "./Page/ShortQuestionSolve/ShortQSolve";
import BlogDetails from "./Page/Blog/BlogDetails";
import AddEvent from "./Page/Events/AddEvent";
import EventDetails from "./Page/Events/EventDetails";
import AboutUsDetails from "./Page/AboutUs/AboutUsDetails";
import MyQuestions from "./Page/MyQuestions/MyQuestions";
import Badges from "./Page/MyProfile/Badges";
import LeaderBoard from "./Page/LeaderBoard/LeaderBoard";


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
      {path:'/fixFlow', element:<FixFlow></FixFlow>},
      {path: '/problems', element:<Problems></Problems>},
      {path: '/problemSolve/:id', element:<ProblemSolve></ProblemSolve>},
      {path: '/QuizPage',element:<QuizPage></QuizPage>},
      {path:'/shortQuestions',element:<ShortQuestions></ShortQuestions>},
      {path:'/shortQSolve/:id',element:<ShortQSolve></ShortQSolve>},
      {path: "/myProfile", element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>},
      {path: "/blog-details/:id", element: <BlogDetails></BlogDetails>},
      {path: "/add-event", element: <AddEvent></AddEvent>},
      {path: "/events/:id", element: <EventDetails></EventDetails>},
      {path: "/aboutUsDetails/:id", element: <PrivateRoute><AboutUsDetails></AboutUsDetails></PrivateRoute>},
      {path: "/myQuestions", element: <PrivateRoute><MyQuestions></MyQuestions></PrivateRoute>},
      {path: "/badges", element: <PrivateRoute><Badges></Badges></PrivateRoute>},
      {path: "/myQuestion", element: <MyQuestions></MyQuestions>},
      {path: "/leaderboard", element: <LeaderBoard></LeaderBoard>}
    ],
  },
]);

export default router;
