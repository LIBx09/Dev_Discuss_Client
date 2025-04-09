import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </ContextProvider>
    <Toaster></Toaster>
  </StrictMode>
);
