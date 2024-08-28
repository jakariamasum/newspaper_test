"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosPublic from "@/lib/axiosPublic";
import Builder from "@/components/Builder";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import { toast, Toaster } from "sonner";

interface SectionData {
  sectionTitle: string;
  color: string;
  backgroundColor: string;
  desktopGrid: string;
  mobileGrid: string;
  sectionLimit: string;
  imgPosition?: string;
  width?: string;
  box: string;
}

interface ILanguage {
  _id: string;
  title: string;
  language_code: string;
}

const paths = [
  {
    id: "/home",
    name: "Home",
  },
  {
    id: "/stories",
    name: "Stories",
  },
  {
    id: "/videos",
    name: "Videos",
  },
];

const EditPage: React.FC = () => {
  const router = useRouter();
  const { _id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [pageData, setPageData] = useState<any[]>([]);
  const [language, setLanguage] = useState("en");
  const [languages, setLanguages] = useState<ILanguage[]>([]);

  console.log(_id);
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axiosPublic.get(`/pages/edit-page/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const page = response.data.data;
        console.log(page);
        setTitle(page.title);
        setPath(page.path);
        setDescription(page.description);
        setImg(page.img);
        setPageData(page.rows);
        setLanguage(page.language);
      } catch (error) {
        console.error("Failed to fetch page data:", error);
        toast.error("Failed to load page data.");
      }
    };

    const fetchLanguages = async () => {
      const response = await axiosPublic.get("/language");
      setLanguages(response.data.data);
    };

    fetchPageData();
    fetchLanguages();
  }, [_id]);

  const handleRowDataChange = (index: number, updatedData: Partial<any>) => {
    setPageData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], ...updatedData };
      return newData;
    });
  };

  const handleUpdate = async () => {
    const pageInfo = {
      title,
      description,
      img,
      rows: pageData,
      language,
      path,
    };
    try {
      const response = await axiosPublic.put(`/pages/admin/${_id}`, pageInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Page updated successfully!");
        router.push("/admin/page");
      } else {
        toast.warning("Failed to update page.");
      }
    } catch (error) {
      toast.error("Error updating page.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="mb-4">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 mt-2 w-full outline-none rounded-md"
              />
            </div>
            <div className="mb-4">
              <p>Description</p>
              <Content value={description} onChange={setDescription} />
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
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
            <Photo title="Photo" img={img} onChange={setImg} />
            <div className="mb-6 w-full my-4">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                >
                  <option value="" className="text-gray-400">
                    Select Language
                  </option>
                  {languages?.map((lang) => (
                    <option
                      key={lang?._id}
                      value={lang?.title}
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

            <div className="mb-6 w-full my-4">
              <div className="relative">
                <select
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                >
                  <option value="" className="text-gray-400">
                    Select Path Name
                  </option>
                  {paths?.map((path) => (
                    <option
                      key={path?.id}
                      value={path?.id}
                      className="text-gray-700"
                    >
                      {path?.name}
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

export default EditPage;
