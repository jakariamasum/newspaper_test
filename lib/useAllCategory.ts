import axiosPublic from "./axiosPublic";

export const useAllCategory = async () => {
  try {
    const response = await axiosPublic.get(`/categories`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
