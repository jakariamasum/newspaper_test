"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";
import Loader from "@/components/Loader";
import { useLang } from "@/app/context/langContext";
import { INews } from "@/types/news.types";

const IndexPage: React.FC = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const router = useRouter();
  const { lang } = useLang();
  console.log(lang);

  useEffect(() => {
    const fetchNews = async () => {
      if (!lang) return;

      setLoading(true);
      try {
        const response = await axiosPublic.get(`/news/${lang}`);
        setNews(response.data.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [lang]);

  const handleEdit = (item: INews) => {
    router.push(`/admin/post/edit/${item._id}`);
  };

  const handleDelete = (item: INews) => {
    setEditItem(item);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (editItem) {
      const response = await axiosPublic.delete(`/news/admin/${editItem._id}`);
      if (response.status === 200) {
        toast.success("News Deleted successfully!");
        setNews((prevNews) => prevNews.filter((n) => n._id !== editItem._id));
      } else {
        toast.warning("Something went wrong!");
      }
      setDeleteConfirmOpen(false);
      setEditItem(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">News</h1>
        <Link
          href="/admin/post/add"
          className="bg-main py-1 px-4 rounded-md text-white"
        >
          Add
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-300">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-normal break-words text-sm font-medium text-gray-900 max-w-xs">
                  {item.title}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <Link
                    href={`/news/${item._id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline"
                  >
                    See Details
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item?.category?.category?.title || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <FaEdit className="inline-block text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <FaTrash className="inline-block text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this news item?</p>
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
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default IndexPage;
