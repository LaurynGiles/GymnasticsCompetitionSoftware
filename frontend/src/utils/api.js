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

export const getActiveTimeSlot = async (competition_id) => {
  try {
    const response = await axiosInstance.get(`/timeslots/active/${competition_id}`);
    console.log("ACTIVE TIMESLOT:", response.data);
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

export const getAllApps = async (competition_id) => {
  try {
    const response = await axiosInstance.get(`/apparatuses/competition/${competition_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching apparatuses:', error);
    return [];
  }
};

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

export const submitDifficulty = async (eventId, judgeId, gymnastId, difficulty, penalty) => {
  try {
    const response = await axiosInstance.post('/difficulties/', { event_id: eventId, judge_id: judgeId, gymnast_id: gymnastId, difficulty_score: difficulty, penalty_score: penalty });
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error submitting difficulty:", error);
    return [];
  }
};

export const submitExecution = async (eventId, judgeId, gymnastId, deduction) => {
  try {
    const response = await axiosInstance.post('/executions/', { event_id: eventId, judge_id: judgeId, gymnast_id: gymnastId, execution_score: deduction });
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error submitting execution:", error);
    return [];
  }
};

export const getJudgeInfo = async (judgeId) => {
  try {
    const response = await axiosInstance.get(`/judges/id/${judgeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error fetching judge info:", error);
    return [];
  }
};

export const checkEventComplete = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/complete/event/${eventId}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error checking event completeness:", error);
    return [];
  }
};

export const checkSessionComplete = async (sessionId) => {
  try {
    const response = await axiosInstance.get(`/complete/session/${sessionId}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error checking session completeness:", error);
    return [];
  }
};

export const checkTimeSlotComplete = async (timeSlotId) => {
  try {
    const response = await axiosInstance.get(`/complete/timeSlot/${timeSlotId}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error checking timeslot completeness:", error);
    return [];
  }
};