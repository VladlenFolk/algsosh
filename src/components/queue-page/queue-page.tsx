import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { useState, useMemo } from "react";
import { TCircle } from "../../types/element-stack";
import { ElementStates } from "../../types/element-states";
import { Queue, size } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/utils";

export const QueuePage: React.FC = () => {
  const queueArr: TCircle[] = [...Array(size)].map(() => ({
    value: "",
    state: ElementStates.Default,
  }));
  const [inputValue, setInputValue] = useState<string>("");
  const [circleArr, setCircleArr] = useState<TCircle[]>(queueArr);
  const [isLoaderEnqueue, setIsLoaderEnqueue] = useState<boolean>(false);
  const [isLoaderDenqueue, setIsLoaderDenqueue] = useState<boolean>(false);
  const [head, setHead] = useState<number | null>(null);
  const disabledButtonClear =
    isLoaderEnqueue || isLoaderDenqueue || head === null;
  const disabledButtonPush =
    isLoaderDenqueue ||
    !inputValue ||
    circleArr[circleArr.length - 1].value !== "";
  const queue = useMemo(() => new Queue<string>(size), []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget.value;
    setInputValue(element);
  };

  const clear = () => {
    queue.clear();
    setCircleArr([...queueArr]);
    setHead(null);
  };

  const dequeue = async () => {
    const newArr = [...circleArr];
    setIsLoaderDenqueue(true);
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index === tail.index) {
      clear();
    } else {
      queue.dequeue();
      const head = queue.getHead();
      newArr[head.index - 1].state = ElementStates.Changing;
      setCircleArr([...newArr]);
      if (head.index > 0) {
        newArr[head.index - 1] = { value: "", head: "" };
      }
      await setDelay(DELAY_IN_MS);
      newArr[head.index] = {
        ...newArr[head.index],
        value: head.value,
        head: HEAD,
        state: ElementStates.Default,
      };
      setCircleArr([...newArr]);
    }
    setIsLoaderDenqueue(false);
  };

  const enqueue = async () => {
    setInputValue("");
    setIsLoaderEnqueue(true);
    const newArr = [...circleArr];
    queue.enqueue(inputValue);
    const head = queue.getHead();
    const tail = queue.getTail();
    newArr[head.index] = { value: head.value, head: HEAD };
    setHead(head.index);
    if (tail.index > 0) newArr[tail.index - 1].tail = "";
    newArr[tail.index] = {
      ...newArr[tail.index],
      value: tail.value,
      tail: TAIL,
      state: ElementStates.Changing,
    };
    setCircleArr([...newArr]);
    await setDelay(DELAY_IN_MS);
    newArr[tail.index].state = ElementStates.Default;
    setCircleArr([...newArr]);
    setIsLoaderEnqueue(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input
          data-cy="input"
          placeholder="Введите текст"
          type="text"
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          data-cy="button"
          text={"Добавить"}
          extraClass={styles.add}
          onClick={enqueue}
          disabled={disabledButtonPush}
          isLoader={isLoaderEnqueue}
        />
        <Button
          data-cy="deleteButton"
          text={"Удалить"}
          extraClass={styles.delete}
          onClick={dequeue}
          disabled={isLoaderEnqueue || head === null}
          isLoader={isLoaderDenqueue}
        />
        <Button
          data-cy="clearButton"
          text={"Очистить"}
          extraClass={styles.clear}
          onClick={clear}
          disabled={disabledButtonClear}
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
              tail={item.tail}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
