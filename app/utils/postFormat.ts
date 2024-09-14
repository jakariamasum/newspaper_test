/* eslint-disable react-hooks/rules-of-hooks */
import { useLang } from "../context/langContext";

interface NewsData {
  _id: string;
  title: string;
  category: {
    category: {
      _id: string;
    };
  };
  img: string;
}
interface categoryData {
  _id: string;
  title: string;
}

export const postFormat = (
  newsData: NewsData[],
  categoriesData: categoryData[]
) => {
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
