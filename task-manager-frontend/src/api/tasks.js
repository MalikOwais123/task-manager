import axiosInstance from "../utils/axios";

export const fetchTasksAPI = async (params) => {
  const { page = 1, limit = 10, search, status, sort } = params || {};
  try {
    const response = await axiosInstance.get("/tasks", {
      params: {
        page,
        limit,
        search,
        status,
        sort,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const deleteTaskAPI = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTaskAPI = async (taskId, data) => {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, data);
    return response;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const createTaskAPI = async (data) => {
  try {
    const response = await axiosInstance.post("/tasks", data);
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
