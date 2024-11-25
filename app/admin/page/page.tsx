"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import axiosPublic from "@/lib/axiosPublic";
import Loader from "@/components/Loader";

export type TSectionData = {
  sectionTitle: { title: string };
  color: string;
  backgroundColor: string;
  desktopGrid: string;
  mobileGrid: string;
  sectionLimit: string;
  imgPosition?: string;
  width: string;
  box: string;
};

export type TRowData = {
  textColor: string;
  bgColor: string;
  id: number;
  sections: TSectionData[];
};

export type TPage = {
  _id: string;
  title: string;
  rows: TRowData[];
  language: string;
};

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [pages, setPages] = useState<TPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPublic.get("/pages");
        const fetchedPages = response.data.data;

        setPages(fetchedPages);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (_id: string) => {
    router.push(`/admin/page/edit/${_id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 my-10">
      <h1 className="text-2xl font-bold mb-6">Pages by Language</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((data, pageIndex) => (
          <div
            key={pageIndex}
            className="p-4 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {data.title} ({data.language})
              </h2>
              <FaEdit
                onClick={() => handleEdit(data._id)}
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              />
            </div>

            {data.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="p-3 border rounded-lg bg-gray-50 mb-2 shadow-sm"
              >
                <h4 className="text-sm font-semibold text-gray-600 mb-2">
                  Row {rowIndex + 1}
                </h4>
                <div className="mb-1">
                  <h6 className="text-sm font-medium text-gray-700">
                    Total Sections: {row.sections.length || ""}
                  </h6>
                </div>
              </div>
            ))}

            {data.rows.length === 0 && (
              <p className="text-sm text-gray-500 italic">No rows added yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
