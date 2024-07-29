import axiosPublic from "./axiosPublic";

export const useNewsByCategory = async (id: string) => {
  try {
    const response = await axiosPublic.get(`/news/category-news/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
