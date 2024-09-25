"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosPublic from "@/lib/axiosPublic";
import Content from "@/components/admin/Content";
import Tag from "@/components/admin/Tag";
import Photo from "@/components/admin/Photo";
import { Toaster, toast } from "sonner";
import { useParams } from "next/navigation";
import Time from "@/components/admin/Time";
import { useLang } from "@/app/context/langContext";

interface TUser {
  _id: string;
  title: string;
}

const EditNews: React.FC = () => {
  const router = useRouter();
  const { _id } = useParams();
  const { lang, setLang } = useLang();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState<string>("");
  const [users, setUsers] = useState<TUser[]>([]);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (_id) {
      const fetchNewsItem = async () => {
        try {
          const response = await axiosPublic.get(`/news/each-news/${_id}`);
          const data = response.data.data;
          setTitle(data.title);
          setDescription(data.content);
          setTags(data.tags);
          setImg(data.img);
          setAuthor(data.author._id);
          setTime(data.createdAt);
        } catch (error) {
          console.error("Failed to fetch news item:", error);
        }
      };

      const fetchUsers = async () => {
        try {
          const response = await axiosPublic.get("/user/admin", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          setUsers(response.data.data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };

      fetchUsers();
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
        publishedDate: time,
        author,
      };
      const response = await axiosPublic.put(`/news/admin/${_id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        toast.success("News updated successfully!");
        router.push(`/admin/type/${lang}`);
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
            <Time time={time} setTime={setTime} />
            <div className="mb-4">
              <p>Reporter</p>
              <select
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="">Select a reporter</option>
                {users?.map((user: TUser) => (
                  <option value={user._id} key={user._id}>
                    {user.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};

export default EditNews;
