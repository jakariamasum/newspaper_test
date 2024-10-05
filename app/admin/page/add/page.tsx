"use client";
import Builder from "@/components/Builder";
import axiosPublic from "@/lib/axiosPublic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

interface ILanguage {
  _id: string;
  title: string;
  language_code: string;
}

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [pageData, setPageData] = useState<any[]>([]);

  const handleRowDataChange = (index: number, updatedData: Partial<any>) => {
    setPageData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], ...updatedData };
      return newData;
    });
  };
  const [language, setLanguage] = useState("en");

  const handlePublish = async () => {
    const pageInfo = {
      title,
      rows: pageData,
      language,
    };
    try {
      const response = await axiosPublic.post("/pages/admin", pageInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Page published successfully!");
        router.push("/admin/page");
      } else {
        toast.warning("Failed to publish page:");
        console.log("err", response);
      }
    } catch (error) {
      toast.error("Error publishing page:");
      console.log(error);
    }
  };

  const [languages, setLanguages] = useState<ILanguage[]>([]);
  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await axiosPublic.get("/language");
      const activeLanguages = response.data.data.filter(
        (lang: any) => lang.status === "active"
      );
      setLanguages(activeLanguages);
    };
    fetchLanguages();
  }, []);

  return (
    <>
      <div className="container my-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="mb-4">
              <p>Title</p>
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 mt-2 w-full outline-none rounded-md"
              />
            </div>

            <div className="mb-4">
              <Builder onRowDataChange={handleRowDataChange} />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="submit"
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
            <div className="mb-6 w-full my-4">
              <div className="relative">
                <select
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                >
                  <option value="" className="text-gray-400">
                    Select Language
                  </option>
                  <option value="all">All</option>
                  {languages?.map((lang) => (
                    <option
                      key={lang?._id}
                      value={lang?.language_code}
                      className="text-gray-700"
                    >
                      {lang?.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default IndexPage;
