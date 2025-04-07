import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    <Toaster></Toaster>
  </StrictMode>
);
