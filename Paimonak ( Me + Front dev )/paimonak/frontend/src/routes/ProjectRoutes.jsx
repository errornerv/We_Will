import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPasswordPage from "../pages/login-page/LoginPasswordPage";
import LoginUsernamePage from "../pages/login-page/LoginUsernamePage";
import SignupFirstPage from "../pages/signup-page/SignupFirstPage";
import SignupSecondPage from "../pages/signup-page/SignupSecondPage";
import PasswordRecoveryPage from "../pages/forget-password-page/PasswordRecoveryPage";
import NewPasswordPage from "../pages/forget-password-page/NewPasswordPage";
import CartPage from "../pages/CartPage";
import OrdersRecordsPage from "../pages/OrdersRecordsPage";

export default function ProjectRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login/password" element={<LoginPasswordPage />} />
        <Route path="/login/username" element={<LoginUsernamePage />} />

        <Route path="/signup/1" element={<SignupFirstPage />} />
        <Route path="/signup/2" element={<SignupSecondPage />} />

        <Route
          path="/forgetpassword/passwordrecovery"
          element={<PasswordRecoveryPage />}
        />
        <Route
          path="/forgetpassword/newpassword"
          element={<NewPasswordPage />}
        />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/ordersrecords" element={<OrdersRecordsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
