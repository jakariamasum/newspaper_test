"use client";
import React, { useEffect, useState } from "react";
import News from "@/components/News";
import axiosPublic from "@/lib/axiosPublic";
import { postFormat } from "../utils/postFormat";
import { useLang } from "../context/langContext";
import Loader from "@/components/Loader";
import { IRows } from "@/types/page.types";

interface PageData {
  rows: IRows[];
}

const IndexPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useLang();
  const [seeAll, setSeeAll] = useState("");

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
    const fetchLanguage = async () => {
      try {
        setLoading(true);

        const response = await axiosPublic.get(`/language?title=${lang}`);
        const { data } = response.data;
        setSeeAll(data.seeAll);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    };
    fetchLanguage();
    fetchPageData();
    fetchNewsData();
    fetchCategories();
  }, [lang]);

  const newsData = postFormat(news, category);
  if (loading) {
    return <Loader />;
  }
  console.log(seeAll);

  return (
    <div className="container mx-auto ">
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
                    link={
                      `/${lang}/categories/` +
                      (section?.categories[0]?.value || "/")
                    }
                    limit={Number(section?.sectionLimit) || 5}
                    box={Number(section?.box) || 18}
                    style={Number(section.imgPosition) || 1}
                    item={filteredNewsData}
                    seeAll={seeAll}
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
