"use client";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useState, useEffect } from "react";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";

interface Banner {
  img: string;
  title: string;
  _id: string;
}

interface Story {
  _id: string;
  title: string;
  category: { title: string };
  subCategory?: { title: string };
  banners: Banner[];
  createdAt: string;
  updatedAt: string;
}

const IndexPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosPublic.get("/story");
        setStories(response.data.data);
      } catch (err) {
        setError("Failed to fetch stories");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="my-4 text-right">
        <Link
          href="/admin/stories/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add New Story
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              <div className={`grid grid-cols-${story.banners.length} gap-2`}>
                {story.banners.map((banner, index) => (
                  <div key={banner._id} className="relative">
                    <Image
                      src={banner.img}
                      alt={banner.title}
                      width={450}
                      height={300}
                      className="rounded-lg object-cover h-48 w-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 rounded-b-lg">
                      {banner.title}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {story.title}
                </h2>
                <p className="text-gray-600">
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
                    {story.category.title}
                  </span>
                  {story?.subCategory?.title && (
                    <span className="bg-main text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {story?.subCategory?.title}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaCalendarAlt />
                  <span>
                    : {moment(story.createdAt).format("MMMM Do YYYY")}
                  </span>
                </p>
                <Link
                  href={`/story/${story._id}`}
                  className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default IndexPage;
