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

export const createCompetition = async (competitionData) => {
    try {
        const response = await axiosInstance.post('/competitions/', competitionData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating competition:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while creating the competition' };
        }
    }
};

export const createQualification = async (qualification) => {
    try {
        const response = await axiosInstance.post('/qualifications/', qualification);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating qualification:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while creating the qualification' };
        }
    }
};

export const createTimeSlot = async (timeSlotData) => {
    try {
        const response = await axiosInstance.post('/timeslots/', timeSlotData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating time slot:", error);
        return { success: false, message: error.response?.data?.message || 'An error occurred while creating the time slot' };
    }
};

export const getSessionsByTimeSlot = async (timeSlotId) => {
    try {
        const response = await axiosInstance.get(`/sessions/timeslot/${timeSlotId}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching sessions by time slot:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while fetching sessions' };
        }
    }
};

export const createSession = async (payload) => {
    try {
      const response = await axiosInstance.post('/sessions/', payload);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error creating session:", error);
      return { success: false, message: error.response?.data?.message || 'An error occurred while creating the session' };
    }
  };

export const createGymnastGroup = async (payload) => {
    try {
        const response = await axiosInstance.post('/gymnastgroups/', payload);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating gymnast group:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while creating gymnast group' };
        }
    }
};

export const createApparatus = async (apparatusName) => {
    try {
        const response = await axiosInstance.post('/apparatuses/', { name: apparatusName });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating apparatus:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while creating the apparatus' };
        }
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await axiosInstance.post('/events/', eventData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating event:", error);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while creating the event' };
        }
    }
};

export const createGymnast = async (gymnastData) => {
    try {
        const response = await axios.post('/gymnasts/', gymnastData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Error creating gymnast: ${error}`);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while creating the gymnast' };
        }
    }
};

export const createJudge = async (judgeData) => {
    try {
        const response = await axios.post('/judges/', judgeData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Error creating judge: ${error}`);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while creating the judge' };
        }
    }
};