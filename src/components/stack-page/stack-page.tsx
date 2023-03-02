import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { useState, useMemo } from "react";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { TOP } from "../../constants/element-captions";
import { TCircle } from "../../types/element-stack";
import { setDelay } from "../../utils/utils";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [circleArr, setCircleArr] = useState<TCircle[]>([]);
  const [isLoaderPush, setIsLoaderPush] = useState<boolean>(false);
  const [isLoaderPop, setIsLoaderPop] = useState<boolean>(false);
  const stack = useMemo(() => new Stack<TCircle>(), []);
  const disabled = circleArr.length === 0;
  const disabledButtonClear = disabled || isLoaderPush || isLoaderPop;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (Number.isInteger(Number(value))) {
      setInputValue(value);
    }
  };

  const push = async () => {
    setIsLoaderPush(true);
    setInputValue("");
    if (inputValue === "") return 0;
    stack.push({
      value: inputValue,
      head: TOP,
    });
    const newArr = stack.getItems();
    const position = newArr.length - 1;
    newArr.map((item) => (item.head = ""));
    setCircleArr([...newArr]);
    newArr[position].head = TOP;
    newArr[position].state = ElementStates.Changing;
    setCircleArr([...newArr]);
    await setDelay(DELAY_IN_MS);
    newArr[position].state = ElementStates.Default;
    setCircleArr([...newArr]);
    setIsLoaderPush(false);
  };

  const pop = async () => {
    setIsLoaderPop(true);
    circleArr[circleArr.length - 1] = {
      ...circleArr[circleArr.length - 1],
      state: ElementStates.Changing,
    };
    setCircleArr(circleArr);
    await setDelay(DELAY_IN_MS);
    stack.pop();
    const newArr = stack.getItems();
    if (newArr.length > 0) {
      newArr[newArr.length - 1] = {
        ...newArr[newArr.length - 1],
        head: TOP,
        state: ElementStates.Default,
      };
      setCircleArr([...newArr]);
      await setDelay(DELAY_IN_MS);
      newArr[newArr.length - 1].state = ElementStates.Default;
      setCircleArr([...newArr]);
    } else {
      clear();
      setIsLoaderPop(false);
    }
    setIsLoaderPop(false);
  };

  const clear = () => {
    stack.clear();
    setCircleArr([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          placeholder="Введите текст"
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          disabled={isLoaderPush || !inputValue}
          text={"Добавить"}
          extraClass={styles.add}
          onClick={push}
          isLoader={isLoaderPush}
        />
        <Button
          text={"Удалить"}
          extraClass={styles.delete}
          onClick={pop}
          disabled={disabled || isLoaderPush}
          isLoader={isLoaderPop}
        />
        <Button
          text={"Очистить"}
          extraClass={styles.clear}
          disabled={disabledButtonClear}
          onClick={clear}
        />
      </div>
      <ul className={styles.letters}>
        {circleArr.map((item, index) => (
          <li key={index} className={styles.item}>
            <Circle
              index={index}
              state={item.state}
              letter={item.value}
              head={item.head}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};