"use client";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";

interface ICity {
  _id: string;
  title: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

const IndexPage: React.FC = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosPublic.get("/city");
        setCities(response.data.data);
      } catch (err) {
        setError("Failed to fetch cities");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">City List</h1>
        <Link
          href="/admin/city/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add New City
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cities.map((city) => (
          <div
            key={city._id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-4">
              <FaMapMarkerAlt className="text-gray-700 text-3xl" />
              <h3 className="text-xl font-semibold text-gray-800">
                {city.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
              <span className="flex items-center space-x-1">
                <FaCalendarAlt className="text-gray-500 text-lg" />
                <span>{moment(city.createdAt).format("MMMM Do YYYY")}</span>
              </span>
            </div>
            <div className="flex justify-end">
              <Link
                href={`/admin/city/`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
