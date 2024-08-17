"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "@/components/News";
import axiosPublic from "@/lib/axiosPublic";

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
  title: string;
  link: string;
  limit: number;
  box: number;
  style: number;
  width: number;
  categories: { catId: number; catName: string }[];
}

interface RowData {
  _id: number;
  name: string;
  bgColor: string;
  textColor: string;
  styleType: number;
  desktopGrid: number;
  mobileGrid: number;
  sections: Section[];
}

interface PageData {
  rowData: RowData[];
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

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get("/pageData.json");
        setPageData(response.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchPageData();
    const fetchNewsData = async () => {
      try {
        const response = await axiosPublic.get("/news");
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
  }, []);

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

  // Helper function to create the desired structure
  function transformData(newsData: NewsData[], categoriesData: categoryData[]) {
    return categoriesData.map((category) => {
      console.log(category);
      const relatedPosts = newsData
        .filter((newsItem) => newsItem.category.category._id === category._id)
        .map((newsItem) => ({
          img: newsItem.img,
          link: `/news/${newsItem._id}`,
          title: newsItem.title,
        }));

      return {
        category: category.title,
        post: relatedPosts,
      };
    });
  }

  const newsData = transformData(news, category);
  console.log(news, newsData);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto">
      {pageData?.rowData.map((row) => (
        <div
          key={row._id}
          className="my-4 p-4"
          style={{
            backgroundColor: row.bgColor,
            color: row.textColor,
          }}
        >
          <div className="flex flex-col md:flex-row">
            {row.sections.map((section) => (
              <div
                key={section.title}
                style={{ width: `${section.width}%` }}
                className="p-2"
              >
                <News
                  title={section.title}
                  link={section.link}
                  limit={section.limit}
                  box={section.box}
                  style={section.style}
                  item={newsData}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
