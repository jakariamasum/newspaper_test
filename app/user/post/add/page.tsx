/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";
import { useAllArea } from "@/lib/useAllArea";
import { useAllCities } from "@/lib/useAllCities";
import Checkbox from "@/components/admin/Checkbox";
import Content from "@/components/admin/Content";
import Location from "@/components/admin/Location";
import Photo from "@/components/admin/Photo";
import Tag from "@/components/admin/Tag";
import Time from "@/components/admin/Time";
import { useAllSubCategories } from "@/lib/useAllSubCategory";
import { useAllCategory } from "@/lib/useAllCategory";
import { categoryFormat } from "@/app/utils/categoryFormate";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { ILanguage } from "@/types/language.types";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [img, setImg] = useState("");
  const [language, setLanguage] = useState("en");
  const [location, setLocation] = useState({ city: "", area: "" });
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [preApproved, serPreApproved] = useState<boolean>(false);
  const [category, setCategory] = useState<{
    category: string;
    subCategory?: string;
  }>({ category: "" });
  const [publishedDate, setPublishedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await useAllCities();
      setCities(response);
    };
    fetchCities();
    const fetchAreas = async () => {
      const response = await useAllArea();
      setAreas(response);
    };
    fetchAreas();
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
    const fetchLanguages = async () => {
      const response = await axiosPublic.get("/language");
      setLanguages(response.data.data);
    };
    fetchLanguages();
    const fetchUser = async () => {
      const response = await axiosPublic.get(`/user/${user?.email}`);
      serPreApproved(response.data.data.preApproved);
    };
    fetchUser();
  }, []);
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
  const transformeCategorydData = categoryFormat(subCategories, categories);

  const handlePublish = async () => {
    const newsStatus = preApproved ? "published" : "pending";

    const formData = {
      title,
      content: description,
      tags,
      img,
      author: user?._id,
      location,
      category,
      lang: language,
      status: newsStatus,
      publishedDate: publishedDate || new Date().toDateString(),
    };

    try {
      const response = await axiosPublic.post("/news/user/news", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 200) {
        toast.success("News created!");
        router.push("/user/post");
      } else {
        toast.error("Failed to create news!");
      }
    } catch (error) {
      console.error("Error publishing news:", error);
      toast.error("Error publishing news:");
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
              <p>Description</p>
              <Content value={description} onChange={setDescription} />
            </div>
            <div className="mb-4">
              <p>Keywords</p>
              <Tag value={tags} onChange={setTags} />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="button"
                onClick={handlePublish}
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
              >
                Publish
              </button>
            </div>
            <Photo title="Photo (600x600px)" img={img} onChange={setImg} />
            <Time time={publishedDate} setTime={setPublishedDate} />
            <Checkbox
              title="Category"
              items={transformeCategorydData}
              onChange={setCategory}
            />
            <div className="mb-4">
              <p>Reporter</p>
              <input
                type="text"
                placeholder="Reporter"
                value={user?.title || ""}
                className="p-2 mt-2 w-full outline-none rounded-md cursor-not-allowed  bg-gray-300"
                readOnly
              />
            </div>
            <div className="mb-6 w-full my-4">
              <div className="relative">
                <select
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                >
                  <option value="" className="text-gray-400">
                    Select Language
                  </option>
                  {languages?.map((lang) => (
                    <option
                      key={lang?._id}
                      value={lang?.language_code}
                      className="text-gray-700"
                    >
                      {lang?.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                  </svg>
                </div>
              </div>
            </div>
            <Location items={transformedData} onChange={setLocation} />
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};

export default IndexPage;
