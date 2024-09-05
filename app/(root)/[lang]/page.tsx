"use client";

import { postFormat } from "@/app/utils/postFormat";
import News from "@/components/News";
import axiosPublic from "@/lib/axiosPublic";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const pathname = useParams();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // const response = await axios.get("/pageData.json");
        const response = await axiosPublic.get(
          `/pages/get-page/${pathname.lang}`
        );
        setPageData(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchPageData();
    const fetchNewsData = async () => {
      try {
        const response = await axiosPublic.get(`/news?lang=${pathname.lang}`);
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
  // console.log(news, newsData, pageData);

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
            {row.sections.map((section, indx) => {
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
                    title={`Section ${indx}`}
                    link={section.link || "/"}
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
