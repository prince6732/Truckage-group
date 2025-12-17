import axios from "axios";
import { useGlobalLoader } from "@/store/useGlobalLoader";

const api = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        useGlobalLoader.getState().setLoading(true);

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        useGlobalLoader.getState().setLoading(false);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        useGlobalLoader.getState().setLoading(false);
        return response;
    },
    (error) => {
        useGlobalLoader.getState().setLoading(false);
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default api;
