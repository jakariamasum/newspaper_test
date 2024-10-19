import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";

interface SettingData {
  metaDescription: string;
  description: string;
  privacy: string;
  terms: string;
  logo: string;
  favicon: string;
  lotoImg: string;
  metaImg: string;
  title: string;
  bgColor: string;
  copyright: string;
  content: string;
}

export const updateSettings = async (
  settingsId: string,
  settingData: SettingData
) => {
  try {
    const response = await axiosPublic.put(
      `/settings/admin/${settingsId}`,
      settingData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Settings updated successfully!");
      return true;
    }
  } catch (error) {
    console.error("Failed to update settings:", error);
    toast.error("Failed to update settings. Please try again.");
    return false;
  }
};
