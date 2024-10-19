export interface IAuthor {
  _id: string;
  title: string;
  password: string;
  email: string;
  role: string;
  img?: string;
  bio?: string;
  preApproved: boolean;
  createdAt: string;
  updatedAt: string;
}
