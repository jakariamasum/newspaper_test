"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosPublic from "@/lib/axiosPublic";
import Content from "@/components/admin/Content";
import Tag from "@/components/admin/Tag";
import Photo from "@/components/admin/Photo";
import { Toaster, toast } from "sonner";
import { useParams } from "next/navigation";

const EditNews: React.FC = () => {
  const router = useRouter();
  const { _id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    if (_id) {
      const fetchNewsItem = async () => {
        try {
          const response = await axiosPublic.get(`/news/each-news/${_id}`);
          const data = response.data.data;
          console.log(data);
          setTitle(data.title);
          setDescription(data.content);
          setTags(data.tags);
          setImg(data.img);
          setAuthor(data.author.title);
        } catch (error) {
          console.error("Failed to fetch news item:", error);
        }
      };

      fetchNewsItem();
    }
  }, [_id]);

  const handlePublish = async () => {
    try {
      const payload = {
        title,
        description,
        tags,
        img,
      };
      console.log(payload);
      const response = await axiosPublic.put(`/news/${_id}`, payload);
      if (response.status === 200) {
        toast.success("News updated successfully!");
        router.push("/dashboard");
      } else {
        toast.warning("Failed to update news");
      }
    } catch (error) {
      console.error("Failed to update news:", error);
      toast.warning("Failed to update news");
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
            <Content value={description} onChange={setDescription} />
            <Photo img={img} onChange={setImg} title={""} />
          </div>
          <div className="md:w-1/3">
            <Tag value={tags} onChange={setTags} />
            <div className="mb-4">
              <p>Reporter</p>
              <input
                type="text"
                placeholder="Reporter"
                value={author}
                className="p-2 mt-2 w-full outline-none rounded-md cursor-not-allowed  bg-gray-300"
                readOnly
              />
            </div>
            <div className="mb-4">
              <button
                onClick={handlePublish}
                className="w-full py-2 px-4 bg-main text-white font-bold rounded-md"
              >
                Edit Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default EditNews;
