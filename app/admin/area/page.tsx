"use client";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaCity } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";

interface ICity {
  _id: string;
  title: string;
}

interface IArea {
  _id: string;
  title: string;
  city: ICity;
  createdAt: string;
  updatedAt: string;
}

const IndexPage: React.FC = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axiosPublic.get("/area");
        setAreas(response.data.data);
      } catch (err) {
        setError("Failed to fetch areas");
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Area List</h1>
        <Link
          href="/admin/area/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add New Area
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {areas.map((area) => (
          <div
            key={area._id}
            className="bg-gradient-to-br from-white via-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-4">
              <FaMapMarkerAlt className="text-gray-700 text-3xl" />
              <h3 className="text-xl font-bold text-gray-800">{area.title}</h3>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
              <FaCity className="text-gray-600 text-xl" />
              <span className="font-medium">{area.city.title}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
              <FaCalendarAlt className="text-gray-500 text-lg" />
              <span>{moment(area.createdAt).format("MMMM Do YYYY")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
