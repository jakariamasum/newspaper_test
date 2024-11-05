"use client";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import Link from "next/link";
import Loader from "@/components/Loader";
import { toast, Toaster } from "sonner";
import { ICity } from "@/types/location.types";
import {
  toggleCityStatus,
  updateCityName,
} from "@/app/services/admin/cityServices";

const IndexPage: React.FC = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCity, setEditingCity] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axiosPublic.get("/city");
      setCities(response.data.data);
    } catch (err) {
      setError("Failed to fetch cities");
      toast.error("Failed to fetch cities");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (city: ICity) => {
    setEditingCity(city._id);
    setEditedName(city.title);
  };

  const handleSave = async (city: ICity) => {
    const success = await updateCityName(city._id, editedName);
    if (success) {
      setCities(
        cities.map((c) =>
          c._id === city._id ? { ...c, title: editedName } : c
        )
      );
    }
    setEditingCity(null);
  };

  const handleToggleActive = async (city: ICity) => {
    const success = await toggleCityStatus(city);
    setCities(
      cities.map((c) =>
        c._id === city._id ? { ...c, isActive: !c.isActive } : c
      )
    );
    toast.success(
      `City ${city.isActive ? "deactivated" : "activated"} successfully`
    );
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">City List</h1>
        <Link
          href="/admin/city/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-main-dark"
        >
          Add City
        </Link>
      </div>

      <div className="w-full max-w-7xl bg-white border border-gray-300 rounded-lg shadow-lg divide-y divide-gray-200">
        {cities.map((city) => (
          <div
            key={city._id}
            className={`flex items-center justify-between py-4 px-6 hover:bg-gray-50 transition-colors duration-200 ${
              city.isActive ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt
                className={`text-2xl ${
                  city.isActive ? "text-green-500" : "text-red-500"
                }`}
              />
              {editingCity === city._id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-2 py-1"
                />
              ) : (
                <h3 className="text-lg font-semibold text-gray-800">
                  {city.title}
                </h3>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {editingCity === city._id ? (
                <button
                  onClick={() => handleSave(city)}
                  className="text-green-600 hover:text-green-800"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(city)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
              )}
              <button
                onClick={() => handleToggleActive(city)}
                className={`text-2xl ${
                  city.isActive ? "text-green-500" : "text-red-500"
                }`}
              >
                {city.isActive ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default IndexPage;
