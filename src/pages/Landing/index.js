// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Landing page sections
import { Icon } from "@mui/material";
import Counters from "pages/Landing/sections/Counters";
import DesignBlocks from "pages/Landing/sections/DesignBlocks";
import Information from "pages/Landing/sections/Information";
import Pages from "pages/Landing/sections/Pages";

// Landing page components

// Routes
import footerRoutes from "footer.routes";
import routes from "routes";

// Images
import bgImage from "assets/images/bg-presentation.jpg";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import helper from "utils/helper";

function Landing() {
  const [user, setUser] = useState({});

  const handleLogout = () => {
    helper.removeCookie();
    helper.removeStorage("user");
  };

  const authenticatedRoute = [
    {
      name: "Quản lý phòng máy",
      icon: <Icon>video</Icon>,
      route: "/labs",
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

  useEffect(() => {
    setUser(JSON.parse(helper.getStorage("user")));
  });

  return (
    <>
      <ToastContainer />
      <DefaultNavbar brand={"UTELab"} routes={user ? authenticatedRoute : routes} sticky />
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
        <Counters />
        <Information />
        <DesignBlocks />
        <Pages />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Landing;
