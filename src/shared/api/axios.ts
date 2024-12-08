import axios from "axios";
import API_CONFIG from "./config";

export const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message || error.message;
        return Promise.reject(message);
    }
)