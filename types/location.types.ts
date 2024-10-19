export interface IArea {
  _id: string;
  title: string;
  city: {
    _id: string;
    title: string;
  };
}

export interface ICity {
  _id: string;
  title: string;
  isActive: boolean;
}
