import axiosPublic from "./axiosPublic";

export const useSingleUser = async (id: string) => {
  try {
    const response = await axiosPublic.get(`/user/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};
