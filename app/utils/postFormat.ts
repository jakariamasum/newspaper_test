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
  return categoriesData.map((category) => {
    const relatedPosts = newsData
      .filter((newsItem) => newsItem.category.category._id === category._id)
      .map((newsItem) => ({
        img: newsItem.img,
        link: `/news/${newsItem._id}`,
        title: newsItem.title,
      }));

    return {
      category: category.title,
      post: relatedPosts,
    };
  });
};
