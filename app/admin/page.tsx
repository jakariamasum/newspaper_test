"use client";
import News from "@/components/News";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { postFormat } from "../utils/postFormat";
import { useSettings } from "../context/settingContext";
import Link from "next/link";
type TLanguageCount = {
  lang: string;
  count: number;
  latestNews: any[];
};

const IndexPage: React.FC = () => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const fetchNewsData = async () => {
      const response = await axiosPublic.get("/news?lang=all");
      setNews(response.data.data);
    };
    fetchNewsData();
    const fetchCategoryData = async () => {
      const response = await axiosPublic.get("/categories");
      setCategories(response.data.data);
    };
    fetchCategoryData();
    const fetchSubCategoryData = async () => {
      const response = await axiosPublic.get("/sub-categories");
      setSubCategories(response.data.data);
    };
    fetchSubCategoryData();
    const fetchVideosData = async () => {
      const response = await axiosPublic.get("/videos");
      setVideos(response.data.data);
    };
    fetchVideosData();
    const fetchStoryData = async () => {
      const response = await axiosPublic.get("/story");
      setStories(response.data.data);
    };
    fetchStoryData();
  }, []);
  // console.log(news);

  const newsItems = postFormat(news, categories);
  const videoItems = postFormat(videos, categories);

  const languageCounts: TLanguageCount[] = Object.values(
    news.reduce(
      (acc: { [key: string]: TLanguageCount }, item: { lang: string }) => {
        if (!acc[item.lang]) {
          acc[item.lang] = { lang: item.lang, count: 0, latestNews: [] };
        }
        acc[item.lang].count += 1;
        acc[item.lang].latestNews.push(item);
        return acc;
      },
      {}
    )
  ).map((langCount) => ({
    ...langCount,
    latestNews: langCount.latestNews
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5),
  }));
  languageCounts.forEach((item) => console.log(item.latestNews.length));
  const colorMapping: { [key: string]: string } = {
    en: "blue-500",
    bd: "green-500",
    bl: "red-500",
    fr: "purple-500",
    es: "yellow-500",
    de: "pink-500",
    // add more if needed
    default: "gray-500",
  };
  return (
    <>
      <div className="container my-4">
        <div className="bg-white p-10 border-2 flex space-y-4 flex-col items-center justify-center border-dashed border-main rounded-2xl">
          <h1 className="text-xl md:text-6xl font-extrabold">
            Welcome {user?.title}!
          </h1>
          <p
            className="text-base md:text-2xl"
            dangerouslySetInnerHTML={{ __html: settings?.description || "" }}
          />
          <strong className="text-2xl">{settings?.title || ""}</strong>
        </div>
      </div>
      <div className="container my-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-md px-2 py-4 text-center block space-y-3 text-white">
            <h1 className="font-bold text-xl">Orders</h1>
            <p>123546</p>
          </div>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md px-2 py-4 text-center block space-y-3 text-white">
            <h1 className="font-bold text-xl">Products</h1>
            <p>123546</p>
          </div>
          <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-md px-2 py-4 text-center block space-y-3 text-white">
            <h1 className="font-bold text-xl">Category</h1>
            <p>{categories?.length || 0}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-md px-2 py-4 text-center block space-y-3 text-white">
            <h1 className="font-bold text-xl">Brands</h1>
            <p>123546</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md px-2 py-4 text-center block space-y-3 text-white">
            <h1 className="font-bold text-xl">Banner</h1>
            <p>123546</p>
          </div>
          <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-md px-2 py-4 text-center block space-y-3 text-white">
            <h1 className="font-bold text-xl">Banner</h1>
            <p>123546</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  py-8">
          {languageCounts.map((news, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xl font-semibold text-${
                    colorMapping[news.lang] || colorMapping.default
                  }`}
                >
                  {news.lang.toUpperCase()}
                </span>
                <span className="text-4xl font-bold text-gray-700">
                  {news.count}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full bg-${
                    colorMapping[news.lang] || colorMapping.default
                  }`}
                  style={{ width: `${(news.count / 150) * 100}%` }}
                ></div>
              </div>

              {/* Latest News Table */}
              <div className="overflow-x-auto py-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium text-gray-600 w-1/3">
                        Title
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600 w-1/3">
                        Content
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600 w-1/4">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {news.latestNews.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-100 border-t border-gray-200 transition-colors"
                      >
                        <td
                          className="py-3 px-4 text-gray-800 truncate max-w-[150px] hover:text-clip"
                          title={item.title}
                        >
                          {item.title}
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          <Link
                            href={`/news/${item._id}`}
                            className="text-blue-500 hover:underline"
                          >
                            <span className="hover:underline hover:text-blue-600">
                              See Details
                            </span>
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <News
            title="News list"
            link="/"
            limit={5}
            box={2}
            style={1}
            item={newsItems}
          />
          <News
            title="Videos list"
            link="/"
            limit={5}
            box={2}
            style={1}
            item={videoItems}
          />
          <News
            title="Stories list"
            link="/"
            limit={5}
            box={2}
            style={1}
            item={[
              {
                category: "hello",
                post: [
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title:
                      "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title:
                      "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title:
                      "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title:
                      "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title:
                      "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
export default IndexPage;
