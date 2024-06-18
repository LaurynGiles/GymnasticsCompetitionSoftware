import axios from 'axios';

const BASE_URL = process.env.API_URL;

// Get all gymnasts
export const getAllGymnasts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/gymnasts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching gymnasts:", error);
      throw error;
    }
  };
  
  // Get a gymnast by ID
  export const getGymnastById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/gymnasts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching gymnast with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Create a new gymnast
  export const createGymnast = async (gymnast) => {
    try {
      const response = await axios.post(`${BASE_URL}/gymnasts`, gymnast);
      return response.data;
    } catch (error) {
      console.error("Error creating gymnast:", error);
      throw error;
    }
  };
  
  // Update a gymnast
  export const updateGymnast = async (id, gymnast) => {
    try {
      const response = await axios.put(`${BASE_URL}/gymnasts/${id}`, gymnast);
      return response.data;
    } catch (error) {
      console.error(`Error updating gymnast with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Delete a gymnast
  export const deleteGymnast = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/gymnasts/${id}`);
    } catch (error) {
      console.error(`Error deleting gymnast with ID ${id}:`, error);
      throw error;
    }
  };