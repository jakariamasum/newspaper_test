import axiosPublic from "./axiosPublic";

export const useAllPages = async () => {
  try {
    const response = await axiosPublic.get("/pages");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
};
