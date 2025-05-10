import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API || "http://localhost:5001/api",
    withCredentials: true,
})