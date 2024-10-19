export interface INews {
  _id: string;
  title: string;
  content: string;
  img: string;
  tags: string[];
  author: {
    _id: string;
    title: string;
  };
  location: {
    city: string;
    area: string;
  };
  category: {
    category: { title: string; _id: string };
    subCategory: string;
  };
  lang: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  waterMark?: string;
  publishedDate: string;
}
