import axiosPublic from "./axiosPublic";

export const useAllNews = async () => {
  try {
    const response = await axiosPublic.get(`/news`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
