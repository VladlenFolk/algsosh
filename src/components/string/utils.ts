import { ArrayItem } from "../../types/element-string";

export const swap = (start: number, end: number, arr: ArrayItem[]) => {
  const swapArr = [...arr];
  const swapConst = swapArr[start].item;
  swapArr[start].item = swapArr[end].item;
  swapArr[end].item = swapConst;
  return swapArr;
};