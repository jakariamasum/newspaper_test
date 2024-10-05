"use client";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast, Toaster } from "sonner";

interface ILanguage {
  _id: string;
  lang: string;
  title: string;
  link: string;
  status: string;
}

const IndexPage: React.FC = () => {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(
    null
  );
  const [editTitle, setEditTitle] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await axiosPublic.get("/language");
      setLanguages(response.data.data);
    };
    fetchLanguages();
  }, []);

  const openEditModal = (language: ILanguage) => {
    setSelectedLanguage(language);
    setEditTitle(language.title);
    setEditLink(language.link);
    setEditStatus(language.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLanguage(null);
  };

  const handleEditSave = async () => {
    if (selectedLanguage) {
      try {
        const updatedLanguage = {
          ...selectedLanguage,
          title: editTitle,
          link: editLink,
          status: editStatus,
        };
        const response = await axiosPublic.put(
          `/language/admin/${selectedLanguage._id}`,
          updatedLanguage,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Update successfull!");
          setLanguages((prevLanguages) =>
            prevLanguages.map((lang) =>
              lang._id === selectedLanguage._id ? updatedLanguage : lang
            )
          );
          closeModal();
        } else {
          toast.error("Something wrong");
        }
      } catch (error) {
        toast.error("Failed to update language");
        console.log(error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold mb-4">Available Languages</h2>
        <Link
          href={`type/add`}
          className="bg-main py-1 px-4 rounded-md text-white"
        >
          Add
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {languages.map((language: ILanguage) => (
          <div
            key={language._id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center relative"
          >
            <h3 className="text-lg font-semibold mb-2">{language.title}</h3>

            <Link
              href={`type${language.link}`}
              className="text-blue-600 hover:text-blue-800 font-medium mb-4"
            >
              See News
            </Link>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => openEditModal(language)}
            >
              <FiEdit size={20} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Language</h2>
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

            <div className="flex justify-end">
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

export default IndexPage;
