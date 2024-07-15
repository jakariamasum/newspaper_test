"use client";
import { useAllLanguages } from "@/lib/useAllLanguage";
import Link from "next/link";
import React, { useState } from "react";

interface Post {
  img: string;
  link: string;
  title: string;
}

interface TableProps {
  title: string;
  link: string;
  post: Post[];
}

interface ILanguage {
  language_name: string;
  language_code: string;
  language_type?: string;
}

const Table: React.FC<TableProps> = async ({ post, title, link }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const languages: ILanguage[] = await useAllLanguages();

  const filteredLanguages = languages.filter((language: ILanguage) =>
    language.language_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentLanguages = filteredLanguages.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const nextPage = () => {
    if (currentPage * postsPerPage < filteredLanguages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container my-4">
      <div className="mb-4 flex space-y-2 md:space-y-0 flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center justify-between md:justify-normal space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="p-1 border rounded outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link href={link} className="bg-main py-1 px-4 rounded-md text-white">
            Add
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentLanguages?.map((language) => (
          <div
            key={language.language_code}
            className="relative bg-white shadow-lg p-6 rounded-lg transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl text-center hover:translate-y-3 "
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {language.language_name}
            </h2>
            <p className="text-[#AB4725]">{language.language_code}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
          disabled={currentPage * postsPerPage >= filteredLanguages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
