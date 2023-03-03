import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { setDelay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

const maxNumber: number = 19;
const minNumber: number = 0;

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [numbersArr, setNumberArr] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      +value >= minNumber &&
      +value <= maxNumber &&
      Number.isInteger(Number(value))
    ) {
      setInputValue(value);
    }
  };

  const getFibonacciNumbers = (n: number): number[] => {
    const arr: number[] = [0, 1];
    for (let i = 2; i <= n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr.slice(1);
  };

  const getFibonacci = async (inputValue: string) => {
    const inputNumber = Number(inputValue);
    const arrFibNums: number[] = getFibonacciNumbers(inputNumber);
    const newArr: number[] = [];
    setIsLoader(true);
    for (let num of arrFibNums) {
      newArr.push(num);
      setNumberArr([...newArr]);
      await setDelay(DELAY_IN_MS);
    }
    setIsLoader(false);
  };

  const getSequence = (inputValue: string) => {
    getFibonacci(inputValue);
    setInputValue("");
  };
  console.log(inputValue);
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          placeholder="Введите число"
          extraClass={styles.input}
          type="number"
          isLimitText
          onChange={onChange}
          value={inputValue}
          max={19}
          maxLength={2}
        />
        <Button
          text={"Рассчитать"}
          isLoader={isLoader}
          disabled={isLoader || inputValue === ""}
          linkedList={"small"}
          onClick={() => getSequence(inputValue)}
        />
      </div>
      <div className={styles.ulContainer}>
        <ul className={styles.circles}>
          {numbersArr.map((item, index) => {
            return (
              <Circle
                key={index}
                letter={item.toString()}
                index={index}
                extraClass={styles.circle}
              />
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};