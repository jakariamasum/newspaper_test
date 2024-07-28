/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useNewsByLanguage } from "@/lib/useNewsByLanguage";
import { useSingleCategory } from "@/lib/useSingleCategory";
import { useSingleUser } from "@/lib/useSingleUser";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface TNews {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  author_id: string;
  category_id: string;
  page_tag: string;
  publish_date?: string;
  status: string;
  views: number;
  likes: number;
  dislikes: number;
  language_id?: string;
}

const ModuleTypePage = async () => {
  const { _id } = useParams();
  const news: TNews[] = await useNewsByLanguage(_id as string);

  //func for userinfo
  const getUserInfo = async (id: string) => {
    const user = await useSingleUser(id);
    return user;
  };
  //func for category info
  const getCategoryInfo = async (id: string) => {
    const category = await useSingleCategory(id);
    return category;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">News Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b w-[350px] break-words whitespace-normal">
                Title
              </th>
              <th className="py-2 px-4 border-b">Content</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Page Tag</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Views</th>
              <th className="py-2 px-4 border-b">Likes</th>
              <th className="py-2 px-4 border-b">Dislikes</th>
              <th className="py-2 px-4 border-b">Publish Date</th>
              <th className="py-2 px-4 border-b flex gap-1 items-center ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n._id}>
                <td className="py-2 px-4 border-b">{n.title}</td>
                <td className="py-2 px-4 border-b hover:underline  text-blue-500 ">
                  <Link href={`/news/${n._id}`}>See details</Link>{" "}
                </td>
                <td className="py-2 px-4 border-b">
                  {getUserInfo(n.author_id).then((res) => res?.username)}
                </td>
                <td className="py-2 px-4 border-b">
                  {getCategoryInfo(n.category_id).then((res) => res?.name)}
                </td>
                <td className="py-2 px-4 border-b">{n.page_tag}</td>
                <td className="py-2 px-4 border-b">{n.status}</td>
                <td className="py-2 px-4 border-b">{n.views}</td>
                <td className="py-2 px-4 border-b">{n.likes}</td>
                <td className="py-2 px-4 border-b">{n.dislikes}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(n.publish_date as string).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b ">
                  <span>
                    <FaEdit fill="blue" size={22} className="cursor-pointer" />
                  </span>
                  <span>
                    <MdDelete fill="red" size={22} className="cursor-pointer" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModuleTypePage;
