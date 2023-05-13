import Cookies from "universal-cookie";
const cookieName = "RW-Authorization";

const cookie = new Cookies();
const helper = {};
const hourInMillis = 60 * 60 * 1000;

helper.setCookie = (data) => {
  cookie.set(cookieName, data, {
    path: "/",
    expires: new Date(Date.now() + hourInMillis),
  });
};

helper.getCookie = () => {
  return cookie.get(cookieName);
};

helper.removeCookie = () => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

helper.setStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

helper.getStorage = (key) => window.localStorage.getItem(key);

helper.removeStorage = (key) => window.localStorage.removeItem(key);

export default helper;
