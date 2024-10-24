"use client";

import { ILanguage } from "@/types/language.types";
import { useState } from "react";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";
import { toast, Toaster } from "sonner";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import { updateLanguage } from "@/app/services/admin/LanguageServices";
import { useRouter } from "next/navigation";

const Languages = ({ languages }: { languages: ILanguage[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(
    null
  );
  const [editTitle, setEditTitle] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [relatedPost, setRelatedPost] = useState("");
  const [popularPost, setPopularPost] = useState("");
  const [seeAll, setSeeAll] = useState("");
  const [copyright, setCopyright] = useState("");
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [orderPolicy, setOrderPolicy] = useState("");

  const openEditModal = (language: ILanguage) => {
    setSelectedLanguage(language || "");
    setEditTitle(language.title || "");
    setEditLink(language.link || "");
    setEditStatus(language.status || "");
    setRelatedPost(language.relatedPost || "");
    setPopularPost(language.popularPost || "");
    setSeeAll(language.seeAll || "");
    setCopyright(language.copyright || "");
    setOrderPolicy(language.orderPolicy || "");
    setPrivacy(language.privacy || "");
    setTerms(language.terms || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLanguage(null);
  };
  const router = useRouter();

  const handleEditSave = async () => {
    if (selectedLanguage) {
      try {
        const updatedLanguageData = {
          ...selectedLanguage,
          title: editTitle,
          link: editLink,
          status: editStatus,
          relatedPost,
          popularPost,
          seeAll,
          copyright,
          terms,
          privacy,
          orderPolicy,
        };
        const success = await updateLanguage(
          selectedLanguage?._id,
          updatedLanguageData
        );
        if (success) {
          router.refresh();
        }
        closeModal();
      } catch (error) {
        toast.error("Failed to update language");
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {languages.map((language) => (
          <div
            key={language._id}
            className={`bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center relative ${
              language.status === "active"
                ? "border-2 border-green-500"
                : "border-2 border-red-500"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{language.title}</h3>

            <div className="flex items-center mb-4">
              {language.status === "active" ? (
                <FiCheck className="text-green-500 mr-2" />
              ) : (
                <FiX className="text-red-500 mr-2" />
              )}
              <span
                className={`text-sm font-medium ${
                  language.status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {language.status.charAt(0).toUpperCase() +
                  language.status.slice(1)}
              </span>
            </div>

            <Link
              href={`type${language.link}`}
              className="text-blue-600 hover:text-blue-800 font-medium mb-4 transition duration-300 ease-in-out"
            >
              See News
            </Link>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
              onClick={() => openEditModal(language)}
            >
              <FiEdit size={20} />
            </button>
          </div>
        ))}
        <div
          className={`bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center relative 
               border-2 border-green-500`}
        >
          <h3 className="text-lg font-semibold mb-2">Story</h3>

          <div className="flex items-center mb-4">
            <FiCheck className="text-green-500 mr-2" />

            <span className={`text-sm font-medium ${"text-green-500"}`}>
              Active
            </span>
          </div>

          <Link
            href={`/admin/stories`}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 transition duration-300 ease-in-out"
          >
            See Stories
          </Link>
        </div>
        <div
          className={`bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center relative 
               border-2 border-green-500`}
        >
          <h3 className="text-lg font-semibold mb-2">Video</h3>

          <div className="flex items-center mb-4">
            <FiCheck className="text-green-500 mr-2" />

            <span className={`text-sm font-medium ${"text-green-500"}`}>
              Active
            </span>
          </div>

          <Link
            href={`/admin/videos`}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 transition duration-300 ease-in-out"
          >
            See Videos
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto h-auto max-h-screen">
            <h2 className="text-xl font-bold mb-4">Edit Language</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Link
                </label>
                <input
                  type="text"
                  value={editLink}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="block w-full py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Related Post
                </label>
                <input
                  type="text"
                  value={relatedPost}
                  onChange={(e) => setRelatedPost(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Popular Post
                </label>
                <input
                  type="text"
                  value={popularPost}
                  onChange={(e) => setPopularPost(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  See All
                </label>
                <input
                  type="text"
                  value={seeAll}
                  onChange={(e) => setSeeAll(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Copyright
                </label>
                <input
                  type="text"
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Terms & Conditions
                </label>
                <input
                  type="text"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Privacy Policy
                </label>
                <input
                  type="text"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Order Policy
                </label>
                <input
                  type="text"
                  value={orderPolicy}
                  onChange={(e) => setOrderPolicy(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-1 px-4 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-600 text-white py-1 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default Languages;
