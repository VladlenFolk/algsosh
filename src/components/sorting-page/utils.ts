import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { IColumnItem } from "../../types/sorting-element";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getSortingArray = async (
  arr: IColumnItem[],
  mode: "ascending" | "descending",
  setArrNumber?: Dispatch<SetStateAction<IColumnItem[]>>,
  setIsLoader?: Dispatch<SetStateAction<boolean>>
) => {
  const { length } = arr;
  const newArr: IColumnItem[] = arr;
  if (setIsLoader) setIsLoader(true);
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      newArr[maxInd].state = ElementStates.Changing;
      newArr[j].state = ElementStates.Changing;
      if (setArrNumber) {
        setArrNumber([...newArr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
      let modeSort;
      if (mode === "descending")
        modeSort = newArr[maxInd].number! < newArr[j].number!;
      if (mode === "ascending")
        modeSort = newArr[maxInd].number! > newArr[j].number!;

      if (modeSort) {
        newArr[maxInd].state =
          i === maxInd ? ElementStates.Changing : ElementStates.Default;
        maxInd = j;
        if (setArrNumber) {
          setArrNumber([...newArr]);
          await setDelay(SHORT_DELAY_IN_MS);
        }
      }
      if (j !== maxInd) {
        newArr[j].state = ElementStates.Default;
        if (setArrNumber) {
          setArrNumber([...newArr]);
          await setDelay(SHORT_DELAY_IN_MS);
        }
      }
    }
    if (i === maxInd) {
      newArr[i].state = ElementStates.Modified;
      if (setArrNumber) {
        setArrNumber([...newArr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
    } else {
      const temp = newArr[maxInd];
      newArr[maxInd] = newArr[i];
      newArr[i] = temp;
      newArr[i].state = ElementStates.Modified;
      if (setArrNumber) {
        setArrNumber([...newArr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
      newArr[maxInd].state = ElementStates.Default;
      if (setArrNumber) {
        setArrNumber([...newArr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
    }
  }
  newArr[length - 1].state = ElementStates.Modified;
  if (setArrNumber) {
    setArrNumber([...newArr]);
  } else {
    return [...newArr];
  }
  if (setIsLoader) setIsLoader(false);
};

export const getBubbleSorting = async (
  arr: IColumnItem[],
  mode: "ascending" | "descending",
  setArrNumber?: Dispatch<SetStateAction<IColumnItem[]>>,
  setIsLoader?: Dispatch<SetStateAction<boolean>>
) => {
  const { length } = arr;
  const newArr: IColumnItem[] = arr;
  if (setIsLoader) setIsLoader(true);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      newArr[j].state = ElementStates.Changing;
      newArr[j + 1].state = ElementStates.Changing;
      if (setArrNumber) {
        setArrNumber([...newArr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
      let modeSort;

      if (mode === "descending") {
        modeSort = newArr[j].number! < newArr[j + 1].number!;
      }
      if (mode === "ascending") {
        modeSort = newArr[j].number! > newArr[j + 1].number!;
      }

      if (modeSort) {
        newArr[j].state = ElementStates.Changing;
        newArr[j + 1].state = ElementStates.Changing;
        const temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
        if (setArrNumber) {
          setArrNumber([...newArr]);
          await setDelay(SHORT_DELAY_IN_MS);
        }
      }
      newArr[j].state = ElementStates.Default;
      newArr[j + 1].state = ElementStates.Default;
      if (j === length - i - 2) {
        newArr[j + 1].state = ElementStates.Modified;
      }
      if (setArrNumber) {
        setArrNumber([...newArr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
    }
  }
  newArr[0].state = ElementStates.Modified;
  if (setArrNumber) {
    setArrNumber([...newArr]);
  } else {
    return [...newArr];
  }
  if (setIsLoader) setIsLoader(false);
};