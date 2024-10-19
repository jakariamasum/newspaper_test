"use client";
import React, { useEffect, useRef, useState } from "react";
import News from "@/components/News";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/Comment";
import axiosPublic from "@/lib/axiosPublic";
import AdDisplay from "@/app/utils/AdDisplay";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { postFormat } from "@/app/utils/postFormat";
import { getRandomPosts } from "@/app/utils/getRandomPosts";
import { useLang } from "@/app/context/langContext";
import { toast, Toaster } from "sonner";
import { FaCompress } from "react-icons/fa";
import Head from "next/head";
import { IAds } from "@/types/ads.types";

type TNews = {
  _id: string;
  title: string;
  content: string;
  author: { title: string; img: string };
  createdAt: string;
  img: string;
  category: { category: { title: string; _id: string } };
};
type TLanguage = {
  relatedPost: string;
  popularPost: string;
  seeAll: string;
};
const IndexPage: React.FC = () => {
  const { lang } = useLang();
  const router = useRouter();
  const [page] = useState<number>(1);
  const [ads, setAds] = useState<IAds[]>([]);
  const path = useParams();
  const [news, setNews] = useState<TNews>();
  const [allNews, setAllNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const url = window.location.href;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [langDetails, setLangDetails] = useState<TLanguage | null>(null);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleImageClick1 = () => {
    if (imageContainerRef.current) {
      if (!document.fullscreenElement) {
        imageContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleExitFullScreenClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      const response = await axiosPublic.get(`/news`);
      setAllNews(response.data.data);
    };
    fetchAllNews();
    const fetchNews = async () => {
      const response = await axiosPublic.get(`/news/each-news/${path.id}`);
      setNews(response.data.data);
    };
    fetchNews();
    const fetchCategory = async () => {
      const response = await axiosPublic.get("/categories");
      setCategories(response.data.data);
    };
    fetchCategory();
    const fetchAds = async () => {
      const response = await axiosPublic.get("/ads");
      setAds(response.data.data);
    };
    fetchAds();
    const fetchLanguage = async () => {
      try {
        const response = await axiosPublic.get(`/language?lang=${lang}`);
        setLangDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };
    fetchLanguage();
  }, []);
  const contentParts = news?.content?.split(/<\/p>/) || [];
  const halfwayIndex = Math.floor(contentParts?.length / 2);
  const allPost = postFormat(allNews, categories);
  const relatedPosts = allPost?.filter(
    (item) => item.category === news?.category?.category?.title
  );
  const mostPopularPosts = getRandomPosts(relatedPosts, 5);

  const handlePrintClick = (id: string) => {
    router.push(`/print/${id}`);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Head>
        <title>{news?.title}</title>

        <meta property="og:title" content={news?.title} />
        <meta property="og:image" content={news?.img} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news?.title} />
        <meta name="twitter:image" content={news?.img} />

        <meta property="og:image" content={news?.img} />
        <meta name="pinterest-rich-pin" content="true" />
      </Head>
      {page === 1 && (
        <div className="container my-2">
          <div className="w-full flex md:flex-row flex-col gap-4">
            <div className="w-fill md:w-3/4 block space-y-2">
              <div className="bg-white p-2  ">
                <Link
                  href={
                    `/${lang}/categories/` +
                      (news?.category?.category?._id as string) || "/"
                  }
                  className="bg-main text-white px-2 py-0 rounded-sm mb-2 leading-none"
                >
                  {news?.category?.category?.title || ""}
                </Link>
                <AdDisplay ads={ads} adId="detailsTitleTop" />
                <h1 className="md:text-2xl text-xl font-semibold leading-normal">
                  {news?.title}
                </h1>
                <AdDisplay ads={ads} adId="detailsTitleBottom" />
                <div className="flex items-center flex-col md:flex-row justify-between mt-2">
                  <div className="flex items-center space-x-1 text-sm">
                    <Image
                      src={news?.author?.img || "/default.jpg"}
                      width={20}
                      height={20}
                      alt="ads"
                      className="rounded-full"
                    />
                    <span>By</span>
                    <strong>{news?.author?.title}</strong>
                    <span className="pl-4">
                      {moment(news?.createdAt).format("MMMM Do YYYY")}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-white">
                    <div className="px-3 py-1 border flex items-center space-x-2 text-black">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        height="15"
                        width="15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
                      </svg>
                      <p className="cursor-pointer" onClick={handleCopy}>
                        Copy
                      </p>
                    </div>
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                      className="bg-[#516eab] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 320 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                      </svg>
                    </Link>
                    <Link
                      href={`https://twitter.com/intent/tweet?text=${url}`}
                      className="bg-[#29c5f6] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                      </svg>
                    </Link>
                    <Link
                      href={`https://pinterest.com/pin/create/button/?url=${url}`}
                      className="bg-[#ca212a] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 384 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path>
                      </svg>
                    </Link>
                    <Link
                      href={`https://wa.me/?text=${url}`}
                      className="bg-[#7bbf6a] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                      </svg>
                    </Link>
                    <span
                      onClick={() => handlePrintClick(news?._id as string)}
                      className="bg-[#7bbf6a] p-2 rounded-sm cursor-pointer"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          strokeLinejoin="round"
                          stroke-width="32"
                          d="M384 368h24a40.12 40.12 0 0 0 40-40V168a40.12 40.12 0 0 0-40-40H104a40.12 40.12 0 0 0-40 40v160a40.12 40.12 0 0 0 40 40h24"
                        ></path>
                        <rect
                          width="256"
                          height="208"
                          x="128"
                          y="240"
                          fill="none"
                          strokeLinejoin="round"
                          stroke-width="32"
                          rx="24.32"
                          ry="24.32"
                        ></rect>
                        <path
                          fill="none"
                          strokeLinejoin="round"
                          stroke-width="32"
                          d="M384 128v-24a40.12 40.12 0 0 0-40-40H168a40.12 40.12 0 0 0-40 40v24"
                        ></path>
                        <circle cx="392" cy="184" r="24"></circle>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2">
                <AdDisplay ads={ads} adId="detailsImagesTop" />
                <div ref={imageContainerRef}>
                  <Image
                    src={news?.img || "/default.jpg"}
                    alt={news?.title || "post"}
                    layout="responsive"
                    width={696}
                    height={464}
                    className="cursor-pointer object-contain"
                    onClick={handleImageClick1}
                  />
                  {isFullScreen && (
                    <div
                      className="absolute top-4 right-4 text-white text-4xl cursor-pointer"
                      onClick={handleExitFullScreenClick}
                    >
                      <FaCompress size={24} fill="blue" />
                    </div>
                  )}
                </div>
              </div>
              <AdDisplay ads={ads} adId="detailsImagesBottom" />

              <div className="bg-white p-2 text-base block space-y-2">
                <AdDisplay ads={ads} adId="detailsDescriptionTop" />
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{
                    __html: contentParts?.slice(0, halfwayIndex).join("</p>"),
                  }}
                />

                <AdDisplay ads={ads} adId="detailsDescriptionCentre" />
                <div
                  ref={imageContainerRef}
                  className={`relative ${
                    isFullScreen
                      ? "fixed inset-0 flex justify-center items-center bg-black z-50"
                      : "w-full h-auto"
                  }`}
                >
                  {isFullScreen ? (
                    <Image
                      src={news?.img || "/default.jpg"}
                      alt={news?.title || "post"}
                      layout="responsive"
                      width={1920}
                      height={1080}
                      className="cursor-pointer object-contain"
                      onClick={handleExitFullScreenClick}
                    />
                  ) : (
                    <Image
                      src={news?.img || "/default.jpg"}
                      width={696}
                      height={464}
                      alt={news?.title || "post"}
                      className="w-min mx-auto h-auto cursor-pointer"
                      onClick={handleImageClick1}
                    />
                  )}

                  {isFullScreen && (
                    <div
                      className="absolute top-4 right-4 text-white text-4xl cursor-pointer"
                      onClick={handleExitFullScreenClick}
                    >
                      <FaCompress size={24} fill="blue" />
                    </div>
                  )}
                </div>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{
                    __html: contentParts?.slice(halfwayIndex).join("</p>"),
                  }}
                />
              </div>
              <AdDisplay ads={ads} adId="detailsDescriptionBottom" />

              <Comment />
              <AdDisplay ads={ads} adId="detailsRelatedPostTop" />

              <News
                title={langDetails?.relatedPost || "RELATED ARTICLES"}
                link={
                  `/${lang}/categories/` +
                    (news?.category?.category?._id as string) || "/"
                }
                limit={5}
                box={14}
                style={2}
                item={relatedPosts}
                seeAll={langDetails?.seeAll}
              />
              <AdDisplay ads={ads} adId="detailsRelatedPostBottom" />
            </div>
            <div className="w-fill md:w-1/4">
              <div className="sticky top-0">
                <AdDisplay ads={ads} adId="detailsPopularPostTop" />

                <News
                  title={langDetails?.popularPost || "MOST POPULAR"}
                  link={
                    `/${lang}/categories/` +
                      (news?.category?.category?._id as string) || "/"
                  }
                  limit={5}
                  box={2}
                  style={2}
                  item={mostPopularPosts}
                  seeAll={langDetails?.seeAll}
                />
                <AdDisplay ads={ads} adId="detailsPopularPostBottom" />
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 2 && (
        <div className="container my-2">
          <div className="w-full flex md:flex-row flex-col gap-4">
            <div className="w-fill md:w-3/4 block space-y-2">
              <div className="bg-white p-2">
                <Image
                  src={news?.img || "/default.jpg"}
                  width={696}
                  height={464}
                  alt={news?.title || `post`}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => handleImageClick1}
                />
              </div>

              <Link href="/" className="mb-2 block bg-white p-2">
                <Image
                  src="/ads/a728.jpg"
                  width={728}
                  height={90}
                  alt="ads"
                  className="w-full h-auto"
                />
              </Link>

              <div className="bg-white p-2">
                <Link
                  href={
                    ((`/${lang}/categories/` +
                      news?.category?.category?._id) as string) || "/"
                  }
                  className="bg-main text-white px-2 py-0 rounded-sm mb-2 leading-none"
                >
                  {news?.category?.category?.title || "Category"}
                </Link>
                <AdDisplay ads={ads} adId="detailsTitleTop" />
                <h1 className="md:text-2xl text-xl font-semibold leading-normal">
                  {news?.title || ""}
                </h1>
                <AdDisplay ads={ads} adId="detailsTitleBottom" />

                <div className="flex items-center flex-col md:flex-row justify-between mt-2">
                  <div className="flex items-center space-x-1 text-sm">
                    <Image
                      src={news?.author?.img || "/default.jpg"}
                      width={20}
                      height={20}
                      alt={news?.author?.title || ""}
                      className="rounded-full cursor-pointer"
                      onClick={() => handleImageClick1}
                    />
                    <span>By</span>
                    <strong>{news?.title || ""}</strong>
                    <span className="pl-4">
                      {moment(news?.createdAt).format("MMMM Do YYYY")}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-white">
                    <div className="px-3 py-1 border flex items-center space-x-2 text-black">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        height="15"
                        width="15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
                      </svg>
                      <p className="cursor-pointer" onClick={handleCopy}>
                        Copy
                      </p>{" "}
                    </div>
                    <Link
                      href="/"
                      className="bg-[#516eab] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 320 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="/"
                      className="bg-[#29c5f6] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="/"
                      className="bg-[#ca212a] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 384 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="/"
                      className="bg-[#7bbf6a] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="/print/1"
                      className="bg-[#7bbf6a] p-2 rounded-sm"
                      target="_blank"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          strokeLinejoin="round"
                          stroke-width="32"
                          d="M384 368h24a40.12 40.12 0 0 0 40-40V168a40.12 40.12 0 0 0-40-40H104a40.12 40.12 0 0 0-40 40v160a40.12 40.12 0 0 0 40 40h24"
                        ></path>
                        <rect
                          width="256"
                          height="208"
                          x="128"
                          y="240"
                          fill="none"
                          strokeLinejoin="round"
                          stroke-width="32"
                          rx="24.32"
                          ry="24.32"
                        ></rect>
                        <path
                          fill="none"
                          strokeLinejoin="round"
                          stroke-width="32"
                          d="M384 128v-24a40.12 40.12 0 0 0-40-40H168a40.12 40.12 0 0 0-40 40v24"
                        ></path>
                        <circle cx="392" cy="184" r="24"></circle>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <AdDisplay ads={ads} adId="detailsImagesTop" />
              <div ref={imageContainerRef}>
                <Image
                  src={news?.img || "/default.jpg"}
                  alt={news?.title || "post"}
                  layout="responsive"
                  width={696}
                  height={464}
                  className="cursor-pointer object-contain"
                  onClick={handleImageClick1}
                />
                {isFullScreen && (
                  <div
                    className="absolute top-4 right-4 text-white text-4xl cursor-pointer"
                    onClick={handleExitFullScreenClick}
                  >
                    <FaCompress size={24} fill="blue" />
                  </div>
                )}
              </div>

              <AdDisplay ads={ads} adId="detailsImagesBottom" />

              <Comment />

              <AdDisplay ads={ads} adId="detailsRelatedPostTop" />

              <News
                title={langDetails?.relatedPost || "RELATED ARTICLES"}
                link={
                  ((`/${lang}/categories/` +
                    news?.category?.category?._id) as string) || "/"
                }
                limit={5}
                box={14}
                style={2}
                item={relatedPosts}
                seeAll={langDetails?.seeAll}
              />

              <AdDisplay ads={ads} adId="detailsRelatedPostBottom" />
            </div>
            <div className="w-fill md:w-1/4">
              <div className="sticky top-0">
                <AdDisplay ads={ads} adId="detailsPopularPostTop" />

                <News
                  title={langDetails?.popularPost || "MOST POPULAR"}
                  link={
                    ((`/${lang}/categories/` +
                      news?.category?.category?._id) as string) || "/"
                  }
                  limit={5}
                  box={2}
                  style={2}
                  item={mostPopularPosts}
                  seeAll={langDetails?.seeAll}
                />
                <AdDisplay ads={ads} adId="detailsPopularPostBottom" />
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors position="top-right" />
    </>
  );
};
export default IndexPage;
