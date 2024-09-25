/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import { useNewsByLanguage } from "@/lib/useNewsByLanguage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdPublish } from "react-icons/md";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";
import moment from "moment";
import { useLang } from "@/app/context/langContext";
import Loader from "@/components/Loader";

interface TNews {
  _id: string;
  title: string;
  content: string;
  author: {
    title: string;
  };
  status: string;
  lang?: string;
  category: {
    _id: string;
    category: {
      title: string;
    };
  };
  updatedAt: string;
}

const ModuleTypePage = () => {
  const router = useRouter();
  const { link } = useParams();
  const { setLang, lang } = useLang();
  const [news, setNews] = useState<TNews[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<TNews | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // Handlers for edit and delete actions
  const handleEdit = (item: TNews) => {
    router.push(`/admin/post/edit/${item._id}`);
  };

  const handleApprove = async (id: string) => {
    try {
      const payload = {
        status: "published",
      };
      const response = await axiosPublic.put(`/news/admin/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        // Assuming `setNews` is the state updater for your news list
        setNews((prevNews) =>
          prevNews.map((newsItem) =>
            newsItem._id === id
              ? { ...newsItem, status: "published" }
              : newsItem
          )
        );
        toast.success("News Published successfully!");
      } else {
        toast.warning("Failed to publish news");
      }
    } catch (error) {
      console.error("Failed to publish news:", error);
      toast.warning("Failed to publish news");
    }
  };

  const handleDelete = (newsItem: TNews) => {
    setCurrentNews(newsItem);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentNews) {
      const response = await axiosPublic.delete(
        `/news/admin/${currentNews._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("News Deleted successfully!");
        setNews((prevNews) =>
          prevNews.filter((n) => n._id !== currentNews._id)
        );
      } else {
        toast.warning("Something went wrong!");
      }
      setDeleteConfirmOpen(false);
      setCurrentNews(null);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const newsData = await useNewsByLanguage(link as string);
      setNews(newsData);
      setLoading(false);
    };

    fetchNews();
    setLang(link as string);
  }, [link, setLang]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold mb-4">News Details</h1>
        <div className="flex gap-2">
          <Link
            className={`hover:bg-main hover:text-white p-2 block`}
            href="/admin/post"
            onClick={() => setLang(link as string)}
          >
            News
          </Link>
          <Link
            className={`hover:bg-main hover:text-white p-2 block`}
            href="/admin/category"
          >
            Category
          </Link>
          <Link
            className={`hover:bg-main hover:text-white p-2 block`}
            href="/admin/subcategory"
          >
            SubCategory
          </Link>
        </div>
        <Link
          href="/admin/post/add"
          className="bg-main py-1 px-4 rounded-md text-white"
        >
          Add
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b w-[350px] break-words whitespace-normal">
                Title
              </th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Publish Date</th>
              <th className="py-2 px-4 border-b flex gap-1 items-center ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n._id}>
                <td className="py-2 px-4 border-b hover:underline hover:text-blue-500">
                  <Link href={`/news/${n._id}`}>{n.title}</Link>
                </td>
                <td className="py-2 px-4 border-b">{n.author.title}</td>
                <td className="py-2 px-4 border-b">
                  {n.category.category.title}
                </td>
                <td className={`py-2 px-4 border-b text-white `}>
                  <span
                    className={` px-3 py-1 text-center rounded-md
                    ${
                      n.status === "published" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {n.status}
                  </span>
                </td>

                <td className="py-2 px-4 border-b">
                  {moment(n.updatedAt).format("MMMM Do YYYY")}
                </td>
                <td className="py-2 px-4 border-b flex gap-2">
                  {n?.status !== "published" && (
                    <span onClick={() => handleApprove(n._id)}>
                      <MdPublish
                        fill="green"
                        size={22}
                        className="cursor-pointer"
                      />
                    </span>
                  )}
                  <span onClick={() => handleEdit(n)}>
                    <FaEdit fill="blue" size={22} className="cursor-pointer" />
                  </span>
                  <span onClick={() => handleDelete(n)}>
                    <MdDelete fill="red" size={22} className="cursor-pointer" />
                  </span>
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

      {news?.length === 0 && (
        <div className="text-center text-red-500 mt-5 font-semibold">
          Sorry. There is no news.
        </div>
      )}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default ModuleTypePage;
