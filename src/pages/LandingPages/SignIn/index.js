/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";

// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { CircularProgress, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// @mui icons
import HomeIcon from "@mui/icons-material/Home";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
import SimpleFooter from "examples/Footers/SimpleFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "components/AuthContext/authContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function SignInBasic() {
  const location = useLocation();
  const yupSchema = yup.object({
    email: yup.string().required("Email is required!").email("Invalid Email!"),
    password: yup.string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(yupSchema),
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { login, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const onSubmit = (data) => {
    if (rememberMe) {
      localStorage.setItem("oldEmail", data.email);
      localStorage.setItem("oldPassword", data.password);
    }
    setLoading(true);
    login(data.email, data.password, setLoading);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const { from } = location.state || { from: { pathname: "/" } };
      navigate(from.pathname);
    }
  }, [isAuthenticated]);

  return (
    <>
      <ToastContainer />
      <DefaultNavbar
        brand={
          <Typography style={{ display: "flex", alignItems: "center" }}>
            <HomeIcon /> &nbsp; Trang chủ
          </Typography>
        }
        routes={[]}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Đăng nhập
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <MKBox mb={2}>
                    <MKInput
                      name="email"
                      error={errors?.email ? true : false}
                      {...register("email")}
                      type="email"
                      label="Email"
                      fullWidth
                    />
                    {errors?.email && (
                      <Typography variant="caption" color="error">
                        {errors?.email.message}
                      </Typography>
                    )}
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="password"
                      error={errors?.password ? true : false}
                      {...register("password")}
                      type="password"
                      label="Password"
                      fullWidth
                    />
                    {errors?.password && (
                      <Typography variant="caption" color="error">
                        {errors?.password.message}
                      </Typography>
                    )}
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      type="submit"
                      variant="gradient"
                      color={isLoading ? "secondary" : "info"}
                      disabled={isLoading}
                      fullWidth
                      style={{ position: "relative" }}
                    >
                      {isLoading && (
                        <CircularProgress
                          style={{
                            position: "absolute",
                            left: "33%",
                            alignSelf: "center",
                          }}
                          size={"1rem"}
                        />
                      )}
                      Đăng nhập
                    </MKButton>
                  </MKBox>
                </MKBox>
                <MKBox mt={3} mb={1} textAlign="center">
                  <MKTypography variant="button" color="text">
                    Quên mật khẩu?{" "}
                    <MKTypography
                      component={Link}
                      to="/reset-password"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Cấp lại
                    </MKTypography>
                  </MKTypography>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter
          company={{ href: "https://fb.me/binhhothai204", name: "Hồ Thái Bình" }}
          light
        />
      </MKBox>
    </>
  );
}

export default SignInBasic;
