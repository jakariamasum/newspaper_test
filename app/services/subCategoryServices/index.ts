import axiosPublic from "@/lib/axiosPublic";

export const getSubCategoryByLang = async (lang: string) => {
  try {
    const response = await axiosPublic.get(`/sub-categories/${lang}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    return [];
  }
};
