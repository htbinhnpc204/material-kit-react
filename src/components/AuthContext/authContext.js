import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "utils/api";
import helper from "utils/helper";
import { info } from "utils/path";
import { auth } from "utils/path";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (email, password, setLoading) => {
    const payload = { email: email, password: password };
    const loginRes = api.post({ path: auth.login, payload: payload });

    loginRes
      .then((response) => {
        helper.setCookie(response.data.data.access_token);
        api.setJwtToken(helper.getCookie());
        const infoRes = api.get({ path: info });

        infoRes
          .then((response) => {
            setIsAuthenticated(true);
            helper.setStorage("user", JSON.stringify(response.data?.data));
          })
          .catch(() => {
            toast.error("Không thể lấy thông tin người dùng");
          });
      })
      .catch(() => {
        toast.error(`Email hoặc mật khẩu không chính xác`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    helper.removeCookie();
    helper.removeStorage("user");
    navigate("/sign-in");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
