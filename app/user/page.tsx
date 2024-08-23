"use client";
import Image from "next/image";
import { useAuth } from "../context/authContext";
import { FaCrown, FaEnvelope, FaUser } from "react-icons/fa";

export const IndexPage = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src={user?.img || "/default-avatar.png"}
            alt={user?.title}
            className="rounded-lg  object-cover border-4 border-blue-500"
            width={100}
            height={10}
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.title}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <FaCrown className="text-blue-500" />
              <h3 className="text-lg font-medium text-gray-700">Role</h3>
            </div>
            <p className="text-gray-800 mt-2">{user?.role}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <FaUser className="text-blue-500" />
              <h3 className="text-lg font-medium text-gray-700">Username</h3>
            </div>
            <p className="text-gray-800 mt-2">{user?.title}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-500" />
              <h3 className="text-lg font-medium text-gray-700">Email</h3>
            </div>
            <p className="text-gray-800 mt-2">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
