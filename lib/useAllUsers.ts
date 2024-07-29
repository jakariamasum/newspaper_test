import axiosPublic from "./axiosPublic";

export const useAllUsers = async () => {
  try {
    const response = await axiosPublic.get(`/user`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
