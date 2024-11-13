import axiosPublic from "@/lib/axiosPublic";

export const getAllCategory = async () => {
  try {
    const response = await axiosPublic.get("/categories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const getCategoryByLang = async (lang: string) => {
  try {
    const response = await axiosPublic.get(`/categories/type/${lang}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
