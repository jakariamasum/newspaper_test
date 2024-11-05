"use client";

import { getCategoryByLang } from "@/app/services/categoryServices";
import { getSubCategoryByLang } from "@/app/services/subCategoryServices";
import { IAutoNews } from "@/types/auto-news.types";
import { ICategory } from "@/types/category.types";
import { ILanguage } from "@/types/language.types";
import { ISubCategory } from "@/types/subcategory.types";
import { useEffect, useState } from "react";

interface EditModalProps {
  news: IAutoNews;
  onClose: () => void;
  onSave: (updatedNews: IAutoNews) => void;
  languages: ILanguage[];
  categories: ICategory[];
  subcategories: ISubCategory[];
}

const AutoNewsModal = ({
  news,
  onClose,
  onSave,
  languages,
  categories,
  subcategories,
}: EditModalProps) => {
  const [editedNews, setEditedNews] = useState<IAutoNews>({ ...news });
  const [currentCategories, setCurrentCategories] =
    useState<ICategory[]>(categories);
  const [currentSubcategories, setCurrentSubcategories] =
    useState<ISubCategory[]>(subcategories);

  useEffect(() => {
    const fetchCategories = async () => {
      const newCategories = await getCategoryByLang(editedNews.language);
      setCurrentCategories(newCategories);
      setEditedNews((prev) => ({
        ...prev,
        category: { _id: "", title: "" },
        subcategory: undefined,
      }));
    };
    fetchCategories();
  }, [editedNews.language]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const newSubcategories = await getSubCategoryByLang(editedNews.language);
      setCurrentSubcategories(newSubcategories);
    };
    fetchSubcategories();
  }, [editedNews.language]);

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
      subcategory: undefined,
    }));
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryId = e.target.value;
    const subcategory = currentSubcategories.find(
      (subcat) => subcat._id === subcategoryId
    );
    setEditedNews((prev) => ({
      ...prev,
      subcategory: subcategory ? subcategoryId : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editedNews);
    onSave(editedNews);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Auto News</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <select
              id="language"
              name="language"
              value={editedNews.language}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {languages.map((lang) => (
                <option key={lang._id} value={lang.language_code}>
                  {lang.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={editedNews.category._id}
              onChange={handleCategoryChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={editedNews.subcategory || ""}
              onChange={handleSubcategoryChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">None</option>
              {subcategories
                .filter((subcat) => subcat.category === editedNews.category._id)
                .map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.title}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={editedNews.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="links"
              className="block text-sm font-medium text-gray-700"
            >
              Links
            </label>
            <textarea
              id="links"
              name="links"
              value={editedNews.link}
              onChange={(e) =>
                setEditedNews((prev) => ({ ...prev, link: e.target.value }))
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AutoNewsModal;
