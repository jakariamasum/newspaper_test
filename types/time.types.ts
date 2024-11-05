import { Dispatch, SetStateAction } from "react";

export interface ITime {
  time?: string | null;
  setTime?: Dispatch<SetStateAction<string | null>>;
}
