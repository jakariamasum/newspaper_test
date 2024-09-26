"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import Loader from "@/components/Loader";

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
}

const IndexPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(stories);

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

  const handleDelete = (id: string) => {
    console.log("Delete story with id: ", id);
  };

  if (loading) return <Loader />;
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

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Image
              </th>
              <th className="py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Title
              </th>
              <th className="py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Details
              </th>
              <th className="py-4 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stories.map((story) => (
              <tr
                key={story._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  {story.banners.length > 0 && (
                    <Image
                      src={story.banners[0].img}
                      alt={story.banners[0].title}
                      width={100}
                      height={80}
                      className="rounded-lg object-cover w-24 h-16"
                    />
                  )}
                </td>

                <td className="py-4 px-6 text-gray-800">
                  <h2 className="font-medium text-lg">{story.title}</h2>
                </td>
                <td className="py-4 px-6 text-gray-800">
                  <Link
                    href={`/story/${story._id}`}
                    className="bg-blue-600 text-white py-1 px-3 rounded-lg shadow hover:bg-blue-700 hover:underline"
                  >
                    Show Details
                  </Link>{" "}
                </td>

                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/stories/edit/${story._id}`}
                      className="bg-green-600 text-white py-1 px-3 rounded-lg shadow hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(story._id)}
                      className="bg-red-600 text-white py-1 px-3 rounded-lg shadow hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
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
