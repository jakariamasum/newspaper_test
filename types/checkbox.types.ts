export interface ICheckboxItem {
  title: string;
  _id: string;
  checked?: boolean;
  subCategories?: ICheckboxItem[];
}
