import { ArrayItem } from "../../types/element-string";
import { ElementStates } from "../../types/element-states";

export const swap = (start: number, end: number, arr: ArrayItem[]) => {
  const swapArr = [...arr];
  const swapConst = swapArr[start].item;
  swapArr[start].item = swapArr[end].item;
  swapArr[end].item = swapConst;
  return swapArr;
};

export const reverseString = (
  start: number = 0,
  end: number = 0,
  arr: ArrayItem[] = [{ item: "", state: ElementStates.Modified }]
) => {
  const n = Math.floor(arr.length / 2);
  let tesArr = [...arr];
  if (start === end || start === n) {
    arr[start].state = ElementStates.Modified;
  }
  if (start < end) {
    arr[start].state = ElementStates.Changing;
    arr[end].state = ElementStates.Changing;
    arr = swap(start, end, arr);
    arr[start].state = ElementStates.Modified;
    arr[end].state = ElementStates.Modified;
    start++;
    end--;
    reverseString(start, end, arr);
  } else {
    return tesArr;
  }
  return tesArr;
};
