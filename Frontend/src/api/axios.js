import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4444",   // change if your backend uses another port
    withCredentials: false
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export default api;