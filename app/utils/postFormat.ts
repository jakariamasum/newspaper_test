/* eslint-disable react-hooks/rules-of-hooks */
import { INews } from "@/types/news.types";
import { useLang } from "../context/langContext";
import { ICategory } from "@/types/category.types";

export const postFormat = (newsData: INews[], categoriesData: ICategory[]) => {
  const { lang } = useLang();
  return categoriesData.map((category) => {
    const relatedPosts = newsData
      .filter((newsItem) => newsItem.category.category._id === category._id)
      .map((newsItem) => ({
        img: newsItem.img,
        link: `/${lang}/news/${newsItem._id}`,
        title: newsItem.title,
      }));

    return {
      category: category.title,
      post: relatedPosts,
    };
  });
};
