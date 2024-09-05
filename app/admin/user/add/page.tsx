"use client";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [bio, setBio] = useState("");

  const handlePublish = async () => {
    const userInfo = {
      title,
      role,
      email,
      img,
      bio,
      password,
    };
    try {
      const response = await axiosPublic.post("/user/admin", userInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        toast.success("User created successfully!");
        router.push("/admin/user");
      }
    } catch (error) {
      toast.error("Failed to create user. Please try again.");
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
              <p>Email</p>
              <input
                type="mail"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 mt-2 w-full outline-none rounded-md"
              />
            </div>
            <div className="mb-4">
              <p>Passwords</p>
              <input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mt-2 w-full outline-none rounded-md"
              />
            </div>
            <div className="mb-4">
              <p>Type</p>
              <select
                className="p-2 mt-2 w-full outline-none rounded-md"
                defaultValue="reporter"
                value={title}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="reporter">Reporter</option>
              </select>
            </div>
            <div className="mb-4">
              <p>About us</p>
              <Content value={bio} onChange={setBio} />
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
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};
export default IndexPage;
