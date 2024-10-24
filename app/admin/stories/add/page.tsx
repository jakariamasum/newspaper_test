/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { createNewsItem } from "@/app/services/admin/NewsServices";
import { categoryFormat } from "@/app/utils/categoryFormate";
import Banners from "@/components/admin/Banners";
import Checkbox from "@/components/admin/Checkbox";
import Location from "@/components/admin/Location";
import axiosPublic from "@/lib/axiosPublic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState<{
    category: string;
    subCategory?: string;
  }>({ category: "" });
  const [title, setTitle] = useState<string>("");
  const [banners, setBanners] = useState<{ img: string; title: string }[]>([]);
  const [location, setLocation] = useState({ city: "", area: "" });
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosPublic.get(
        `/categories/category/types?type=story`
      );
      setCategories(response.data.data);
    };
    fetchCategories();
    const fetchSubCategories = async () => {
      const response = await axiosPublic.get(
        `/sub-categories/sub-category/types?type=story`
      );
      setSubCategories(response.data.data);
    };
    fetchSubCategories();
    const fetchCities = async () => {
      const response = await axiosPublic.get("/city");
      setCities(response.data.data);
    };
    fetchCities();
    const fetchAreas = async () => {
      const response = await axiosPublic.get("/area");
      setAreas(response.data.data);
    };
    fetchAreas();
  }, []);

  const transformeCategorydData = categoryFormat(subCategories, categories);
  const transformData = (
    areas: { title: string; city: { _id: string } }[],
    cities: { _id: string; title: string }[]
  ) => {
    return cities.map((city) => ({
      title: city.title,
      areas: areas
        .filter((area) => area.city._id === city._id)
        .map((area) => ({ title: area.title })),
    }));
  };
  const transformedData = transformData(areas, cities);

  const handleSubmit = async () => {
    const payload = {
      title,
      img: banners[0].img,
      location,
      category,
      stories: banners,
      lang: "story",
    };
    const success = await createNewsItem(payload, "story");
    if (success) {
      router.push("/admin/stories");
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
            <Banners items={banners} onChange={setBanners} />
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
              >
                Publish
              </button>
            </div>
            <Checkbox
              title="Category"
              items={transformeCategorydData}
              onChange={setCategory}
            />
            <Location items={transformedData} onChange={setLocation} />
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};
export default IndexPage;
