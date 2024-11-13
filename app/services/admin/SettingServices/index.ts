import axiosPublic from "@/lib/axiosPublic";
import { TSetting } from "@/types/settings.types";
import { toast } from "sonner";

export const getAllSettings = async () => {
  try {
    const response = await axiosPublic.get("/settings");
    console.log(response.data.data[0]);
    return response.data.data[0];
  } catch (error) {
    console.log("Error fetching settings", error);
  }
};

export const updateSettings = async (
  settingsId: string,
  settingData: Partial<TSetting>
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
