// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Images
import bgImage from "assets/images/3d-abstract-background-with-modern-plexus-design.jpg";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";
import Breadcrumbs from "examples/Breadcrumbs";

// Routes
import routes from "routes";
import { useContext, useEffect, useState } from "react";
import helper from "utils/helper";
import { AuthContext } from "components/AuthContext/authContext";
import { toast } from "react-toastify";
import { Icon } from "@mui/material";

function BaseLayout({ breadcrumb, title, children }) {
  const userFromStorage = JSON.parse(helper.getStorage("user"));
  const [user, setUser] = useState({});
  const { logout } = useContext(AuthContext);

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
      route: `/schedules`,
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
      case "ROLE_GIAO_VIEN":
        return gvRoute;
      case "ROLE_QUAN_TRI":
        return adminRoute;
      case "ROLE_SINH_VIEN":
        return userRoute;
      default:
        return routes;
    }
  };

  useEffect(() => {
    if (helper.getCookie()) {
      setUser(userFromStorage);
    } else if (helper.getStorage("user")) {
      helper.removeStorage("user");
      setUser(null);
      toast.error("Phiên đăng nhập hết hạn");
    }
  }, []);

  return (
    <MKBox
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        position: "relative",
        "::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        },
      }}
    >
      <MKBox bgColor="white" width={"70%"} ml={"auto"} mr={"auto"} minHeight={"calc(100vh)"}>
        <MKBox bgColor="white" shadow="md" py={0.25}>
          <DefaultNavbar
            brand={"Quản lý phòng máy UTE"}
            routes={getRoute()}
            action={
              !user && {
                type: "internal",
                route: "/sign-in",
                label: "Đăng nhập",
                color: "info",
              }
            }
            transparent
            relative
          />
        </MKBox>
        <Container sx={{ mt: 6 }} style={{ minHeight: "calc(100vh - 48px - 67px - 182px)" }}>
          <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
            <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3}>
              <Breadcrumbs routes={breadcrumb} />
            </MKBox>
            <MKTypography
              variant="h3"
              mb={1}
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
            >
              {title}
            </MKTypography>
            {children}
          </Grid>
        </Container>
        <MKBox mt="auto">
          <CenteredFooter />
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
