"use client";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
import Link from "next/link";
import Loader from "@/components/Loader";
import { IArea } from "@/types/location.types";

const IndexPage: React.FC = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const areasByCity = areas.reduce((acc, area) => {
    const cityName = area.city.title;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(area);
    return acc;
  }, {} as Record<string, IArea[]>);

  const filteredAreasByCity = Object.keys(areasByCity).reduce(
    (acc, cityName) => {
      const filteredAreas = areasByCity[cityName].filter((area) =>
        area.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (
        cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        filteredAreas.length > 0
      ) {
        acc[cityName] =
          filteredAreas.length > 0 ? filteredAreas : areasByCity[cityName];
      }
      return acc;
    },
    {} as Record<string, IArea[]>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Area List</h1>
        <Link
          href="/admin/area/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add Area
        </Link>
      </div>

      <div className="w-full max-w-7xl mb-8">
        <input
          type="text"
          placeholder="Search by city or area name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-main"
        />
      </div>

      <div className="w-full max-w-7xl space-y-8">
        {Object.keys(filteredAreasByCity).length > 0 ? (
          Object.keys(filteredAreasByCity).map((cityName) => (
            <div
              key={cityName}
              className="border rounded-lg p-6 bg-white shadow-lg"
            >
              <div className="flex items-center mb-4">
                <FaCity className="text-main text-2xl mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">{cityName}</h2>
              </div>
              <ul className="space-y-2 pl-4">
                {filteredAreasByCity[cityName].map((area) => (
                  <li
                    key={area._id}
                    className="text-lg font-medium text-gray-700 bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition duration-300"
                  >
                    {area.title}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
