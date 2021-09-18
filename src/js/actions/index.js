import { KHOAHOC_INFO } from "../constants/action-type";

export const increment = (number) => {
  return {
    type: "INCREMENT",
    payload: number,
  };
};
export const decrement = (number) => {
  return {
    type: "DECREMENT",
    payload: number,
  };
};

export const addRow = (object) => {
  return {
    type: "ADD",
    object
  }
}