import axiosPublic from "./axiosPublic";

export const useAllVideos = async () => {
  try {
    const response = await axiosPublic.get("/videos");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};
