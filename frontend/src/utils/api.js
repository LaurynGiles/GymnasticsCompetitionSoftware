import axiosInstance from './axios.js';

// Login a judge
export const loginJudge = async (gsa_id) => {
    try {
        const response = await axiosInstance.post('/login', { gsa_id });
        console.log(response.data);
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

export const getActiveTimeSlot = async () => {
    try {
      const response = await axiosInstance.get('/timeslots/active');
      return response.data;
    } catch (error) {
      console.error("Error fetching active time slot:", error);
      return [];
    }
};


export const getSessionsByTimeSlot = async (timeSlotId) => {
    try {
      const response = await axiosInstance.get(`/sessions/byTimeSlot/${timeSlotId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [];
    }
};

export const getEventsBySessionIds = async (sessionIds) => {
    try {
      console.log("api");
      console.log(sessionIds);
      const response = await axiosInstance.post('/events/bySessions', { sessionIds });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      console.log(error);
      return [];
    }
};

export const checkEventExists = async (level, age, apparatus) => {
  try {
    const response = await axiosInstance.get('/events/checkExists', {
      params: { level, age, apparatus }
    });

    console.log(response.data);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking event existence:', error);
    return [];
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