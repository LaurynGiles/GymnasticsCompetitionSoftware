import axiosInstance from './axios.js';

// Login a judge
export const loginJudge = async (gsa_id) => {
    try {
        const response = await axiosInstance.post('/login', { gsa_id });
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

// Get all gymnasts
// export const getAllGymnasts = async () => {
//   try {
//       const response = await axiosInstance.get('/gymnasts');
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching gymnasts:", error);
//       throw error;
//   }
// };

// Get a gymnast by ID
// export const getGymnastById = async (id) => {
//   try {
//       const response = await axiosInstance.get(`/gymnasts/${id}`);
//       return response.data;
//   } catch (error) {
//       console.error(`Error fetching gymnast with ID ${id}:`, error);
//       throw error;
//   }
// };

// Create a new gymnast
// export const createGymnast = async (gymnast) => {
//   try {
//       const response = await axiosInstance.post('/gymnasts', gymnast);
//       return response.data;
//   } catch (error) {
//       console.error("Error creating gymnast:", error);
//       throw error;
//   }
// };

// Update a gymnast
// export const updateGymnast = async (id, gymnast) => {
//   try {
//       const response = await axiosInstance.put(`/gymnasts/${id}`, gymnast);
//       return response.data;
//   } catch (error) {
//       console.error(`Error updating gymnast with ID ${id}:`, error);
//       throw error;
//   }
// };

// Delete a gymnast
// export const deleteGymnast = async (id) => {
//   try {
//       await axiosInstance.delete(`/gymnasts/${id}`);
//   } catch (error) {
//       console.error(`Error deleting gymnast with ID ${id}:`, error);
//       throw error;
//   }
// };