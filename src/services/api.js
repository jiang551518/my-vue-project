import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.73.94.66:5000', // 请替换为实际的 API 基础 URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器，在请求发送前添加 token 到请求头
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;