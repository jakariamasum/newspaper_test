"use client";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { useSettings } from "../context/settingContext";
import Link from "next/link";
import { useLang } from "../context/langContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
type TLanguageCount = {
  lang: string;
  count: number;
  latestNews: any[];
};

const IndexPage: React.FC = () => {
  const { setLang } = useLang();
  const router = useRouter();
  const { settings } = useSettings();
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      const response = await axiosPublic.get("/news?lang=all");
      setNews(response.data.data);
      setLoading(false);
    };
    fetchNewsData();
  }, []);

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

  const handleAddNews = (lang: string) => {
    setLang(lang);
    router.push(`/admin/post/add`);
  };

  if (loading) {
    return <Loader />;
  }

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  py-8">
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
    </>
  );
};
export default IndexPage;
