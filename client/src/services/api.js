import axios from "axios";

const API = axios.create({
    baseURL: "https://server-1-k971.onrender.com/api",
    withCredentials: true
});

export default API;