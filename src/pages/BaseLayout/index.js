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

// Images
import bgImage from "assets/images/bg-presentation.jpg";

import { useContext, useEffect, useState } from "react";

import { Icon } from "@mui/material";
import helper from "utils/helper";
import { AuthContext } from "components/AuthContext/authContext";
import LoadingFullSize from "components/Loading/fullSize";
import routes from "routes";

function BaseLayout({ children }) {
  const userFromStorage = JSON.parse(helper.getStorage("user"));
  const [user, setUser] = useState({});
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (helper.getCookie()) {
      setUser(userFromStorage);
    } else {
      helper.removeStorage("user");
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const defaultAuthRoute = {
    name: `Xin chào, ${user?.name}`,
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Trang cá nhân",
        route: "/profile",
      },
      {
        name: "Đăng xuất",
        onClick: handleLogout,
      },
    ],
  };

  const adminRoute = [
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
        {
          name: "Quản lý lớp học",
          route: "/classes",
        },
        {
          name: "Quản lý máy tính",
          route: "/computers",
        },
        {
          name: "Quản lý lịch",
          route: "/schedules",
        },
      ],
    },
    defaultAuthRoute,
  ];

  const gvRoute = [
    {
      name: `Đặt lịch sử dụng phòng máy`,
      icon: <Icon>person</Icon>,
    },
    defaultAuthRoute,
  ];

  const userRoute = [
    {
      name: `Xem thời khóa biểu`,
      icon: <Icon>person</Icon>,
    },
    defaultAuthRoute,
  ];

  const getRoute = () => {
    console.log(user?.role?.name);
    switch (user?.role?.name) {
      case "ROLE_GIANG_VIEN":
        return gvRoute;
      case "ROLE_QUAN_TRI":
        return adminRoute;
      case "ROLE_SINH_VIEN":
        return userRoute;
      default:
        return routes;
    }
  };

  return (
    <>
      <LoadingFullSize />
      <DefaultNavbar brand={"Quản lý phòng máy UTE"} routes={getRoute()} sticky />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "fit",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item mt={3} xs={12} lg={7} justifyContent="center" mx="auto">
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
              UTE Lab Management{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Hệ thống quản lý phòng máy cho trường Đại học Sư phạm Kỹ thuật UTE, hỗ trợ sinh viên
              và giảng viên xem thời khóa biểu học tập, quản lý thông tin các phòng máy, hỗ trợ đặt
              lịch sử dụng phòng máy.
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
