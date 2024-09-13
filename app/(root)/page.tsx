"use client";
import React, { useEffect, useState } from "react";
import News from "@/components/News";
import axiosPublic from "@/lib/axiosPublic";
import { postFormat } from "../utils/postFormat";
import { useLang } from "../context/langContext";
import Loader from "@/components/Loader";

interface Section {
  _id: string;
  sectionTitle: { _id: string; title: string };
  link: string;
  sectionLimit: number;
  box: string;
  imgPosition: string;
  width: string;
  categories: { value: string; label: string }[];
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

const IndexPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useLang();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        // const response = await axios.get("/pageData.json");
        const response = await axiosPublic.get(`/pages/get-page/${lang}`);
        setPageData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    };

    const fetchNewsData = async () => {
      try {
        setLoading(true);

        const response = await axiosPublic.get(`/news?lang=${lang}`);
        setNews(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await axiosPublic.get("/categories");
        setCategory(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    };
    fetchPageData();
    fetchNewsData();
    fetchCategories();
  }, [lang]);

  const newsData = postFormat(news, category);
  if (loading) {
    return <Loader />;
  }

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
              const filteredNewsData = newsData.filter((news) =>
                section.categories.some(
                  (cat) =>
                    cat.label.toLowerCase() === news.category.toLowerCase()
                )
              );

              return (
                <div
                  key={section._id}
                  style={{ width: `${Number(section.width)}%` }}
                  className="p-2"
                >
                  <News
                    title={"Test"}
                    link={`/news/all-category/${section._id}`}
                    limit={Number(section?.sectionLimit) || 5}
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
