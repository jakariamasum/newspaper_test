/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Checkbox from "@/components/admin/Checkbox";
import Content from "@/components/admin/Content";
import Image from "next/image";
import Tag from "@/components/admin/Tag";
import { useAllSubCategories } from "@/lib/useAllSubCategory";
import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";
import { categoryFormat } from "@/app/utils/categoryFormate";
import { useRouter } from "next/navigation";
import { createNewsItem } from "@/app/services/admin/NewsServices";

const extractYouTubeID = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [videoInput, setVideoInput] = useState("");
  const [tags, setTags] = useState<string[]>(["hello"]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState<{
    category: string;
    subCategory?: string;
  }>({ category: "" });

  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const id = extractYouTubeID(url);
    setVideoInput(id || url);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosPublic.get(
        `/categories/category/types?type=video`
      );
      setCategories(response.data.data);
    };
    fetchCategories();
    const fetchSubCategories = async () => {
      const response = await useAllSubCategories();
      setSubCategories(response);
    };
    fetchSubCategories();
  }, []);

  const transformeCategorydData = categoryFormat(subCategories, categories);

  const handlePublish = async () => {
    const payload = {
      title,
      video: videoInput,
      content: description,
      tags,
      category,
      lang: "video",
      img: `https://i.ytimg.com/vi/${videoInput}/mqdefault.jpg`,
    };
    console.log(payload);
    const success = await createNewsItem(payload, "video");
    if (success) {
      router.push("/admin/videos");
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
              <p>YouTube Video</p>
              <input
                type="text"
                placeholder="Paste YouTube URL"
                value={videoInput}
                onChange={handleVideoInputChange}
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
                type="submit"
                onClick={handlePublish}
                className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
              >
                Publish
              </button>
            </div>

            {videoInput && (
              <div className="mb-4">
                <p>Image Preview</p>
                <div className="bg-white p-2 rounded-md mt-2">
                  <Image
                    src={`https://i.ytimg.com/vi/${videoInput}/mqdefault.jpg`}
                    width={400}
                    height={400}
                    alt="YouTube Video Thumbnail"
                    className="w-full rounded-md"
                  />
                </div>
              </div>
            )}

            <Checkbox
              title="Category"
              items={transformeCategorydData}
              onChange={setCategory}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
