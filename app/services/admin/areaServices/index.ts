import axiosPublic from "@/lib/axiosPublic";
import { IArea } from "@/types/location.types";
import { toast } from "sonner";

export const updateAreaName = async (
  id: string,
  content: string
): Promise<boolean> => {
  try {
    const response = await axiosPublic.put(
      `/area/admin/${id}`,
      { title: content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(`Area updated successfully!`);
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    console.error(`Error update area:`, error);
    toast.error(`Error update area`);
    return false;
  }
};
export const toggleAreaStatus = async (
  area: Partial<IArea>
): Promise<boolean> => {
  try {
    const response = await axiosPublic.put(
      `/area/admin/${area._id}`,
      { isActive: !area.isActive },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(`Area updated successfully!`);
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    console.error(`Error updating area:`, error);
    toast.error(`Error update area`);
    return false;
  }
};
