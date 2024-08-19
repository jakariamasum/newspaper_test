"use client";
import axiosPublic from "@/lib/axiosPublic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface IAds {
  _id: string;
  position: string;
  type: string;
  content: any;
}

const IndexPage: React.FC = () => {
  const [ads, setAds] = useState<IAds[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axiosPublic.get("/ads");
      setAds(response.data.data);
    };
    fetchAds();
  }, []);

  const handleEdit = (id: string) => {
    // TODO:Edit func
    console.log("Edit", id);
  };

  const handleDelete = (id: string) => {
    // TODO: Delete func
    console.log("Delete", id);
  };

  return (
    <div className="space-y-8">
      {/* Code Ads Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Ads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads
            .filter((ad) => ad.type === "code")
            .map((ad) => (
              <div
                key={ad._id}
                className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 items-center">
                    <h2 className="text-lg font-bold text-gray-800">
                      {ad.position.toUpperCase()}
                    </h2>
                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-200 rounded">
                      {ad.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(ad._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: ad.content }}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Image Ads Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Image Ads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads
            .filter((ad) => ad.type === "images")
            .map((ad) => (
              <div
                key={ad._id}
                className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 items-center">
                    <h2 className="text-lg font-bold text-gray-800">
                      {ad.position.toUpperCase()}
                    </h2>
                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-200 rounded">
                      {ad.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(ad._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <Link
                  href={ad.content.link as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={ad.content.image}
                    alt={`${ad.position} Ad`}
                    className="w-full h-48 object-cover rounded"
                    width={696}
                    height={464}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
