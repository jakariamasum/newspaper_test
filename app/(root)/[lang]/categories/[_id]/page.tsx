"use client";

import { useLang } from "@/app/context/langContext";
import AdDisplay from "@/app/utils/AdDisplay";
import Loader from "@/components/Loader";
import axiosPublic from "@/lib/axiosPublic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

interface INews {
  _id: string;
  title: string;
  content: string;
  img: string;
  tags: string[];
  author: string;
  location: {
    city: string;
    area: string;
  };
  category: {
    category: { title: string; _id: string };
    subCategory: string;
  };
  lang: string;
  createdAt: string;
}

interface CategoryInfo {
  category: string;
  subCategory: string;
}

interface ISubcategory {
  _id: string;
  title: string;
}

const IndexPage: React.FC = () => {
  const [allNews, setAllNews] = useState<INews[]>([]);
  const [displayedNews, setDisplayedNews] = useState<INews[]>([]);
  const [newsToShow, setNewsToShow] = useState(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const observer = useRef<IntersectionObserver>();
  const { _id } = useParams();
  const { lang } = useLang();
  const [ads, setAds] = useState([]);
  const [subCategory, setSubCategory] = useState<ISubcategory[]>([]);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(
          `/news/category-news/${_id}?lang=${lang}`
        );

        setAllNews(response.data.data);
        setDisplayedNews(response.data.data.slice(0, 5));
        if (response.data.data.length > 0) {
          setCategoryInfo({
            category: response.data.data[0].category.category.title,
            subCategory: response.data.data[0].category.category._id,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load news", error);
        setLoading(false);
      }
    };

    fetchAllNews();
  }, [_id, lang]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axiosPublic.get("/ads");
      setAds(response.data.data);
    };

    fetchAds();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryInfo?.subCategory) {
        const response = await axiosPublic.get(
          `/sub-categories/category/${categoryInfo.subCategory}`
        );
        setSubCategory(response.data.data);
      }
    };

    fetchSubCategories();
  }, [categoryInfo?.subCategory]);

  useEffect(() => {
    const filteredNews = selectedSubCategory
      ? allNews.filter(
          (news) => news.category.subCategory === selectedSubCategory
        )
      : allNews;
    setDisplayedNews(filteredNews.slice(0, newsToShow));
  }, [newsToShow, allNews, selectedSubCategory]);

  const lastNewsElementRef = (node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && newsToShow < allNews.length) {
        setNewsToShow((prev) => prev + 5);
      }
    });
    if (node) observer.current.observe(node);
  };

  const handleSubCategoryClick = (subCatId: string) => {
    setSelectedSubCategory(subCatId);
    setNewsToShow(5);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          {categoryInfo?.category}
        </h1>
        <div className="flex justify-center items-center space-x-2 mb-3">
          {subCategory?.map((subCat, index) => (
            <React.Fragment key={subCat._id}>
              {index > 0 && <span className="text-gray-400">•</span>}
              <button
                onClick={() => handleSubCategoryClick(subCat._id)}
                className={`text-lg hover:underline ${
                  selectedSubCategory === subCat._id
                    ? "text-red-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {subCat?.title}
              </button>
            </React.Fragment>
          ))}
        </div>
        {selectedSubCategory && (
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {subCategory.find((sc) => sc._id === selectedSubCategory)?.title}
          </h2>
        )}
      </div>

      <AdDisplay ads={ads} adId="headerBottom" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedNews.map((newsItem, index) => (
          <Link href={`/${lang}/news/${newsItem._id}`} key={newsItem._id}>
            <div
              ref={
                index === displayedNews.length - 1 ? lastNewsElementRef : null
              }
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={newsItem.img || "/placeholder.svg"}
                  alt={newsItem.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-80"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: newsItem.content,
                  }}
                />
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{newsItem.location.city}</span>
                  <span>
                    {new Date(newsItem.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AdDisplay ads={ads} adId="categoryBottom" />

      {newsToShow >= displayedNews.length && (
        <div className="text-center py-8 text-gray-600">
          No more news available.
        </div>
      )}
    </div>
  );
};

export default IndexPage;
