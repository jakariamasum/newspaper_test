"use client";
import AttachFiles from "@/components/admin/AttachFiles";
import Checkbox from "@/components/admin/Checkbox";
import Content from "@/components/admin/Content";
import Location from "@/components/admin/Location";
import Photo from "@/components/admin/Photo";
import Tag from "@/components/admin/Tag";
import Time from "@/components/admin/Time";
import { useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";

const IndexPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>(["hello"]);
  const [img, setImg] = useState("");
  const [reporter, setReporter] = useState("");
  const [location, setLocation] = useState({});

  const handlePublish = async () => {
    const formData = {
      title,
      description,
      tags,
      img,
      reporter,
      location,
    };

    try {
      const response = await axiosPublic.post("/news", formData);
      console.log(response.data);
      if (response.status === 200) {
        toast.success("News created!");
      } else {
        toast.error("Failed to create news!");
      }
    } catch (error) {
      console.error("Error publishing news:", error);
      toast.error("Error publishing news:");
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
              <p>Keywords</p>
              <Tag value={tags} onChange={setTags} />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="button"
                onClick={handlePublish}
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
              >
                Publish
              </button>
            </div>
            <Photo title="Photo (600x600px)" img={img} onChange={setImg} />
            <Time />
            <Checkbox
              title="Category"
              items={[
                {
                  title: "Category 1",
                  subItems: [
                    { title: "SubCategory 1.1" },
                    { title: "SubCategory 1.2" },
                  ],
                },
                {
                  title: "Category 2",
                  subItems: [{ title: "SubCategory 2.1", checked: true }],
                },
                { title: "Category 3", checked: true },
                { title: "Category 4" },
              ]}
            />
            <div className="mb-4">
              <p>Reporter</p>
              <select
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
              >
                <option value="">Select a reporter</option>
                <option value="HeRa">HeRa</option>
                <option value="Khan">Khan</option>
                <option value="Reporter">Reporter</option>
              </select>
            </div>
            <Location
              items={[
                {
                  name: "City Name 1",
                  areas: [
                    { name: "Area 1" },
                    { name: "Area 2", selected: true },
                    { name: "Area 3" },
                  ],
                },
                {
                  name: "City Name 2",
                  areas: [
                    { name: "Area 4" },
                    { name: "Area 5" },
                    { name: "Area 6" },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};

export default IndexPage;
