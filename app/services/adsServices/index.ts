import axiosPublic from "@/lib/axiosPublic";

export const getAllAds = async () => {
  try {
    const response = await axiosPublic.get("/ads");
    return response.data.data;
  } catch (error) {
    console.log("Error fetching ads", error);
    return [];
  }
};
