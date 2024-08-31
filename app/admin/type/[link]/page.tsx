/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import { useNewsByLanguage } from "@/lib/useNewsByLanguage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";
import moment from "moment";
import { useLang } from "@/app/context/langContext";

interface TNews {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  author: {
    title: string;
  };
  page_tag: string;
  publish_date?: string;
  status: string;
  views: number;
  likes: number;
  dislikes: number;
  lang?: string;
  category: {
    _id: string;
    category: {
      title: string;
    };
  };
}

const ModuleTypePage = () => {
  const router = useRouter();
  const { link } = useParams();
  const { setLang, lang } = useLang();
  const [news, setNews] = useState<TNews[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<TNews | null>(null);
  const [editedNews, setEditedNews] = useState<TNews | null>(null);

  // Handlers for edit and delete actions
  const handleEdit = (item: TNews) => {
    router.push(`/admin/post/edit/${item._id}`);
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedNews) {
      console.log(editedNews);
      const response = await axiosPublic.put(
        `/news/admin/${editedNews._id}`,
        editedNews,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("News Updated successfully!");
        setNews((prevNews) =>
          prevNews.map((n) => (n._id === editedNews._id ? editedNews : n))
        );
      }
      setEditModalOpen(false);
      setEditedNews(null);
      setCurrentNews(null);
    } else {
      toast.warning("Something went wrong!");
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedNews((prev) => ({ ...prev!, [name]: value }));
  };

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await useNewsByLanguage(link as string);
      setNews(newsData);
    };

    fetchNews();
    setLang(link as string);
  }, [link, setLang]);

  if (news.length < 1) {
    return <div className="text-center">Loding.....</div>;
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
              <th className="py-2 px-4 border-b">Content</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Category</th>

              <th className="py-2 px-4 border-b">Publish Date</th>
              <th className="py-2 px-4 border-b flex gap-1 items-center ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n._id}>
                <td className="py-2 px-4 border-b">{n.title}</td>
                <td className="py-2 px-4 border-b hover:underline text-blue-500">
                  <Link href={`/news/${n._id}`}>See details</Link>
                </td>
                <td className="py-2 px-4 border-b">{n.author.title}</td>
                <td className="py-2 px-4 border-b">
                  {n.category.category.title}
                </td>

                <td className="py-2 px-4 border-b">
                  {moment(n.publish_date).format("MMMM Do YYYY")}
                </td>
                <td className="py-2 px-4 border-b flex gap-2">
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
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit News</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={currentNews?.title}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Content</label>
                <textarea
                  name="content"
                  defaultValue={currentNews?.content}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <select
                  name="status"
                  defaultValue={currentNews?.status}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleEditChange}
                >
                  <option value="published">published</option>
                  <option value="draft">draft</option>
                  <option value="unavailable">unavailable</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default ModuleTypePage;
