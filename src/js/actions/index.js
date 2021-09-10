import { KHOAHOC_INFO } from "../constants/action-type";
export const Khoahoc_Info = ({ ...initialState }) => {
  return { type: KHOAHOC_INFO, ...initialState }
};