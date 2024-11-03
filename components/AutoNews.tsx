"use client";

import React, { useState, useEffect } from "react";
import { getCategoryByLang } from "@/app/services/categoryServices";
import { getSubCategoryByLang } from "@/app/services/subCategoryServices";
import { ILanguage } from "@/types/language.types";
import { ICategory } from "@/types/category.types";
import { ISubCategory } from "@/types/subcategory.types";
import { AutoNewsFormData } from "@/types/auto-news.types";
import { createAutoNews } from "@/app/services/autoNewsServices";
import { useRouter } from "next/navigation";

interface AutoNewsFormProps {
  languages: ILanguage[];
  initialCategories: ICategory[];
  initialSubcategories: ISubCategory[];
}

export default function AutoNewsForm({
  languages,
  initialCategories,
  initialSubcategories,
}: AutoNewsFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [subcategories, setSubcategories] =
    useState<ISubCategory[]>(initialSubcategories);
  const [formData, setFormData] = useState<AutoNewsFormData>({
    language: languages[0]?.language_code || "",
    category: "",
    subcategory: "",
    status: "published",
    link: "",
    duration: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const newCategories = await getCategoryByLang(formData.language);
      setCategories(newCategories);
      setFormData((prev) => ({ ...prev, category: "", subcategory: "" }));
    };
    fetchCategories();
  }, [formData.language]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const newSubcategories = await getSubCategoryByLang(formData.language);
      setSubcategories(newSubcategories);
    };
    fetchSubcategories();
  }, [formData.language]);

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.category === formData.category
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "category") {
      setFormData((prev) => ({ ...prev, subcategory: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createAutoNews(formData);
    if (success) {
      router.push("/admin/auto-news");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Auto News Configuration
          </h2>
        </div>

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
            value={formData.language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-main transition duration-150 ease-in-out"
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
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-main transition duration-150 ease-in-out"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
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
            value={formData.subcategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-main transition duration-150 ease-in-out"
            disabled={!formData.category}
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
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-main transition duration-150 ease-in-out"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
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
            value={formData?.link || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-main transition duration-150 ease-in-out"
            placeholder="Enter link"
          />
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
            value={formData.duration}
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-main transition duration-150 ease-in-out"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
