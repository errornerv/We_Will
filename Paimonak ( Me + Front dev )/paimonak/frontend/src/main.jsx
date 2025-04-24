import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProjectRoutes from "./routes/ProjectRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <ProjectRoutes />
  </StrictMode>
);
