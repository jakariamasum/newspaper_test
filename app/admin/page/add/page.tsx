"use client";
import Builder from "@/components/Builder";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useRef, useState } from "react";
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
}
interface ILanguage {
  _id: string;
  title: string;
  language_code: string;
}
const IndexPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<string>("");
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
      description,
      img,
      rows: pageData,
      language,
      path,
    };
    console.log(pageInfo);
    try {
      const response = await axiosPublic.post("/pages", pageInfo);
      if (response.status === 200) {
        toast.success("Page published successfully!");
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
      setLanguages(response.data.data);
    };
    fetchLanguages();
  }, []);
  console.log(languages);

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
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
            <Photo title="Photo" img={img} onChange={setImg} />
            <div>
              {languages?.length | 0}
              <select onChange={(e) => setLanguage(e.target.value)}>
                <option value="">Select Language</option>
                {languages?.map((lang) => (
                  <option key={lang?._id} value={lang?.language_code}>
                    {lang?.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <p>Path</p>
              <input
                type="text"
                placeholder="title"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="p-2 mt-2 w-full outline-none rounded-md"
              />
            </div>{" "}
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default IndexPage;
