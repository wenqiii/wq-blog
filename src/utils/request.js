import axios from "axios";
import { message } from "antd";

const service = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 100000000,
});

service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    // console.log(error, "respone error", error.msg);
    message.error(error.msg);
    return Promise.reject(error);
  }
);

export default service;
