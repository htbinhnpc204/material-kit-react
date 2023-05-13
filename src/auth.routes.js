import { Icon } from "@mui/material";
import helper from "utils/helper";

const handleLogout = () => {
  helper.removeCookie();
  helper.removeStorage("user");
};

const user = helper.getStorage("user") && JSON.parse(helper.getStorage("user"));

const auth = [
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

export default auth;
