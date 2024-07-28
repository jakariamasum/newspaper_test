import axiosPublic from "./axiosPublic";

export const useSingleCategory = async (id: string) => {
  try {
    const response = await axiosPublic.get(`/categories/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
