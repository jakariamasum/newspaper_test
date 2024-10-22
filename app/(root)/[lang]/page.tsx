"use client";

import { useLang } from "@/app/context/langContext";
import { postFormat } from "@/app/utils/postFormat";
import Loader from "@/components/Loader";
import News from "@/components/News";
import axiosPublic from "@/lib/axiosPublic";
import { IRows } from "@/types/page.types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PageData {
  rows: IRows[];
}

const IndexPage: React.FC = () => {
  const pathname = useParams();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { lang } = useLang();
  const [seeAll, setSeeAll] = useState("");

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        // const response = await axios.get("/pageData.json");
        const response = await axiosPublic.get(
          `/pages/get-page/${pathname.lang}`
        );
        setPageData(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    };

    console.log(pathname.lang);
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(`/news/${pathname.lang}`);
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await axiosPublic.get("/categories?lang=all");
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
      setLoading(false);
    };
    const fetchLanguage = async () => {
      try {
        setLoading(true);

        const response = await axiosPublic.get(`/language?lang=${lang}`);
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
  }, []);

  const newsData = postFormat(news, category);
  // console.log(news, newsData, pageData);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      {pageData?.rows.map((row) => (
        <div
          key={row._id}
          className="my-4"
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
