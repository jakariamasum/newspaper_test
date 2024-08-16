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



const IndexPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  // const [newsData, setNewsData] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const newsData = [
  {
    category: "cat 1",
    post: [
      {
        img: "/post/1.jpg",
        link: "/news/1",
        title:
          "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
      },
      {
        img: "/post/2.jpg",
        link: "/news/2",
        title:
          "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
      },
      {
        img: "/post/3.jpg",
        link: "/news/3",
        title:
          "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
      },
      {
        img: "/post/4.jpg",
        link: "/news/4",
        title:
          "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
      },
      {
        img: "/post/5.jpg",
        link: "/news/5",
        title:
          "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
      },
    ],
  },
  {
    category: "cat 2",
    post: [
      {
        img: "/post/6.jpg",
        link: "/news/6",
        title:
          "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
      },
      {
        img: "/post/7.jpg",
        link: "/news/7",
        title:
          "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
      },
      {
        img: "/post/8.jpg",
        link: "/news/8",
        title:
          "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
      },
      {
        img: "/post/9.jpg",
        link: "/news/9",
        title:
          "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
      },
      {
        img: "/post/10.jpg",
        link: "/news/10",
        title:
          "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
      },
    ],
  },
];
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
