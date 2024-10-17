/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";
import Checkbox from "@/components/admin/Checkbox";
import Content from "@/components/admin/Content";
import Location from "@/components/admin/Location";
import Photo from "@/components/admin/Photo";
import Tag from "@/components/admin/Tag";
import Time from "@/components/admin/Time";
import { useLang } from "@/app/context/langContext";
import { categoryFormat } from "@/app/utils/categoryFormate";
import { useRouter } from "next/navigation";

interface TUser {
  _id: string;
  title: string;
  preApproved: boolean;
}

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { lang } = useLang();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [img, setImg] = useState("");
  const [reporter, setReporter] = useState("");
  const [location, setLocation] = useState({ city: "", area: "" });
  const [users, setUsers] = useState<TUser[]>([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState<{
    category: string;
    subCategory?: string;
  }>({ category: "" });
  const [publishedDate, setPublishedDate] = useState<string | null>(null);
  const [waterMark, setWaterMark] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosPublic.get("/user/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(response.data.data);
    };
    fetchUsers();
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
    const fetchCategories = async () => {
      const response = await axiosPublic.get(`/categories/type/${lang}`);
      setCategories(response.data.data);
    };
    fetchCategories();
    const fetchSubCategories = async () => {
      const response = await axiosPublic.get(`/sub-categories/${lang}`);
      setSubCategories(response.data.data);
    };
    fetchSubCategories();
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
    const selectedReporter = users.find((user) => user._id === reporter);

    const newsStatus = selectedReporter?.preApproved ? "published" : "pending";
    const payload = {
      title,
      content: description,
      tags,
      img,
      author: reporter,
      location,
      category,
      lang,
      status: newsStatus,
      publishedDate: publishedDate || new Date().toDateString(),
      waterMark,
    };
    console.log(payload);
    try {
      const response = await axiosPublic.post("/news/admin", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 200) {
        toast.success("News created!");
        router.push(`/admin/type/${lang}`);
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
            <Photo
              title="Watermark (600x600px)"
              img={waterMark}
              onChange={setWaterMark}
            />
            <Time time={publishedDate} setTime={setPublishedDate} />
            <Checkbox
              title="Category"
              items={transformeCategorydData}
              onChange={setCategory}
            />
            <div className="mb-4">
              <p>Reporter</p>
              <select
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
              >
                <option value="">Select a reporter</option>
                {users?.map((user: TUser) => (
                  <option value={user?._id} key={user?._id}>
                    {user?.title}
                  </option>
                ))}
              </select>
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
