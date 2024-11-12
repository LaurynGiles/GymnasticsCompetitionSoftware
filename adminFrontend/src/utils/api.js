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
        const response = await axiosInstance.get(`/sessions/byTimeSlot/${timeSlotId}`);
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
        console.log(`API: ${apparatusName}`);
        const response = await axiosInstance.post('/apparatuses/', apparatusName );
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
        const response = await axiosInstance.post('/gymnasts/', gymnastData);
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
        const response = await axiosInstance.post('/judges/', judgeData);
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

export const getFinalResults = async (competitionId) => {
    try {
      const response = await axiosInstance.get(`/results/${competitionId}`);
      return { success: true, data: response.data };
    } catch (error) {
        console.error(`Error creating judge: ${error}`);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while fetching results' };
        }
    }
  };

  export const getApparatusByCompetition = async (competitionId) => {
    try {
      const response = await axiosInstance.get(`/apparatuses/competition/${competitionId}`);
      return { success: true, data: response.data };
    } catch (error) {
        console.error(`Error creating judge: ${error}`);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: 'An error occurred while fetching apparatuses' };
        }
    }
  };

  export const getQualificationsByCompetition = async (competitionId) => {
        try {
        const response = await axiosInstance.get(`/qualifications/competition/${competitionId}`);
        return { success: true, data: response.data };
        } catch (error) {
            console.error(`Error creating judge: ${error}`);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while fetching qualifications' };
            }
        }
    };

  export const getGymnastGroupsByCompetition = async (competitionId) => {
        try {
            const response = await axiosInstance.get(`/gymnastGroups/competition/${competitionId}`);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching gymnast groups by competition:", error);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while fetching gymnast groups' };
            }
        }
    };


    export const getGymnastsByGroup = async (group_id) => {
        try {
            const response = await axiosInstance.get(`gymnasts/group/${group_id}`);
            console.log(response);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching gymnasts by group:", error);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while fetching gymnasts' };
            }
        }
    };

    export const updateGymnast = async (gymnastId, gymnastData) => {
        try {
            const response = await axiosInstance.put(`/gymnasts/${gymnastId}`, gymnastData);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error updating gymnast:", error);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while updating the gymnast' };
            }
        }
    };

    export const deleteGymnast = async (gymnastId) => {
        try {
            const response = await axiosInstance.delete(`/gymnasts/${gymnastId}`);
            return { success: true, message: 'Gymnast deleted successfully' }; // You can modify this as needed
        } catch (error) {
            console.error("Error deleting gymnast:", error);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while deleting the gymnast' };
            }
        }
    };

    export const getJudgesByCompetition = async (competitionId) => {
        try {
            const response = await axiosInstance.get(`/judges/competition/${competitionId}`); // Use the new endpoint
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching judges:", error);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while fetching judges' };
            }
        }
    };

    export const updateJudge = async (judgeId, judgeData) => {
        try {
            const response = await axiosInstance.put(`/judges/${judgeId}`, judgeData);
            return { success: true, data: response.data };
        } catch (error) {
            console.error(`Error updating judge: ${error}`);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while updating the judge' };
            }
        }
    };

    export const deleteJudge = async (judgeId) => {
        try {
            const response = await axiosInstance.delete(`/judges/${judgeId}`);
            return { success: true };
        } catch (error) {
            console.error(`Error deleting judge: ${error}`);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while deleting the judge' };
            }
        }
    };

    export const updateDifficulty = async (eventId, gymnastId, judgeId, updatedData) => {
        try {
            // Make PUT request to the backend to update the difficulty and penalty scores
            const response = await axiosInstance.put(`/difficulties/${eventId}/${gymnastId}/${judgeId}`, updatedData);
            
            return { success: true, data: response.data }; // Return the updated Difficulty record
        } catch (error) {
            console.error("Error updating Difficulty:", error);
            
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while updating Difficulty' };
            }
        }
    };

    export const updateExecution = async (eventId, gymnastId, judgeId, updatedData) => {
        try {
            // Make PUT request to the backend to update the execution score
            const response = await axiosInstance.put(`/executions/${eventId}/${gymnastId}/${judgeId}`, updatedData);
            
            return { success: true, data: response.data }; // Return the updated Execution record
        } catch (error) {
            console.error("Error updating Execution:", error);
            
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while updating Execution' };
            }
        }
    };

    export const createAdmin = async (adminData) => {
        try {
            const response = await axiosInstance.post('/admins', adminData);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error creating admin:", error);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'An error occurred while creating the admin' };
            }
        }
    };

    export const checkAdminExists = async (username) => {
        try {
            const response = await axiosInstance.get(`/admins/exists/${username}`);
            return { success: true, exists: response.data.exists };
        } catch (error) {
            console.error("Error checking admin existence:", error);
            return { success: false, message: 'An error occurred while checking admin existence' };
        }
    };
    