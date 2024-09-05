"use client";
import React, { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ICategory {
  category: { title: string };
  subCategory?: { title: string };
}

interface IVideo {
  _id: string;
  title: string;
  video: string;
  tags: string[];
  description: string;
  category: ICategory;
}

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentVideo, setCurrentVide] = useState<IVideo | null>(null);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosPublic.get("/videos");
        setVideos(response.data.data);
      } catch (err) {
        setError("Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleEdit = (video: IVideo) => {
    router.push(`/admin/videos/edit/${video._id}`);
  };

  const handleDelete = (item: IVideo) => {
    setCurrentVide(item);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentVideo) {
      const response = await axiosPublic.delete(
        `/videos/admin/${currentVideo._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Video Deleted successfully!");
        setVideos((prevVideos) =>
          prevVideos.filter((n) => n._id !== currentVideo._id)
        );
      } else {
        toast.warning("Something went wrong!");
      }
      setDeleteConfirmOpen(false);
      setCurrentVide(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Manage Videos
        </h1>
        <Link
          href="/admin/videos/add"
          className="bg-main py-1 px-4 rounded-md text-white"
        >
          Add
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Video
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {videos?.map((video) => (
              <tr key={video._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {video.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {video.video && (
                    <Image
                      src={`https://i.ytimg.com/vi/${video.video}/mqdefault.jpg`}
                      width={120}
                      height={90}
                      alt={video.title}
                      className="rounded-lg"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 ">
                  {video.category.category.title}
                  {video.category.subCategory && (
                    <span className="text-gray-500 text-xs ml-2">
                      ({video.category.subCategory.title})
                    </span>
                  )}
                </td>
                <td className=" px-6 py-4 text-sm text-gray-800">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mr-5"
                    onClick={() => handleEdit(video)}
                  >
                    <FaEdit size={22} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(video)}
                  >
                    <FaTrash size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this news item?</p>
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
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default IndexPage;
