import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";

export const createAutoNews = async (payload: any): Promise<boolean> => {
  try {
    const response = await axiosPublic.post(`/auto-news`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 200) {
      toast.success(`Auto News created successfully!`);
      return true;
    } else {
      toast.warning(`Failed to create auto news`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to create auto news:`, error);
    toast.warning(`Failed to create auto news`);
    return false;
  }
};

export const getAllAutoNews = async () => {
  const response = await axiosPublic.get(`/auto-news`);
  return response.data.data;
};

export const updateAutoNews = async (
  _id: string,
  payload: any
): Promise<boolean> => {
  try {
    const response = await axiosPublic.put(`/auto-news/${_id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 200) {
      toast.success(`auto news updated successfully!`);
      return true;
    } else {
      toast.warning(`Failed to update auto news`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to update auto news:`, error);
    toast.warning(`Failed to update auto news`);
    return false;
  }
};

export const deleteAutoNews = async (id: string): Promise<boolean> => {
  try {
    const response = await axiosPublic.delete(`/auto-news/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.status === 200) {
      toast.success(`auto news deleted successfully!`);
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    console.error(`Error deleting auto news:`, error);
    toast.error(`Error deleting auto news`);
    return false;
  }
};
