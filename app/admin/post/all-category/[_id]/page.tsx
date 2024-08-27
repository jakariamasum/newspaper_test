"use client";
import axiosPublic from "@/lib/axiosPublic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

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
    category: string;
    subCategory: string;
  };
  lang: string;
  createdAt: string;
}

const IndexPage: React.FC = () => {
  const [allNews, setAllNews] = useState<INews[]>([]);
  const [displayedNews, setDisplayedNews] = useState<INews[]>([]);
  const [newsToShow, setNewsToShow] = useState(5);
  const observer = useRef<IntersectionObserver>();
  const { _id } = useParams();

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await axiosPublic.get(`/news/category-news/${_id}`);
        setAllNews(response.data.data);
        setDisplayedNews(response.data.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to load news", error);
      }
    };

    fetchAllNews();
  }, []);

  useEffect(() => {
    if (newsToShow > 5) {
      setDisplayedNews(allNews.slice(0, newsToShow));
    }
  }, [newsToShow, allNews]);

  const lastNewsElementRef = (node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && newsToShow < allNews.length) {
        setNewsToShow((prev) => prev + 5);
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedNews.map((newsItem, index) => (
          <div
            key={newsItem._id}
            ref={index === displayedNews.length - 1 ? lastNewsElementRef : null}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            <Image
              src={newsItem.img}
              alt={newsItem.title}
              className="w-full h-48 object-cover mb-4 rounded"
              width={100}
              height={50}
            />
            <h3 className="text-lg font-semibold mb-2">{newsItem.title}</h3>
            <p className="text-gray-700 text-sm">{newsItem.content}</p>
            <span className="text-gray-500 text-xs mt-2">
              {newsItem.location.city}
            </span>
          </div>
        ))}
      </div>
      {newsToShow >= allNews.length && (
        <div className="text-center py-4">No more news available.</div>
      )}
    </div>
  );
};

export default IndexPage;
