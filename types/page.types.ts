export interface IOption {
  value: string;
  label: string;
}

export interface ISectionData {
  sectionTitle: string;
  color: string;
  backgroundColor: string;
  desktopGrid: string;
  mobileGrid: string;
  sectionLimit: string;
  imgPosition?: string;
  width: string;
  box: string;
  categories: IOption[];
}

interface Section {
  _id: string;
  sectionTitle: { _id: string; title: string };
  link: string;
  sectionLimit: number;
  box: string;
  imgPosition: string;
  width: string;
  categories: { value: string; label: string }[];
}

export interface IRows {
  _id: string;
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
  styleType: number;
  desktopGrid: number;
  mobileGrid: number;
  sections: Section[];
}
