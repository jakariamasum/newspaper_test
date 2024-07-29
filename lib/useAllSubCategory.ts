import axiosPublic from "./axiosPublic";

export const useAllSubCategories = async () => {
  try {
    const response = await axiosPublic.get(`/sub-categories`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    throw error;
  }
};
