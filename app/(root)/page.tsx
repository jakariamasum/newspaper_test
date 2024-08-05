"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "@/components/News";

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
}

interface RowData {
  _id: string;
  name: string;
  bgColor: string;
  textColor: string;
  sections: Section[];
}

interface PageData {
  rowData: RowData[];
}

const IndexPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [newsData, setNewsData] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get("/newsData.json");
        setNewsData(response.data.newsData);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    const fetchPageData = async () => {
      try {
        const response = await axios.get("/pageData.json");
        setPageData(response.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
    fetchPageData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          {/* <h2 className="text-2xl mb-4">{row.name}</h2> */}
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
                  item={newsData} // Adjust if necessary to match your data structure
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
