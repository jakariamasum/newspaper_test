import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";

export const createNewsItem = async (
  payload: any,
  content: string
): Promise<boolean> => {
  try {
    const response = await axiosPublic.put(`/news/admin`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 200) {
      toast.success(`${content} created successfully!`);
      return true;
    } else {
      toast.warning(`Failed to create ${content}`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to create ${content}:`, error);
    toast.warning(`Failed to create ${content}`);
    return false;
  }
};
export const updateNewsItem = async (
  _id: string,
  payload: any,
  content: string
): Promise<boolean> => {
  try {
    const response = await axiosPublic.put(`/news/admin/${_id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 200) {
      toast.success(`${content} updated successfully!`);
      return true;
    } else {
      toast.warning(`Failed to update ${content}`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to update ${content}:`, error);
    toast.warning(`Failed to update ${content}`);
    return false;
  }
};

export const deleteNewsItem = async (
  id: string,
  content: string
): Promise<boolean> => {
  try {
    const response = await axiosPublic.delete(`/news/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.status === 200) {
      toast.success(`${content} deleted successfully!`);
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    console.error(`Error deleting ${content}:`, error);
    toast.error(`Error deleting ${content}`);
    return false;
  }
};
