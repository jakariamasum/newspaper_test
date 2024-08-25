"use client";
import { useState } from "react";
import axios from "axios";
import CatOp from "@/components/admin/CatOp";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import { toast, Toaster } from "sonner";
import axiosPublic from "@/lib/axiosPublic";
import { useRouter } from "next/navigation";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState(1);
  const [img, setImg] = useState("");

  const handlePublish = async () => {
    console.log(title, description, position, img);
    const categoryData = {
      title,
      description,
      position,
      img,
    };
    try {
      const response = await axiosPublic.post(
        "/categories/admin",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Category created successfully!");
        router.push("/admin/category");
      }
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
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
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <p>Description</p>
              <Content value={description} onChange={setDescription} />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
              <button
                type="button"
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
            <div>
              <p>Position</p>
              <input
                type="number"
                placeholder="1"
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
              />
            </div>

            <CatOp />

            <Photo title="Photo" img={img} onChange={setImg} />
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};

export default IndexPage;
