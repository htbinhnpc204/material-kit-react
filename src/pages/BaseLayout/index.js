// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Landing page components

// Routes
import footerRoutes from "footer.routes";
import routes from "routes";

// Images
import bgImage from "assets/images/bg-presentation.jpg";

import { useEffect, useState } from "react";

import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import helper from "utils/helper";

function BaseLayout({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const userFromStorage = JSON.parse(helper.getStorage("user"));

  useEffect(() => {
    if (helper.getCookie()) {
      setUser(userFromStorage);
    } else {
      helper.removeStorage("user");
      setUser(null);
      navigate("/sign-in");
      toast.error("Session expired!!");
    }
  }, []);

  const handleLogout = () => {
    helper.removeCookie();
    helper.removeStorage("user");
    navigate("/sign-in");
  };

  const auth = [
    {
      name: "Chức năng",
      icon: <Icon>settings</Icon>,
      collapse: [
        {
          name: "Quản lý người dùng",
          route: "/users",
        },
        {
          name: "Quản lý phòng máy",
          route: "/labs",
        },
      ],
    },
    {
      name: `Hello, ${user?.name}`,
      icon: <Icon>person</Icon>,
      collapse: [
        {
          name: "Profile",
          route: "/profile",
        },
        {
          name: "Logout",
          onClick: handleLogout,
        },
      ],
    },
  ];

  return (
    <>
      <DefaultNavbar brand={"UTELab"} routes={user ? auth : routes} sticky />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              UTE Computer Lab{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Support to inspect the schedule and book calendar to use the lab room.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {children}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

// Typechecking props of the MKAlert
BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
