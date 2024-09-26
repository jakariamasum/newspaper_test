/* eslint-disable react-hooks/rules-of-hooks */
"use client";
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
    category: any;
    subCategory?: any;
  }>({ category: "" });
  const [title, setTitle] = useState<string>("");
  const [banners, setBanners] = useState<{ img: string; title: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const response = await axiosPublic.get(`/story/${params._id}`);
        const { title, category, subCategory, banners } = response.data.data;

        setTitle(title);
        setCategory({ category, subCategory });
        setBanners(banners);
      } catch (error) {
        toast.error("Failed to fetch story data");
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetails();
  }, [params._id]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await useAllCategory();
      setCategories(response);
    };
    fetchCategories();
    const fetchSubCategories = async () => {
      const response = await useAllSubCategories();
      setSubCategories(response);
    };
    fetchSubCategories();
  }, []);

  const transformedCategoryData = categoryFormat(
    subCategories,
    categories,
    category.category ? category : undefined
  );

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        category: category.category,
        subCategory: category.subCategory,
        banners,
      };
      const response = await axiosPublic.put(
        `/story/admin/${params._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Story updated successfully!");
        router.push("/admin/stories");
      }
    } catch (error) {
      console.error("Failed to update story", error);
      toast.error("Failed to update story");
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
            />
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};
export default EditPage;
