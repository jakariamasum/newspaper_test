"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import Loader from "@/components/Loader";
import { toast, Toaster } from "sonner";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiGrid,
  FiLayers,
  FiEye,
} from "react-icons/fi";
import { INews } from "@/types/news.types";

const IndexPage: React.FC = () => {
  const [stories, setStories] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentStory, setCurrentStory] = useState<INews | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosPublic.get("/news/type/stories");
        setStories(response.data.data);
      } catch (err) {
        console.error("Failed to fetch stories", err);
        toast.error("Failed to load stories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleDelete = (newsItem: INews) => {
    setCurrentStory(newsItem);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentStory) {
      const response = await axiosPublic.delete(
        `/news/admin/${currentStory._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Story Deleted successfully!");
        setStories((prevStroy) =>
          prevStroy.filter((n) => n._id !== currentStory._id)
        );
      } else {
        toast.warning("Something went wrong!");
      }
      setDeleteConfirmOpen(false);
      setCurrentStory(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Story Library</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              className="flex items-center gap-2 bg-white text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition duration-300"
              href="/admin/stories/categories"
            >
              <FiGrid className="w-4 h-4" />
              Category
            </Link>
            <Link
              className="flex items-center gap-2 bg-white text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition duration-300"
              href="/admin/stories/subcategories"
            >
              <FiLayers className="w-4 h-4" />
              SubCategory
            </Link>
            <Link
              href="/admin/stories/add"
              className="flex items-center gap-2 bg-main text-white py-2 px-4 rounded-lg shadow-md hover:bg-main-dark transition duration-300"
            >
              <FiPlus className="w-4 h-4" />
              Add New Story
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Story
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Published Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Images
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stories.map((story) => (
                <tr key={story._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          className="h-10 w-10 rounded-full object-cover"
                          src={story.stories[0]?.img}
                          alt=""
                          layout="fill"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {story.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {story.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {story.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(story.publishedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {story.stories.length}
                  </td>
                  <td className="px-6 py-4 flex justify-start items-center gap-1 text-sm font-medium">
                    <Link href={`stories/edit/${story._id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(story)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/admin/stories/${story._id}`}
                      className="text-green-600 hover:text-green-900"
                    >
                      <FiEye className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this story item?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {stories?.length === 0 && (
        <div className="text-center text-red-500 mt-5 font-semibold">
          Sorry. There is no stories.
        </div>
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default IndexPage;
