// @mui material components
import { CardContent, CardHeader, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Landing page sections
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Icon } from "@mui/material";
import DesignBlocks from "pages/Landing/sections/DesignBlocks";

// Landing page components

// Routes
import footerRoutes from "footer.routes";
import routes from "routes";

// Images
import bgImage from "assets/images/bg-presentation.jpg";

import { Add } from "@mui/icons-material";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "utils/api";
import helper from "utils/helper";
import { lab } from "utils/path";

function Lab() {
  const [user, setUser] = useState({});
  const [labs, setLabs] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleLogout = () => {
    helper.removeCookie();
    helper.removeStorage("user");
  };

  const handleSearch = useCallback(
    debounce((value) => {
      value = value.trim();
      setKeyword(value);
      setSearchValue(value);
    }, 1000),
    []
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleAddLab = () => {
    // Navigate to add lab page
  };

  const handleView = (id) => {
    console.log(id);
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    setUser(JSON.parse(helper.getStorage("user")));
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${lab}?page=${page}&keyword=${keyword}` });
    res.then((response) => {
      setLabs(response.data?.data?.items);
      setPagination(response.data?.data?.pagination);
    });
  }, [page, keyword]);

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
      ></MKBox>
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
        <MKBox key={"labs"}>
          <Grid container spacing={2} sx={{ my: 4 }}>
            <Grid item xs={12} md={12} lg={8}>
              <MKInput
                variant="outlined"
                size="small"
                label="Search labs"
                fullWidth
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MKButton variant="contained" startIcon={<Add />} onClick={() => handleAddLab()}>
                Add lab
              </MKButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {labs.map((lab) => (
              <Grid item xs={12} sm={5} md={4} key={lab.name}>
                <Card sx={{ height: "250px" }}>
                  <CardHeader title={lab.name} />
                  <CardContent>
                    <Typography variant="body2">Managed by: {lab.manager.name}</Typography>
                    <Typography variant="body1">{lab.description}</Typography>
                    <img src={lab.avatar} alt={lab.name} />
                  </CardContent>
                  <MKBox
                    style={{
                      marginTop: "auto",
                      marginLeft: "auto",
                      marginBottom: 5,
                      marginRight: 5,
                    }}
                  >
                    <MKButton
                      startIcon={<VisibilityOutlinedIcon />}
                      color="info"
                      variant="text"
                      size="small"
                      onClick={() => handleView(lab.id)}
                    >
                      View
                    </MKButton>
                    <MKButton
                      startIcon={<ModeEditOutlinedIcon />}
                      color="success"
                      variant="text"
                      size="small"
                      onClick={() => handleEdit(lab.id)}
                    >
                      Edit
                    </MKButton>
                    <MKButton
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      color="primary"
                      variant="text"
                      size="small"
                      onClick={() => handleDelete(lab.id)}
                    >
                      Delete
                    </MKButton>
                  </MKBox>
                </Card>
              </Grid>
            ))}
          </Grid>
          <MKBox display="flex" justifyContent="center" mt={3}>
            <Pagination count={pagination.pages} page={page} onChange={(_, p) => setPage(p)} />
          </MKBox>
        </MKBox>
        <DesignBlocks />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Lab;
