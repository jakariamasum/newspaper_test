"use client";

import { useLang } from "@/app/context/langContext";
import { useSettings } from "@/app/context/settingContext";
import AdDisplay from "@/app/utils/AdDisplay";
import Loader from "@/components/Loader";
import axiosPublic from "@/lib/axiosPublic";
import { INews } from "@/types/news.types";
import { ISubCategory } from "@/types/subcategory.types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

interface CategoryInfo {
  _id: string;
  category: string;
  subCategory: string;
}

const IndexPage: React.FC = () => {
  const { settings } = useSettings();
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
  const [subCategory, setSubCategory] = useState<ISubCategory[]>([]);

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
            _id: response.data.data[0].category.category._id,
            category: response.data.data[0].category.category.title,
            subCategory: response.data.data[0].category.subcategory,
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
      if (categoryInfo?._id) {
        const response = await axiosPublic.get(
          `/sub-categories/category/${categoryInfo._id}`
        );
        setSubCategory(response.data.data);
      }
    };

    fetchSubCategories();
  }, [categoryInfo?._id]);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {settings?.categoryStyle === "1" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Ad */}
          <div className="mb-4">
            <AdDisplay ads={ads} adId="categoryTop" />
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Ad */}
            <div className="hidden lg:block lg:col-span-2">
              <AdDisplay ads={ads} adId="categoryLeft" />
            </div>

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-8 text-center">
                {/* Category Title */}
                <h1 className="text-4xl font-bold text-red-600 mb-2">
                  {categoryInfo?.category}
                </h1>

                {/* Subcategory List */}
                <div className="flex justify-center items-center space-x-2 mb-3">
                  {subCategory?.map((subCat, index) => (
                    <React.Fragment key={subCat._id}>
                      {index > 0 && <span className="text-gray-400">•</span>}
                      <Link
                        href={`/${lang}/categories/${_id}/${subCat?._id}`}
                        className={`text-lg hover:underline ${
                          selectedSubCategory === subCat._id
                            ? "text-red-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {subCat?.title}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedNews.map((newsItem, index) => (
                  <Link
                    href={`/${lang}/news/${newsItem._id}`}
                    key={newsItem._id}
                  >
                    <div
                      ref={
                        index === displayedNews.length - 1
                          ? lastNewsElementRef
                          : null
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

              {/* Bottom Ad */}
              <div className="mt-8">
                <AdDisplay ads={ads} adId="categoryBottom" />
              </div>

              {newsToShow >= displayedNews.length && (
                <div className="text-center py-8 text-gray-600">
                  No more news available.
                </div>
              )}
            </div>

            {/* Right Ad */}
            <div className="hidden lg:block lg:col-span-2">
              <AdDisplay ads={ads} adId="categoryRight" />
            </div>
          </div>
        </div>
      )}

      {settings?.categoryStyle !== "1" && <p>Design Comming in few days</p>}
    </>
  );
};

export default IndexPage;
