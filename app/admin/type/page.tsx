"use client";
import Link from "next/link";
import Languages from "@/components/admin/Language";
import { useEffect, useState } from "react";
import { ILanguage } from "@/types/language.types";
import axiosPublic from "@/lib/axiosPublic";

const IndexPage = () => {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await axiosPublic.get("/language");
      setLanguages(response.data.data);
    };
    fetchLanguages();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold mb-4">Available Languages</h2>
        <Link
          href={`type/add`}
          className="bg-main py-1 px-4 rounded-md text-white"
        >
          Add
        </Link>
      </div>
      <Languages languages={languages} />
    </div>
  );
};

export default IndexPage;
