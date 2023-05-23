import { useEffect } from "react";

// react-router components
import { Route, Routes, useLocation } from "react-router-dom";

// @mui material components
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

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    console.log(pathname);
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/labs" element={<Lab />} />
        <Route path="/users" element={<User />} />
        <Route path="/classes" element={<ClassPage />} />
        <Route path="/classes/:id" element={<ClassDetailPage />} />
        <Route path="/computers" element={<Computer />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/schedules" element={<SchedulePage />} />
        <Route path="/presentation" element={<Presentation />} />
      </Routes>
    </ThemeProvider>
  );
}
