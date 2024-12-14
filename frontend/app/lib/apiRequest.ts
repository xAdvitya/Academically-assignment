import axios from "axios";

//setting axios with baseURL
const apiRequest = axios.create({
  baseURL: "http://localhost:8800/",
  withCredentials: true,
});

export default apiRequest;
