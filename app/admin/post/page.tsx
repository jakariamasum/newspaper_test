/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useLang } from "@/app/context/langContext";
import { useEffect, useState } from "react";
import { useAllNews } from "@/lib/useAllNews";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

const IndexPage: React.FC = () => {
  const { lang } = useLang();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(lang);
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const fetchedNews = await useAllNews();
        setNews(fetchedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [lang]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
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
                Languages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Details
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.lang ? item.lang : "No languages available"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <Link
                    href={`/news/${item._id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline"
                  >
                    See Details
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-x-2">
                  <Link
                    href={`/news/edit/${item._id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    aria-label="Edit"
                  >
                    <FaEdit className="inline-block text-xl" />
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    aria-label="Delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrash className="inline-block text-xl" />
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

// Placeholder function for delete handling
const handleDelete = async (id: string) => {
  // Implement delete functionality here
  console.log("Delete item with id:", id);
};

export default IndexPage;
