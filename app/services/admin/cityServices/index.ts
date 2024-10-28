import axiosPublic from "@/lib/axiosPublic";
import { ICity } from "@/types/location.types";
import { toast } from "sonner";

export const updateCityName = async (
  id: string,
  content: string
): Promise<boolean> => {
  try {
    const response = await axiosPublic.put(
      `/city/admin/${id}`,
      { title: content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(`city updated successfully!`);
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    console.error(`Error update city:`, error);
    toast.error(`Error update city`);
    return false;
  }
};
export const toggleCityStatus = async (
  city: Partial<ICity>
): Promise<boolean> => {
  try {
    const response = await axiosPublic.put(
      `/city/admin/${city._id}`,
      { isActive: !city.isActive },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(`City updated successfully!`);
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    console.error(`Error updating city:`, error);
    toast.error(`Error update city`);
    return false;
  }
};
