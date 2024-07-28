import axiosPublic from "./axiosPublic";

export const useNewsByLanguage = async (id: string) => {
  try {
    const response = await axiosPublic.get(`/news/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
