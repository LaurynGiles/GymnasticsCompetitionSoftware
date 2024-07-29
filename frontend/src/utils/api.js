import axiosInstance from './axios.js';

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
      const response = await axiosInstance.post('/events/bySessions', { sessionIds });
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

    return response.data;
  } catch (error) {
    console.error('Error checking event existence:', error);
    return [];
  }
};

export const getGymnastsByEvent = async (event_id, session_id) => {
  try {
    const response = await axiosInstance.get(`/gymnasts/event/${event_id}/gymnasts`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error('Error fetching gymnasts:', error);
    return [];
  }
}

export const getAllApps = async () => {
  try {
    const response = await axiosInstance.get(`/apparatuses/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching apparatuses:', error);
    return [];
  }
}

export const getEventsBySessionAndApparatus = async (sessionId, apparatusId) => {
  try {
    const response = await axiosInstance.post('/events/bySessionAndApparatus', { sessionId, apparatusId });
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error fetching events:", error);
    return [];
  }
};