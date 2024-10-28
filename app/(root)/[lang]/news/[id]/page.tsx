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
import { useSettings } from "@/app/context/settingContext";
import SocialShare from "@/components/SocialShare";
import FullscreenImage from "@/components/FullScreenImage";

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
const IndexPage = () => {
  const { settings } = useSettings();
  const { lang } = useLang();
  const [ads, setAds] = useState<IAds[]>([]);
  const path = useParams();
  const [news, setNews] = useState<TNews>();
  const [allNews, setAllNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const url = window.location.href;
  const [langDetails, setLangDetails] = useState<TLanguage | null>(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      const response = await axiosPublic.get(`/news/${lang}`);
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
  const mostPopularPosts = getRandomPosts(relatedPosts, 1);

  return (
    <>
      {settings?.detailsStyle === "1" && (
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

                  <SocialShare
                    id={path.id as string}
                    title={news?.title as string}
                    url={url}
                  />
                </div>
              </div>

              <div className="bg-white p-2">
                <AdDisplay ads={ads} adId="detailsImagesTop" />
                <FullscreenImage
                  alt={news?.title as string}
                  src={news?.img as string}
                  height={464}
                  width={696}
                />
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
                <FullscreenImage
                  alt={news?.title as string}
                  src={news?.img as string}
                  height={464}
                  width={696}
                />

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
      {settings?.detailsStyle === "2" && (
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
                    />
                    <span>By</span>
                    <strong>{news?.title || ""}</strong>
                    <span className="pl-4">
                      {moment(news?.createdAt).format("MMMM Do YYYY")}
                    </span>
                  </div>

                  <SocialShare
                    id={path.id as string}
                    title={news?.title as string}
                    url={url}
                  />
                </div>
              </div>

              <AdDisplay ads={ads} adId="detailsImagesTop" />
              <FullscreenImage
                alt={news?.title as string}
                src={news?.img as string}
                height={464}
                width={696}
              />

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
      {settings?.detailsStyle !== "1" && settings?.detailsStyle !== "2" && (
        <p>New design comming soon........</p>
      )}
      <Toaster richColors position="top-right" />
    </>
  );
};
export default IndexPage;
