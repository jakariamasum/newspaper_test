/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { updateNewsItem } from "@/app/services/admin/NewsServices";
import { categoryFormat } from "@/app/utils/categoryFormate";
import Banners from "@/components/admin/Banners";
import Checkbox from "@/components/admin/Checkbox";
import Loader from "@/components/Loader";
import axiosPublic from "@/lib/axiosPublic";
import { useAllCategory } from "@/lib/useAllCategory";
import { useAllSubCategories } from "@/lib/useAllSubCategory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

interface BuilderProps {
  params: {
    _id: string;
  };
}

const EditPage: React.FC<BuilderProps> = ({ params }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState<{
    category: string;
    subCategory?: string;
  }>({ category: "" });
  const [title, setTitle] = useState<string>("");
  const [banners, setBanners] = useState<{ img: string; title: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const response = await axiosPublic.get(`/news/each-news/${params._id}`);
        const { title, category, stories } = response.data.data;

        setTitle(title);
        setCategory({
          category: category?.category._id,
          subCategory: category?.subcategory,
        });
        setBanners(stories);
      } catch (error) {
        toast.error("Failed to fetch story data");
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetails();
    const fetchCategories = async () => {
      const response = await axiosPublic.get(
        `/categories/category/types?type=story`
      );
      setCategories(response.data.data);
    };
    fetchCategories();
    const fetchSubCategories = async () => {
      const response = await axiosPublic.get(`/sub-categories/type=story`);
      setSubCategories(response.data.data);
    };
    fetchSubCategories();
  }, [params._id]);
  console.log(title, banners, category);
  const transformedCategoryData = categoryFormat(subCategories, categories);

  const handleSubmit = async () => {
    const payload = {
      title,
      img: banners[0].img,
      category,
      stories: banners,
    };
    const success = await updateNewsItem(
      params._id as string,
      payload,
      "story"
    );
    if (success) {
      router.push("/admin/stories");
    }
  };

  if (loading) {
    return <Loader />;
  }

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
            <Banners items={banners} onChange={setBanners} />
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
            <Checkbox
              title="Category"
              items={transformedCategoryData}
              onChange={setCategory}
              initialValue={category}
            />
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};
export default EditPage;
