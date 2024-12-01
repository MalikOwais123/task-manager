import axiosInstance from "../utils/axios";

export const loginAPI = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signupAPI = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
