import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from "./redux/Store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ContextProvider>
      <Toaster />
    </Provider>
  </StrictMode>
);