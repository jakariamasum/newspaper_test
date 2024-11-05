import axiosPublic from "./axiosPublic";

export const useAllCities = async () => {
  try {
    const response = await axiosPublic.get(`/city`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
