import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5075",
    baseURL: "https://test-farm-2qs1.onrender.com/"
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // console.log("TOKEN IN INDEX", token)
    if (token) {        
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
