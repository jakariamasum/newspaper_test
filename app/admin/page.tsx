"use client";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { useSettings } from "../context/settingContext";
import Link from "next/link";
import { useLang } from "../context/langContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { MdPublish } from "react-icons/md";
import { toast, Toaster } from "sonner";
import moment from "moment";

type TLanguageCount = {
  lang: string;
  count: number;
  latestNews: TNews[];
};

type TLanguage = {
  _id: string;
  title: string;
  language_code: string;
  createdAt: string;
};

type TNews = {
  _id: string;
  status: string;
  title: string;
  publishedDate: string;
  lang: string;
};

const IndexPage: React.FC = () => {
  const { setLang } = useLang();
  const router = useRouter();
  const { settings } = useSettings();
  const { user } = useAuth();
  const [news, setNews] = useState<TNews[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allLanguages, setAllLanguages] = useState<TLanguage[]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      const response = await axiosPublic.get("/news", {
        params: { limit: 1000000 },
      });
      setNews(response.data.data);
      setLoading(false);
    };
    fetchNewsData();
    const fetchLanguageData = async () => {
      setLoading(true);
      const response = await axiosPublic.get("/language");
      setAllLanguages(response.data.data);
      setLoading(false);
    };
    fetchLanguageData();
  }, []);

  const languageCounts: TLanguageCount[] = allLanguages.map((language) => {
    const newsForLang = news.filter(
      (item: TNews) => item.lang === language.language_code
    );

    return {
      lang: language.language_code,
      count: newsForLang.length,
      latestNews: newsForLang
        .filter((item: TNews) => item.status === "pending")
        .sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        )
        .slice(0, 5),
    };
  });

  const handleAddNews = (lang: string) => {
    setLang(lang);
    router.push(`/admin/${lang}/add`);
  };

  if (loading) {
    return <Loader />;
  }

  const handleApprove = async (id: string) => {
    try {
      const payload = {
        status: "published",
      };
      const response = await axiosPublic.put(`/news/admin/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        setNews((prevNews) =>
          prevNews.map((newsItem) =>
            newsItem._id === id
              ? { ...newsItem, status: "published" }
              : newsItem
          )
        );
        toast.success("News Published successfully!");
      } else {
        toast.warning("Failed to publish news");
      }
    } catch (error) {
      console.error("Failed to publish news:", error);
      toast.warning("Failed to publish news");
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className="bg-white p-10 border-2 flex space-y-4 flex-col items-center justify-center border-dashed border-main rounded-2xl">
          <h1 className="text-xl md:text-6xl font-extrabold">
            Welcome {user?.title}!
          </h1>

          <strong className="text-2xl">{settings?.title || ""}</strong>
        </div>
      </div>
      <div className="container my-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {languageCounts.map((news, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center space-y-5 border border-gray-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <h1 className="font-bold text-2xl text-blue-600">
                  {news.lang}
                </h1>
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-500">{news.count}</p>
              </div>
              <button
                onClick={() => handleAddNews(news.lang)}
                className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition duration-200"
              >
                Add News
              </button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          {languageCounts.map((news, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xl font-semibold `}>
                  {news.lang.toUpperCase()}
                </span>
              </div>

              <div className="overflow-x-auto py-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium text-gray-600 w-1/3">
                        Title
                      </th>

                      <th className="py-3 px-4 text-left font-medium text-gray-600 w-1/4">
                        Date
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600 w-1/4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {news.latestNews.length > 0 ? (
                      news.latestNews.map((item) => (
                        <tr
                          key={item._id}
                          className="hover:bg-gray-100 border-t border-gray-200 transition-colors"
                        >
                          <Link href={`/news/${item._id}`} target="_blank">
                            <td
                              className="py-3 px-4 text-gray-800 truncate max-w-[150px] hover:underline hover:text-blue-500 hover:text-clip"
                              title={item.title}
                            >
                              {item.title}
                            </td>
                          </Link>

                          <td className="py-3 px-4 text-gray-800">
                            {moment(item.publishedDate).format("MMMM Do YYYY")}
                          </td>
                          <td className="py-3 px-4 text-gray-800">
                            {item?.status !== "published" && (
                              <span
                                title="Publish"
                                onClick={() => handleApprove(item._id)}
                              >
                                <MdPublish
                                  fill="blue"
                                  size={22}
                                  className="cursor-pointer"
                                />
                              </span>
                            )}{" "}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={2}
                          className="py-3 px-4 text-center text-gray-500"
                        >
                          No pending news
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default IndexPage;
//s
