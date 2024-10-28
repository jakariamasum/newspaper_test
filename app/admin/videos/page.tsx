"use client";
import React, { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { Toaster } from "sonner";
import Image from "next/image";
import Loader from "@/components/Loader";
import { INews } from "@/types/news.types";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { deleteNewsItem } from "@/app/services/admin/NewsServices";

const IndexPage: React.FC = () => {
  const [videos, setVideos] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<INews | null>(null);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosPublic.get("/news/type/videos");
        setVideos(response.data.data);
      } catch (err) {
        setError("Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleDelete = (newsItem: INews) => {
    setCurrentVideo(newsItem);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentVideo) {
      const success = await deleteNewsItem(currentVideo._id, "video");
      if (success) {
        setVideos((prevVideos) =>
          prevVideos.filter((n) => n._id !== currentVideo._id)
        );
      }
      setDeleteConfirmOpen(false);
      setCurrentVideo(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="my-4 flex justify-end items-center gap-2">
          <div className="flex gap-1">
            <Link
              className={`hover:bg-main hover:text-white p-2 block`}
              href="/admin/videos/categories"
            >
              Category
            </Link>
            <Link
              className={`hover:bg-main hover:text-white p-2 block`}
              href="/admin/videos/subcategories"
            >
              SubCategory
            </Link>
          </div>
          <Link
            href="/admin/videos/add"
            className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Add New Video
          </Link>
        </div>{" "}
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos?.map((video) => (
                <tr key={video._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          className="h-10 w-10 rounded-full object-cover"
                          src={video.img}
                          alt=""
                          layout="fill"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {video.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {video.tags.map((tag, index) => (
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
                      {video.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(video.publishedDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 flex justify-start items-center gap-1 text-sm font-medium">
                    <Link href={`videos/edit/${video._id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(video)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
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
            <p>Are you sure you want to delete this video item?</p>
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

      {videos?.length === 0 && (
        <div className="text-center text-red-500 mt-5 font-semibold">
          Sorry. There is no stories.
        </div>
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default IndexPage;
