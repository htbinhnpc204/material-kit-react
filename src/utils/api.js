import axios from "axios";

// const baseUrl = "http://localhost:8080/api/v1";
const baseUrl = "http://167.71.214.36:8080/api/v1";

export default {
  token: undefined,

  headers: {},
  multipartHeader: {},

  setJwtToken(token) {
    this.token = token;
    this.establishHeaderRequest();
  },

  establishHeaderRequest() {
    this.headers = {
      "content-type": "application/json",
      "RW-Authorization": `Bearer ${this.token}`,
    };

    this.multipartHeader = {
      "content-type": "multipart/form-data",
      "RW-Authorization": `Bearer ${this.token}`,
    };
  },

  get({ path = "", params = {} }) {
    axios.defaults.baseURL = baseUrl;
    axios.defaults.withCredentials = true;
    return axios.get(path, { headers: this.headers, params });
  },

  delete({ path = "", params = {} }) {
    axios.defaults.baseURL = baseUrl;
    axios.defaults.withCredentials = true;
    return axios.delete(path, { headers: this.headers, params });
  },

  put({ path = "", payload, isMultipart = false }) {
    return axios({
      baseURL: baseUrl,
      data: payload,
      method: "PUT",
      url: path,
      headers: isMultipart ? this.multipartHeader : this.headers,
    });
  },

  post({ path = "", payload, isMultipart = false }) {
    return axios({
      withCredentials: true,
      baseURL: baseUrl,
      data: payload,
      method: "POST",
      url: path,
      headers: isMultipart ? this.multipartHeader : this.headers,
    });
  },
};
