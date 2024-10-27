"use client";
import React, { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { INews } from "@/types/news.types";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { deleteNewsItem } from "@/app/services/admin/NewsServices";

const IndexPage: React.FC = () => {
  const router = useRouter();
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos?.map((video) => (
            <div
              key={video._id}
              className="bg-white overflow-hidden shadow-sm rounded-lg"
            >
              <div className="relative">
                <Image
                  src={video.img}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                  width={100}
                  height={48}
                />
                <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {video.status}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {video.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-3">
                  {video.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  Published:{" "}
                  {new Date(video.publishedDate).toLocaleDateString()}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`https://www.youtube.com/watch?v=${video.video}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Watch on YouTube
                  </Link>
                  <div className="flex space-x-2">
                    <Link href={`/admin/videos/edit/${video._id}`}>
                      <button className="text-gray-600 hover:text-blue-600 transition-colors">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(video)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
