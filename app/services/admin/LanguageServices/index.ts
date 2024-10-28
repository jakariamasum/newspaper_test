import axiosPublic from "@/lib/axiosPublic";
import { ILanguage } from "@/types/language.types";
import { toast } from "sonner";

export const getAllLanguages = async (lang: string) => {
  try {
    const response = await axiosPublic.get(`/language`);
    return response.data.data;
  } catch (error) {
    console.log("error fetching languages", error);
    return [];
  }
};
export const getSingleLanguage = async (lang: string) => {
  try {
    const response = await axiosPublic.get(`/language?lang=${lang}`);
    return response.data.data;
  } catch (error) {
    console.log("error fetching languages", error);
    return {};
  }
};

export const updateLanguage = async (
  langId: string,
  LanguageData: ILanguage
) => {
  try {
    const response = await axiosPublic.put(
      `/language/admin/${langId}`,
      LanguageData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Language updated successfully!");
      return true;
    }
  } catch (error) {
    console.error("Failed to update langauge:", error);
    toast.error("Failed to update language. Please try again.");
    return false;
  }
};
