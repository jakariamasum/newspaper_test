"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import Loader from "@/components/Loader";
import { toast, Toaster } from "sonner";
import { IStory } from "@/types/story.types";

const IndexPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="my-4 text-right">
        <h1></h1>
        <div className="flex gap-1">
          <Link
            className={`hover:bg-main hover:text-white p-2 block`}
            href="/admin/stories/categories"
          >
            Category
          </Link>
          <Link
            className={`hover:bg-main hover:text-white p-2 block`}
            href="/admin/stories/subcategories"
          >
            SubCategory
          </Link>
        </div>
        <Link
          href="/admin/stories/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add New Story
        </Link>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
};

export default IndexPage;
