"use client";

import { useState, useEffect } from "react";
import { getCategoryByLang } from "@/app/services/categoryServices";
import { getSubCategoryByLang } from "@/app/services/subCategoryServices";
import axiosPublic from "@/lib/axiosPublic";
import { IAutoNews } from "@/types/auto-news.types";
import { IAuthor } from "@/types/author.types";
import { ICategory } from "@/types/category.types";
import { ISubCategory } from "@/types/subcategory.types";
import { ILanguage } from "@/types/language.types";
import { updateAutoNews } from "@/app/services/autoNewsServices";

interface EditModalProps {
  news: IAutoNews;
  onClose: () => void;
  onSave: (updatedNews: IAutoNews) => void;
  languages: ILanguage[];
  categories: ICategory[];
  subcategories: ISubCategory[];
}

export default function AutoNewsModal({
  news,
  onClose,
  onSave,
  languages,
  categories,
  subcategories,
}: EditModalProps) {
  const [Loading, setIsLoading] = useState<boolean>(false);
  const [editedNews, setEditedNews] = useState<IAutoNews>({
    ...news,
    category: news.category || { _id: "", title: "" },
    subcategory: news.subcategory || "",
  });
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [currentCategories, setCurrentCategories] =
    useState<ICategory[]>(categories);
  const [currentSubcategories, setCurrentSubcategories] =
    useState<ISubCategory[]>(subcategories);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const newCategories = await getCategoryByLang(editedNews.language);
        setCurrentCategories(newCategories);
        setEditedNews((prev) => ({
          ...prev,
          category: prev.category._id ? prev.category : { _id: "", title: "" },
          subcategory: news.subcategory || "",
        }));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [editedNews.language]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const newSubcategories = await getSubCategoryByLang(editedNews.language);
      setCurrentSubcategories(newSubcategories);
    };
    const fetchUsers = async () => {
      const response = await axiosPublic.get("/user/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setAuthors(response.data.data);
    };
    fetchUsers();
    fetchSubcategories();
  }, [editedNews.language]);
  console.log(currentSubcategories);

  const filteredSubcategories = currentSubcategories.filter(
    (sub) => sub.category === editedNews.category._id
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    const category = currentCategories.find((cat) => cat._id === categoryId);
    setEditedNews((prev) => ({
      ...prev,
      category: category
        ? { _id: category._id, title: category.title }
        : { _id: "", title: "" },
      subcategory: editedNews.subcategory ? editedNews.subcategory : "",
    }));
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryId = e.target.value;
    setEditedNews((prev) => ({
      ...prev,
      subcategory: subcategoryId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...editedNews,
      category: editedNews.category._id,
    };
    console.log(payload);
    const success = await updateAutoNews(editedNews._id, payload);
    if (success) {
      onSave(editedNews);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Edit Auto News
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <select
              id="language"
              required
              name="language"
              value={editedNews.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              {languages.map((lang) => (
                <option key={lang._id} value={lang.language_code}>
                  {lang.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              required
              name="category"
              value={editedNews.category._id}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              <option value="">Select a category</option>
              {currentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {Loading && (
              <p className="text-sm text-muted-foreground">
                Loading categories...
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700"
            >
              Subcategory (Optional)
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={editedNews.subcategory || ""}
              onChange={handleSubcategoryChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              disabled={!editedNews.category._id}
            >
              <option value="">Select a subcategory</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              required
              name="status"
              value={editedNews.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <select
              id="author"
              name="author"
              value={editedNews.author || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              <option value="">Select author</option>
              {authors?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={editedNews.duration}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <textarea
              id="link"
              required
              name="link"
              rows={3}
              value={editedNews?.link || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter link"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
