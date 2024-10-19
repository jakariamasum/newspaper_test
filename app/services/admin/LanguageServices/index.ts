import axiosPublic from "@/lib/axiosPublic";
import { ILanguage } from "@/types/language.types";
import { toast } from "sonner";

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
