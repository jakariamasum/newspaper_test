import axiosPublic from "../axiosPublic";

export const useAllLanguages = async () => {
  try {
    const response = await axiosPublic.get("/language");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
