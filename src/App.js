/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Route, Routes, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import theme from "assets/theme";
import Landing from "layouts/pages/landing";
import Presentation from "layouts/pages/presentation";

import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpPage from "layouts/pages/authentication/signup";
import ClassPage from "layouts/pages/class";
import ClassDetailPage from "layouts/pages/class/detail";
import Computer from "layouts/pages/computer";
import Lab from "layouts/pages/lab";
import ProfilePage from "layouts/pages/profile";
import SchedulePage from "layouts/pages/schedule";
import User from "layouts/pages/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "components/PrivateRoute";
import helper from "utils/helper";
import { AuthContext } from "components/AuthContext/authContext";
import LoadingFullSize from "components/Loading/fullSize";

export default function App() {
  const { pathname } = useLocation();
  const { setIsAuthenticated } = useContext(AuthContext);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    helper.getCookie() ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/labs"
          element={
            <PrivateRoute>
              <Lab />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <PrivateRoute>
              <ClassPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/classes/:id"
          element={
            <PrivateRoute>
              <ClassDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/schedules"
          element={
            <PrivateRoute>
              <SchedulePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/computers"
          element={
            <PrivateRoute>
              <Computer />
            </PrivateRoute>
          }
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/presentation" element={<Presentation />} />
      </Routes>
    </ThemeProvider>
  );
}
