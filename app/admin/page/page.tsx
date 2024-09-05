"use client";
import axiosPublic from "@/lib/axiosPublic";
import { useAllPages } from "@/lib/useAllPage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
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
  description: string;
  img: string;
  rows: TRowData[];
  language: string;
  path: string;
};

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [pages, setPages] = useState<TPage[]>([]);
  useEffect(() => {
    const fetchPageData = async () => {
      const response = await axiosPublic.get("/pages");
      setPages(response.data.data);
    };
    fetchPageData();
  }, []);
  console.log(pages);
  const handleEdit = (_id: string) => {
    router.push(`/admin/page/edit/${_id}`);
  };

  return (
    <div className="">
      <div className="w-full max-w-7xl flex items-center justify-between mt-8">
        <h1 className="text-3xl font-extrabold text-gray-900 "></h1>
        <Link
          href="/admin/page/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add New Page
        </Link>
      </div>
      <div className="lg:mx-24 my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((data, pageIndex) => (
          <div
            key={pageIndex}
            className="p-4 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {data.title}
              </h2>
              <FaEdit
                onClick={() => handleEdit(data._id)}
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              />
            </div>

            {data.img && (
              <div className="mb-4">
                <Image
                  src={data.img}
                  alt={data.title}
                  className="rounded-lg shadow-sm object-cover"
                  width={200}
                  height={150}
                />
              </div>
            )}

            {data.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="p-3 border rounded-lg bg-gray-50 mb-2 shadow-sm"
              >
                <h4 className="text-sm font-semibold text-gray-600 mb-2">
                  Row {rowIndex + 1}
                </h4>
                {row.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-1">
                    <h6 className="text-sm font-medium text-gray-700">
                      Total Sections: {row.sections.length || ""}
                    </h6>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default IndexPage;
