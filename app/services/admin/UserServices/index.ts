import { toast } from "sonner";
import axiosPublic from "@/lib/axiosPublic";
import { IAuthor } from "@/types/author.types";

export const handleUserDelete = async (userId: string) => {
  try {
    const response = await axiosPublic.delete(`/user/admin/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.status === 200) {
      toast.success("User deleted successfully!");
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    toast.error("Failed to delete user!");
    return false;
  }
};

export const handleUserEdit = async (updatedUser: IAuthor) => {
  try {
    const response = await axiosPublic.put(
      `/user/admin/${updatedUser._id}`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("User updated successfully!");
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    toast.error("Failed to update user!");
    return false;
  }
};

export const handleChangeUserStatus = async (
  userId: string,
  isActive: boolean
) => {
  try {
    const response = await axiosPublic.put(
      `/user/admin/${userId}`,
      { isActive },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(
        `User ${isActive ? "activated" : "deactivated"} successfully!`
      );
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    toast.error("Failed to update user status!");
    return false;
  }
};
export const handleChangeUserPassword = async (
  userId: string,
  password: string
) => {
  try {
    const response = await axiosPublic.put(
      `/admin/change-password/${userId}`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(`User password changed successfully!`);
      return true;
    } else {
      toast.warning("Something went wrong!");
      return false;
    }
  } catch (error) {
    toast.error("Failed to update user status!");
    return false;
  }
};
