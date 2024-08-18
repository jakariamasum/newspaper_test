"use client";
import React, { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

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
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(videos);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosPublic.get("/videos");
        console.log(response.data.data);
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
    // Implement your edit logic here
    console.log("Editing video:", video);
    toast("Edit functionality is not yet implemented.");
  };

  const handleDelete = async (videoId: string) => {
    try {
      await axiosPublic.delete(`/news/${videoId}`);
      setVideos((prev) => prev.filter((video) => video._id !== videoId));
      toast.success("Video deleted successfully!");
    } catch (error) {
      console.error("Failed to delete video:", error);
      toast.error("Failed to delete video.");
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
                    onClick={() => handleDelete(video._id)}
                  >
                    <FaTrash size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexPage;
