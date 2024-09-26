"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

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

interface BuilderProps {
  params: {
    _id: string;
  };
}

const StoryDetailsPage: React.FC<BuilderProps> = ({ params }) => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const response = await axiosPublic.get(`/story/${params._id}`);
        setStory(response.data.data);
      } catch (err) {
        setError("Failed to load story details.");
      } finally {
        setLoading(false);
      }
    };

    if (params._id) {
      fetchStoryDetails();
    }
  }, [params._id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/stories">
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200">
              <FaArrowLeft className="mr-2" /> Back to Stories
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {story?.title}
          </h1>

          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-4 py-1 rounded-full">
              {story?.category.title}
            </span>
            {story?.subCategory && (
              <span className="ml-2 inline-block bg-main text-white text-sm font-medium px-4 py-1 rounded-full">
                {story?.subCategory?.title}
              </span>
            )}
          </div>

          {story?.banners && story.banners.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {story.banners.map((banner) => (
                <div key={banner._id} className="relative rounded-lg shadow-md">
                  <Image
                    src={banner.img}
                    alt={banner.title}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 rounded-b-lg">
                    {banner.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryDetailsPage;
