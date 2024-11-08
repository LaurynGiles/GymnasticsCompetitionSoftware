import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     withCredentials: true,
// });

const axiosInstance = axios.create({
    baseURL: 'https://gymnasticscompetitionsoftware.onrender.com/api',
    withCredentials: true,
});

export default axiosInstance;