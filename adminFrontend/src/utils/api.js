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

export const getCompetitionsByAdmin = async (admin_id) => {
    try {
        const response = await axiosInstance.get(`/competitions/admin/${admin_id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching competitions:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while fetching competitions' };
        }
    }
};