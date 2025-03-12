import { createBrowserRouter } from "react-router-dom";
import Layout from "./MainLayout/Layout/Layout";
import Login from "./MainLayout/Social/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
