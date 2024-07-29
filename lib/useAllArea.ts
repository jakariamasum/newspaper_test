import axiosPublic from "./axiosPublic";

export const useAllArea = async () => {
  try {
    const response = await axiosPublic.get(`/area`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching area:", error);
    throw error;
  }
};
