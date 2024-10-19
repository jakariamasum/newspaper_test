export interface ISubCategory {
  _id: string;
  title: string;
  description?: string;
  category: {
    _id: string;
    title: string;
  };
  img?: string;
  lang: string;
  type: string;
}
