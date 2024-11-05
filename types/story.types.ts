export interface IBanner {
  img: string;
  title: string;
  _id: string;
}

export interface IStory {
  _id: string;
  title: string;
  category: { title: string };
  subCategory?: { title: string };
  banners: IBanner[];
  createdAt: string;
  updatedAt: string;
}
