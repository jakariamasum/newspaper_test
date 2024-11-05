"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axiosPublic from "@/lib/axiosPublic";
import { FiFilter } from "react-icons/fi";
import { BiCalendar, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { INews } from "@/types/news.types";
import { ICategory } from "@/types/category.types";
import { ICity } from "@/types/location.types";
import { IAuthor } from "@/types/author.types";

interface SearchParams {
  dateFrom: string;
  dateTo: string;
  author: string;
  category: string;
  page: number;
  city: string;
}

export default function ArchivePage() {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    dateFrom: "",
    dateTo: "",
    author: "",
    category: "",
    page: 1,
    city: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const lang = usePathname().slice(1, 3);

  const fetchNews = async () => {
    try {
      const response = await axiosPublic.get(`/news?lang=${lang}`, {
        params: {
          ...searchParams,
        },
      });
      setNewsList(response.data.data);
      setTotalPages(Math.ceil(response.data.data.length / 10));
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  const fetchAuthorsAndCategories = async () => {
    try {
      const [authorsResponse, categoriesResponse, cityResponse] =
        await Promise.all([
          axiosPublic.get("/user/get-all/get"),
          axiosPublic.get("/categories"),
          axiosPublic.get("/city"),
        ]);
      setAuthors(authorsResponse.data.data);
      setCategories(categoriesResponse.data.data);
      setCities(cityResponse.data.data);
    } catch (error) {
      console.error("Failed to fetch authors and categories:", error);
    }
  };

  useEffect(() => {
    fetchAuthorsAndCategories();
  }, []);

  useEffect(() => {
    fetchNews();
  }, [searchParams]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const strippedContent = content?.replace(/<[^>]+>/g, "");
    return strippedContent?.length > maxLength
      ? strippedContent?.substring(0, maxLength) + "..."
      : strippedContent;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">News Archive</h1>

      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <FiFilter className="w-5 h-5 mr-2" />
        {isFilterOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {isFilterOpen && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div>
              <label
                htmlFor="dateFrom"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={searchParams.dateFrom}
                  onChange={handleSearchChange}
                  className="border p-2 rounded w-full"
                />
                <BiCalendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <div>
              <label
                htmlFor="dateTo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={searchParams.dateTo}
                  onChange={handleSearchChange}
                  className="border p-2 rounded w-full"
                />
                <BiCalendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author
              </label>
              <select
                id="author"
                name="author"
                value={searchParams.author}
                onChange={handleSearchChange}
                className="border p-2 rounded w-full"
              >
                <option value="">All Authors</option>
                {authors.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={searchParams.category}
                onChange={handleSearchChange}
                className="border p-2 rounded w-full"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={searchParams.city}
                onChange={handleSearchChange}
                className="border p-2 rounded w-full"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city._id} value={city.title}>
                    {city.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((news) => (
          <article
            key={news._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-48">
              <Image
                src={news.img || "/placeholder.svg"}
                alt={news.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800 line-clamp-2">
                {news.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {truncateContent(news.content)}
              </p>
              <div className="flex flex-wrap justify-between text-xs text-gray-500 mb-2">
                <span className="mb-1">
                  <strong>Author:</strong> {news.author.title}
                </span>
                <span className="mb-1">
                  <strong>Category:</strong> {news.category.category.title}
                </span>
                <span className="mb-1">
                  <strong>Location:</strong> {news.location.city}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                <strong>Published:</strong>{" "}
                {new Date(news.createdAt).toLocaleDateString()}
              </p>
            </div>
          </article>
        ))}
      </div>

      <nav
        className="flex justify-center items-center mt-12"
        aria-label="Pagination"
      >
        <button
          onClick={() => handlePageChange(searchParams.page - 1)}
          disabled={searchParams.page <= 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Previous page</span>
          <BiChevronLeft className="w-5 h-5" />
        </button>
        <span className="px-4 py-2 text-sm font-medium text-gray-700">
          Page {searchParams.page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(searchParams.page + 1)}
          disabled={searchParams.page >= totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Next page</span>
          <BiChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}
