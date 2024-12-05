"use client";
import axiosPublic from "@/lib/axiosPublic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSettings } from "@/app/context/settingContext";
import Link from "next/link";
import { useLang } from "@/app/context/langContext";
import Loader from "@/components/Loader";

type TNews = {
  _id: string;
  title: string;
  content: string;
  author: { title: string; img: string };
  createdAt: string;
  img: string;
  category: { category: { title: string; _id: string } };
};

const IndexPage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const path = useParams();
  const { settings } = useSettings();
  const { lang } = useLang();
  const [news, setNews] = useState<TNews | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("Finished loading");
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
  }, []);
  const handlePrint = () => {
    if (typeof window === "undefined") return;

    if (typeof window !== "undefined" && printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  const contentParts = news?.content?.split(/<\/p>/) || [];
  const halfwayIndex = Math.floor(contentParts?.length / 2);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(`/news/each-news/${path.id}`);
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [path.id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <button
        className="px-4 py-2 bg-main block my-4 text-white mx-auto"
        onClick={handlePrint}
      >
        Print
      </button>
      {loading ? (
        <div className="text-center my-4">
          <p>Loading...</p>
        </div>
      ) : (
        <div
          ref={printRef}
          className="max-w-screen-md mx-auto block space-y-4 my-2"
        >
          <Link href={lang === "all" ? "/" : `/${lang}`}>
            <Image
              src={settings?.logo || "/logo.svg"}
              width={200}
              height={50}
              alt="logo"
              className="w-40"
            />
          </Link>

          <h1 className="md:text-2xl text-xl font-semibold leading-normal">
            {news?.title || ""}
          </h1>
          <div className="flex items-center space-x-1 my-4 text-sm">
            <Image
              src={news?.author?.img || "/default.jpg"}
              width={20}
              height={20}
              alt={news?.author?.title || "user"}
              className="rounded-full"
            />
            <span>By</span>
            <strong>{news?.author?.title || ""}</strong>
            <span>{moment(news?.createdAt).format("MMMM Do YYYY")}</span>
          </div>

          <div className="bg-white p-2">
            <Image
              src={news?.img || "/post/1.jpg"}
              width={696}
              height={464}
              alt={news?.title || "ads"}
              className="w-full h-auto"
            />
          </div>

          <div className="bg-white p-2 text-base block text-justify space-y-2">
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{
                __html: contentParts?.slice(0, halfwayIndex).join("</p>"),
              }}
            />

            <Image
              src={news?.img || "/post/2.jpg"}
              width={696}
              height={464}
              alt={news?.title || "posts"}
              className="w-min mx-auto h-auto"
            />
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{
                __html: contentParts?.slice(halfwayIndex).join("</p>"),
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default IndexPage;
