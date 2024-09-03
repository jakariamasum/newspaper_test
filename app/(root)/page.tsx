"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "@/components/News";
import axiosPublic from "@/lib/axiosPublic";
import { postFormat } from "../utils/postFormat";
import { useLang } from "../context/langContext";

interface NewsItem {
  img: string;
  link: string;
  title: string;
}

interface NewsCategory {
  category: string;
  post: NewsItem[];
}

interface Section {
  _id: string;
  sectionTitle: { _id: string; title: string };
  link: string;
  sectionLimit: number;
  box: number;
  imgPosition: string;
  width: number;
  categories: { catId: number; catName: string }[];
}

interface Rows {
  _id: string;
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
  styleType: number;
  desktopGrid: number;
  mobileGrid: number;
  sections: Section[];
}

interface PageData {
  rows: Rows[];
}

interface NewsData {
  _id: string;
  title: string;
  category: {
    category: {
      _id: string;
    };
  };
  img: string;
}
interface categoryData {
  _id: string;
  title: string;
}

const IndexPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { lang } = useLang();

  useEffect(() => {
    console.log("lang", lang);
    const fetchPageData = async () => {
      try {
        let response;
        // const response = await axios.get("/pageData.json");
        if (lang) {
          response = await axiosPublic.get("/pages/home");
        } else {
          response = await axiosPublic.get(`/pages/get-page/${lang}`);
        }
        setPageData(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchPageData();
    const fetchNewsData = async () => {
      try {
        const response = await axiosPublic.get(`/news/${lang}`);
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchNewsData();

    const fetchCategories = async () => {
      try {
        const response = await axiosPublic.get("/categories");
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };
    fetchCategories();
  }, [lang]);

  const fetchNewsData = async (
    categories: { catId: string; catName: string }[]
  ) => {
    console.log("categories", categories);
    try {
      const response = await axiosPublic.post(
        "/news/category-news",
        { categories },
        { params: { lang: "en" } } // Modify language as needed
      );
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.log("Error fetching news data:", error);
      console.error("Error fetching news data:", error);
    } finally {
      setLoading(false);
    }
  };

  const newsData = postFormat(news, category);
  console.log(Array.isArray(newsData));
  console.log(news, newsData, pageData);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto">
      {pageData?.rows.map((row) => (
        <div
          key={row._id}
          className="my-4 p-4"
          style={{
            backgroundColor: row?.bgColor || "#ffffff",
            color: row.textColor || "#000000",
          }}
        >
          <div className="flex flex-col md:flex-row">
            {row.sections.map((section) => {
              const filteredNewsData = newsData.filter(
                (news) => news.category === section.sectionTitle?.title
              );

              return (
                <div
                  key={section._id}
                  style={{ width: `${section.width}%` }}
                  className="p-2"
                >
                  <News
                    title={section.sectionTitle?.title || ""}
                    link={`/news/all-category/${section.sectionTitle._id}`}
                    limit={section?.sectionLimit || 5}
                    box={Number(section?.box) || 18}
                    style={Number(section.imgPosition) || 1}
                    item={filteredNewsData}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
