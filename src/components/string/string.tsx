import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { useState, useMemo } from "react";
import { ArrayItem } from "../../types/element-string";
import { ElementStates } from "../../types/element-states";
import { swap } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [inputString, setInputString] = useState("");
  const [arrString, setArrstring] = useState<ArrayItem[]>([]);

  const rewerseString = (start: number, end: number, arr: ArrayItem[]) => {
    const n = Math.floor(arr.length / 2);
    if (start === end || start === n) {
      arr[start].state = ElementStates.Modified;
    }
    if (start < end) {
      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setTimeout(() => {
        arr = swap(start, end, arr);
        arr[start].state = ElementStates.Modified;
        arr[end].state = ElementStates.Modified;
        start++;
        end--;
        rewerseString(start, end, arr);
      }, DELAY_IN_MS);
    } else {
      setArrstring(arr);
      setIsLoader(false);
      return;
    }
    setArrstring(arr);
  };

  const setParmsItems = useMemo(
    () => (string: string) => {
      setIsLoader(true);
      const arr: ArrayItem[] = [];
      const arrItems: string[] = string.split("");
      if (arrItems.length === 1) {
        arr[0] = { item: arrItems[0], state: ElementStates.Modified };
      } else {
        for (let i = 0; i <= arrItems.length - 1; i++) {
          arr[i] = { item: arrItems[i], state: ElementStates.Default };
        }
      }
      setArrstring(arr);
      setTimeout(() => {
        arr[0].state = ElementStates.Changing;
        arr[arr.length - 1].state = ElementStates.Changing;
        setArrstring([...arr]);
      }, DELAY_IN_MS);
      setTimeout(() => {
        rewerseString(0, arr.length - 1, arr);
      }, DELAY_IN_MS);
    },
    [setIsLoader, setArrstring]
  );

  const inputChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputString(e.target.value);
    },
    [setInputString]
  );

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          placeholder="Введите текст"
          extraClass={styles.input}
          isLimitText={true}
          maxLength={11}
          onChange={inputChange}
        />
        <Button
          text={"Развернуть"}
          isLoader={isLoader}
          disabled={inputString ? false : true}
          linkedList={"small"}
          onClick={() => setParmsItems(inputString)}
        />
      </div>
      <ul className={styles.letters}>
        {arrString.map((item, index) => (
          <li key={index} className={styles.item}>
            <Circle state={item.state} letter={item.item} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};