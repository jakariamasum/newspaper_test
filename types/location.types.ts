export interface IArea {
  _id: string;
  title: string;
  city: {
    _id: string;
    title: string;
  };
  isActive: boolean;
}

export interface ICity {
  _id: string;
  title: string;
  isActive: boolean;
}
