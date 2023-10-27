import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL, // Your base API URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Default headers
    // Add other default headers here
  },
});

export default axiosInstance;
