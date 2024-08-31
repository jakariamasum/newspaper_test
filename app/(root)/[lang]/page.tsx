"use client";

import { postFormat } from "@/app/utils/postFormat";
import News from "@/components/News";
import axiosPublic from "@/lib/axiosPublic";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  sectionTitle: { title: string };
  link: string;
  limit: number;
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
  const pathname = usePathname();
  console.log(pathname);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // const response = await axios.get("/pageData.json");
        const response = await axiosPublic.get(`/pages/get-page${pathname}`);
        setPageData(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchPageData();
    const fetchNewsData = async () => {
      try {
        const response = await axiosPublic.get(`/news/${pathname}`);
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

  const newsData = postFormat(news, category);
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
            backgroundColor: row.bgColor,
            color: row.textColor,
          }}
        >
          <div className="flex flex-col md:flex-row">
            {row.sections.map((section) => {
              const filteredNewsData = newsData.filter(
                (news) => news.category === section.sectionTitle.title
              );

              return (
                <div
                  key={section.sectionTitle.title}
                  style={{ width: `${section.width}%` }}
                  className="p-2"
                >
                  <News
                    title={section.sectionTitle.title}
                    link={section.link || "/"}
                    limit={section.limit}
                    box={row.id + 1 || 18}
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
