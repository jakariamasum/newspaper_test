/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axiosPublic from "@/lib/axiosPublic";
import { useAllCities } from "@/lib/useAllCities";
import { ICity } from "@/types/location.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      const response = await useAllCities();
      setCities(response);
    };
    fetchAreas();
  }, []);
  const handlePublish = async () => {
    const areaInfo = {
      title,
      city,
    };
    try {
      const response = await axiosPublic.post("/area/admin", areaInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Area created successfully!");
        router.push("/admin/area");
      }
    } catch (error) {
      toast.error("Failed to create area. Please try again.");
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
              <p>City</p>
              <select
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="" disabled>
                  Select a City
                </option>
                {cities?.map((city: ICity) => (
                  <option key={city._id} value={city._id}>
                    {city.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="submit"
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};
export default IndexPage;
