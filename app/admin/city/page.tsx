"use client";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";
import Loader from "@/components/Loader";

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

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">City List</h1>
        <Link
          href="/admin/city/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add City
        </Link>
      </div>

      <div className="w-full max-w-7xl bg-white border border-gray-300 rounded-lg shadow-lg divide-y divide-gray-200">
        {cities.map((city) => (
          <div
            key={city._id}
            className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-main text-2xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                {city.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
