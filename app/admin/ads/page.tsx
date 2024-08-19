"use client";
import axiosPublic from "@/lib/axiosPublic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, Toaster } from "sonner";

interface IAds {
  _id: string;
  position: string;
  type: string;
  content: any;
}

const IndexPage: React.FC = () => {
  const [ads, setAds] = useState<IAds[]>([]);
  const [editAd, setEditAd] = useState<IAds | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axiosPublic.get("/ads");
      setAds(response.data.data);
    };
    fetchAds();
  }, []);

  const handleEdit = (ad: IAds) => {
    setEditAd(ad);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (editAd) {
      console.log(editAd);
      try {
        const response = await axiosPublic.put(`/ads/${editAd._id}`, editAd);
        if (response.status === 200) {
          toast.success("updated");
          setAds((prevAds) =>
            prevAds.map((ad) => (ad._id === editAd._id ? editAd : ad))
          );
        }
      } catch (error) {
        console.log(error);
        toast.warning("failed");
      }

      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 mx-16 my-4">
      {/* Code Ads Section */}
      <div>
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
                      onClick={() => handleEdit(ad)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: ad.content! }}
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
                      onClick={() => handleEdit(ad)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <Link
                  href={ad.content.link!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={ad.content.image!}
                    alt={`${ad.position} Ad`}
                    className="w-full h-48 object-cover rounded"
                    width={696}
                    height={464}
                  />
                </Link>
                <input
                  type="text"
                  className="w-full p-2 mb-4 border rounded bg-gray-100 cursor-not-allowed"
                  value={ad.content.link}
                  readOnly
                />
              </div>
            ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editAd && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Edit Ad</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Position (Read-Only)
              </label>
              <input
                type="text"
                className="w-full p-2 mb-4 border rounded bg-gray-100 cursor-not-allowed"
                value={editAd.position}
                readOnly
              />
              {editAd.type === "code" && (
                <>
                  <label className="block text-gray-700 font-bold mb-2">
                    HTML code
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 mb-4 border rounded bg-gray-100"
                    value={editAd.content}
                    onChange={(e) =>
                      setEditAd({
                        ...editAd,
                        content: e.target.value,
                      })
                    }
                  />
                </>
              )}
            </div>
            {editAd.type === "images" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 mb-4 border rounded"
                    value={editAd.content.image}
                    onChange={(e) =>
                      setEditAd({
                        ...editAd,
                        content: { ...editAd.content, image: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Link URL
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 mb-4 border rounded"
                    value={editAd.content.link}
                    onChange={(e) =>
                      setEditAd({
                        ...editAd,
                        content: { ...editAd.content, link: e.target.value },
                      })
                    }
                  />
                </div>
              </>
            )}
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default IndexPage;
