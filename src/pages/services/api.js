import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Change to your backend URL
  withCredentials: true,            // if using cookies/auth
});

export default instance;
