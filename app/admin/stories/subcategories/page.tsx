"use client";
import Loader from "@/components/Loader";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

interface SubCategory {
  _id: string;
  title: string;
}

const IndexPage: React.FC = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<SubCategory | null>(
    null
  );
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    const fetchSubCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosPublic.get(
          `/sub-categories/sub-category/types?type=story`
        );
        setSubCategories(response.data.data);
      } catch (error) {
        toast.error("Error fetching categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubCategories();
  }, []);

  const handleEdit = (category: SubCategory) => {
    setSelectedCategory(category);
    setNewTitle(category.title);
  };

  const handleSaveEdit = async () => {
    if (selectedCategory) {
      try {
        await axiosPublic.put(
          `/sub-categories/admin/${selectedCategory._id}`,
          {
            title: newTitle,
          },
          {
            headers: {
              Authorization: `Beares ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setSubCategories((prevSubCategories) =>
          prevSubCategories.map((subCategory) =>
            subCategory._id === selectedCategory._id
              ? { ...subCategory, title: newTitle }
              : subCategory
          )
        );
        toast.success("Sub Category updated successfully");
        setSelectedCategory(null);
      } catch (error) {
        toast.error("Error updating subCategory");
        console.error("Error updating subCategory:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosPublic.delete(`/sub-categories/admin/${id}`, {
        headers: {
          Authorization: `Beares ${localStorage.getItem("authToken")}`,
        },
      });
      setSubCategories(
        subCategories.filter((subCategory) => subCategory._id !== id)
      );
      toast.success("Sub Category deleted successfully");
    } catch (error) {
      toast.error("Error deleting sub-category");
      console.error("Error deleting sub-category:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex gap-2 items-center mb-2">
          <Link
            href="/admin/stories/subcategories/add"
            className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Add Sub-category
          </Link>
        </div>
        <div className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm p-4">
          {subCategories.map((subCategory) => (
            <div
              key={subCategory._id}
              className="flex justify-between items-center p-4"
            >
              <div className="text-gray-700 font-medium">
                {subCategory.title}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(subCategory)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(subCategory._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl mb-4">Edit Sub Category</h2>
            <label className="block mb-2">Sub Category Name</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
