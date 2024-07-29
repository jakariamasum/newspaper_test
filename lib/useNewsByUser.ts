import axiosPublic from "./axiosPublic";

export const useNewsByUser = async (id: string) => {
  try {
    const response = await axiosPublic.get(`/news/user-news/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
