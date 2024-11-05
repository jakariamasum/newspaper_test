import axiosPublic from "./axiosPublic";

export const useNewsByCategory = async (id: string, lang?: string) => {
  try {
    let response;
    if (lang) {
      response = await axiosPublic.get(
        `/news/category-news/${id}?lang=${lang}`
      );
    } else {
      response = await axiosPublic.get(`/news/category-news/${id}`);
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
