import axios from 'axios';

const API_URL = 'https://finpilot-backend-1fh8.onrender.com'; 

const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    console.error("Error data:", error.response.data);
    console.error("Error status:", error.response.status);
    throw new Error(error.response.data.detail || `Server error: ${error.response.status}`);
  } else if (error.request) {
    throw new Error("Cannot connect to the server. Please ensure the backend is running.");
  } else {
    throw new Error(error.message);
  }
};

export const generatePlan = async (userProfile) => {
  try {
    const response = await axios.post(`${API_URL}/generate-plan`, userProfile);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// --- NEW API FUNCTION FOR SIMULATIONS ---
export const simulateScenarios = async (userProfile) => {
  try {
    const payload = { userProfile };
    const response = await axios.post(`${API_URL}/simulate-scenarios`, payload);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// --- NEW API FUNCTION FOR CHAT ---
export const chatWithAgent = async (chatPayload) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, chatPayload);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};