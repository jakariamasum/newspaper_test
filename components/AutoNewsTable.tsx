"use client";

import { deleteAutoNews } from "@/app/services/autoNewsServices";
import { IAutoNews } from "@/types/auto-news.types";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import AutoNewsModal from "./AutoNewsModal";
import { ILanguage } from "@/types/language.types";
import { ICategory } from "@/types/category.types";
import { ISubCategory } from "@/types/subcategory.types";

interface AutoNewsTableProps {
  initialAutoNews: IAutoNews[];
  languages: ILanguage[];
  categories: ICategory[];
  subcategories: ISubCategory[];
}

export default function AutoNewsTable({
  initialAutoNews,
  languages,
  categories,
  subcategories,
}: AutoNewsTableProps) {
  const [autoNews, setAutoNews] = useState(initialAutoNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<IAutoNews | null>(null);

  const handleEdit = (news: IAutoNews) => {
    setEditingNews(news);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleModalSave = (updatedNews: IAutoNews) => {
    setAutoNews(
      autoNews.map((news) =>
        news._id === updatedNews._id ? updatedNews : news
      )
    );
    handleModalClose();
  };

  const handleDelete = async (id: string) => {
    const success = await deleteAutoNews(id);
    if (success) {
      setAutoNews((prevNews) => prevNews.filter((n) => n._id !== id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {autoNews.map((news) => (
              <tr key={news._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{news.language}</td>
                <td className="px-6 py-4">{news.category.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      news.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {news.status}
                  </span>
                </td>
                <td className="px-6 py-4">{news.duration} min</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(news)}
                    className="font-medium text-blue-600 hover:underline mr-2"
                  >
                    <BiEdit className="text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    <BiTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && editingNews && (
        <AutoNewsModal
          news={editingNews}
          onClose={handleModalClose}
          onSave={handleModalSave}
          languages={languages}
          categories={categories}
          subcategories={subcategories}
        />
      )}
    </div>
  );
}
