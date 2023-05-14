import { useEffect } from "react";

// react-router components
import { Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Material Kit 2 React themes
import theme from "assets/theme";
import Landing from "layouts/pages/landing";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import SignInPage from "layouts/pages/authentication/sign-in";
import Lab from "layouts/pages/lab";
import User from "layouts/pages/user";
import Computer from "layouts/pages/computer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       return <Route exact path={route.route} element={route.component} key={route.key} />;
  //     }

  //     return null;
  //   });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/labs" element={<Lab />} />
        <Route path="/users" element={<User />} />
        <Route path="/computers" element={<Computer />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/presentation" element={<Presentation />} />
        {/* {getRoutes(routes)} */}
      </Routes>
    </ThemeProvider>
  );
}
