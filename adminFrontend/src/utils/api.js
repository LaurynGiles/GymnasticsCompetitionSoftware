import axiosInstance from './axios.js';

export const loginAdmin = async (username, password) => {
    try {
        console.log(`API call: ${username}, ${password}`);
        
        const response = await axiosInstance.post('/adminLogin/login', { username, password });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error logging in judge:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred during login' };
        }
    }
};