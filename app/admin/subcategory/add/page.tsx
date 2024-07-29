/* eslint-disable react-hooks/rules-of-hooks */
// IndexPage.tsx
"use client";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import { useAllCategory } from "@/lib/useAllCategory";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

interface TCat {
  _id: string;
  title: string;
  description?: string;
  parent_category_id?: string;
  position?: number;
  img?: string;
}

const IndexPage: React.FC = () => {
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await useAllCategory();
      setCategories(response);
    };
    fetchCategories();
  }, []);
  const handlePublish = async () => {
    const subCategoryInfo = {
      title,
      img,
      description,
      category,
    };
    console.log(subCategoryInfo);
    try {
      const response = await axiosPublic.post(
        "/sub-categories",
        subCategoryInfo
      );

      if (response.status === 200) {
        toast.success("Sub-category created successfully!");
        setTitle("");
        setImg("");
        setDescription("");
        setCategory("");
      }
    } catch (error) {
      toast.error("Failed to create sub-category. Please try again.");
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="mb-4">
              <p>Title</p>
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 mt-2 w-full outline-none rounded-md"
              />
            </div>

            <div className="mb-4">
              <p>Category</p>
              <select
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories?.map((cat: TCat) => (
                  <option key={cat?._id} value={cat?._id}>
                    {cat?.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p>Description</p>
              <Content value={description} onChange={setDescription} />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="button"
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
            <Photo title="Photo" img={img} onChange={setImg} />
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};

export default IndexPage;
