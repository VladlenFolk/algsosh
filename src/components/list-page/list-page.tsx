import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { useState, useEffect, useRef } from "react";
import { LinkedList } from "./utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { DELAY_IN_MS } from "../../constants/delays";
import { Action, Position } from "./utils";
import { getArr } from "./utils";
import { setDelay } from "../../utils/utils";

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList(getArr().map((el) => String(el))));
  const [inputValue, setInputValue] = useState<string>("");
  const [index, setIndex] = useState<string>("-1");
  const [result, setResult] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [action, setAction] = useState<Action | undefined>(undefined);
  const [currentItem, setCurrentItem] = useState("");
  const [changedIndex, setChangedIndex] = useState(-1);
  const [changingIndex, setChangingIndex] = useState(-1);
  const [additionCircleIndex, setAdditionCircleIndex] = useState(-1);
  const [additionCirclePosition, setAdditionCirclePosition] = useState<
    Position | undefined
  >(undefined);

  const showResult = () => {
    setResult(
      linkedList.current.toArray().map((item) => {
        return item;
      })
    );
  };

  const addHead = async () => {
    setLoader(true);
    setAction(Action.AddToHead);
    linkedList.current.prepend(inputValue);
    if (result.length > 0) {
      setCurrentItem(inputValue);
      setInputValue("");
      setAdditionCirclePosition(Position.Top);
      setAdditionCircleIndex(0);
      await setDelay(DELAY_IN_MS);
      setAdditionCircleIndex(-1);
      setChangedIndex(0);
      showResult();
      await setDelay(DELAY_IN_MS);
      setChangedIndex(-1);
      setAdditionCirclePosition(undefined);
    } else {
      setInputValue("");
      showResult();
      setChangedIndex(0);
      await setDelay(DELAY_IN_MS);
      setChangedIndex(-1);
    }
    setLoader(false);
    setAction(undefined);
  };

  const deleteHead = async () => {
    setLoader(true);
    setAction(Action.DeleteFromHead);
    setAdditionCirclePosition(Position.Bottom);
    setAdditionCircleIndex(0);
    setCurrentItem(result[0]);
    setResult((prev) => ["", ...prev.slice(1)]);
    await setDelay(1000);
    setAdditionCircleIndex(-1);
    setAdditionCirclePosition(undefined);
    linkedList.current.deleteHead();
    showResult();
    setLoader(false);
    setAction(undefined);
  };

  const addTail = async () => {
    setLoader(true);
    setAction(Action.AddToTail);
    linkedList.current.append(inputValue);
    if (result.length > 0) {
      setCurrentItem(inputValue);
      setInputValue("");
      setAdditionCirclePosition(Position.Top);
      setAdditionCircleIndex(linkedList.current.listSize - 2);
      await setDelay(DELAY_IN_MS);
      setAdditionCircleIndex(-1);
      setChangedIndex(linkedList.current.listSize - 1);
      showResult();
      await setDelay(DELAY_IN_MS);
      setChangedIndex(-1);
      setAdditionCirclePosition(undefined);
    } else {
      setInputValue("");
      showResult();
      setChangedIndex(0);
      await setDelay(DELAY_IN_MS);
      setChangedIndex(-1);
    }
    setLoader(false);
    setAction(undefined);
  };

  const deleteTail = async () => {
    setLoader(true);
    setAction(Action.DeleteFromTail);
    setAdditionCirclePosition(Position.Bottom);
    setAdditionCircleIndex(result.length - 1);
    setCurrentItem(result[result.length - 1]);
    setResult((prev) => [...prev.slice(0, result.length - 1), ""]);
    await setDelay(DELAY_IN_MS);
    setAdditionCircleIndex(-1);
    setAdditionCirclePosition(undefined);
    linkedList.current.deleteTail();
    showResult();
    setLoader(false);
    setAction(undefined);
  };

  const addByIndex = async () => {
    setLoader(true);
    setAction(Action.AddByIndex);
    let currentIndex = 0;
    while (currentIndex <= +index) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }
    setAdditionCirclePosition(Position.Top);
    setAdditionCircleIndex(+index);
    setCurrentItem(inputValue);
    await setDelay(DELAY_IN_MS);
    linkedList.current.addByIndex(inputValue, +index);
    setAdditionCircleIndex(-1);
    setChangedIndex(+index);
    showResult();
    await setDelay(DELAY_IN_MS);
    setChangedIndex(-1);
    setChangingIndex(-1);
    setAdditionCirclePosition(undefined);
    setInputValue("");
    setIndex("-1");
    setLoader(false);
    setAction(undefined);
  };

  const deleteByIndex = async () => {
    setLoader(true);
    setAction(Action.DeleteByIndex);
    let currentIndex = 0;
    while (currentIndex <= +index) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }
    setAdditionCirclePosition(Position.Bottom);
    setAdditionCircleIndex(+index);
    setCurrentItem(result[+index]);
    setResult((prev) => [
      ...prev.slice(0, +index),
      "",
      ...prev.slice(+index + 1),
    ]);
    await setDelay(DELAY_IN_MS);
    setAdditionCircleIndex(-1);
    setChangingIndex(-1);
    setAdditionCirclePosition(undefined);
    linkedList.current.deleteByIndex(+index);
    setIndex("-1");
    showResult();
    setLoader(false);
    setAction(undefined);
  };

  const isCorrectAddIndex = (): boolean | undefined => {
    return !(
      inputValue.length !== 0 &&
      +index < linkedList.current.listSize &&
      +index > -1
    );
  };

  const isCorrectDeleteIndex = (): boolean | undefined => {
    return !(+index < linkedList.current.listSize && +index > -1);
  };

  const composeHeadProperty = (index: number) => {
    return additionCircleIndex === index &&
      additionCirclePosition === Position.Top ? (
      <Circle letter={currentItem} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      "head"
    ) : undefined;
  };

  const composeTailProperty = (index: number) => {
    return additionCircleIndex === index &&
      additionCirclePosition === Position.Bottom ? (
      <Circle letter={currentItem} state={ElementStates.Changing} isSmall />
    ) : index === result.length - 1 ? (
      "tail"
    ) : undefined;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target.value;
    setInputValue(element);
  };

  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      +value > -1 &&
      +value < linkedList.current.listSize &&
      Number.isInteger(Number(value))
    ) {
      setIndex(value);
    }
  };

  useEffect(() => {
    showResult();
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.topContainer}>
        <Input
          placeholder="Введите значение"
          type="text"
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          value={inputValue}
          onChange={onChange}
          disabled={loader}
        />
        <Button
          type={"button"}
          text={"Добавить в head"}
          extraClass={styles.topButton}
          disabled={
            (loader && action !== Action.AddToHead) || inputValue.length === 0
          }
          onClick={addHead}
          isLoader={loader && action === Action.AddToHead}
        />
        <Button
          type={"button"}
          text={"Добавить в tail"}
          extraClass={styles.topButton}
          disabled={
            (loader && action !== Action.AddToTail) || inputValue.length === 0
          }
          onClick={addTail}
          isLoader={loader && action === Action.AddToTail}
        />
        <Button
          type={"button"}
          text={"Удалить из head"}
          extraClass={styles.topButton}
          disabled={
            (loader && action !== Action.DeleteFromHead) || result.length === 0
          }
          onClick={deleteHead}
          isLoader={loader && action === Action.DeleteFromHead}
        />
        <Button
          type={"button"}
          text={"Удалить из tail"}
          extraClass={styles.topButton}
          disabled={
            (loader && action !== Action.DeleteFromTail) || result.length === 0
          }
          onClick={deleteTail}
          isLoader={loader && action === Action.DeleteFromTail}
        />
      </div>
      <div className={styles.botContainer}>
        <Input
          placeholder="Введите индекс"
          type="number"
          extraClass={styles.input}
          value={index === "-1" ? "" : index}
          maxLength={4}
          disabled={loader}
          onChange={onChangeIndex}
        />
        <Button
          type={"button"}
          text={"Добавить по индексу"}
          extraClass={styles.botButton}
          disabled={
            (loader && action !== Action.AddByIndex) ||
            isCorrectAddIndex() ||
            index === ""
          }
          onClick={addByIndex}
          isLoader={loader && action === Action.AddByIndex}
        />
        <Button
          type={"button"}
          text={"Удалить по индексу"}
          onClick={deleteByIndex}
          disabled={
            (loader && action !== Action.DeleteByIndex) ||
            isCorrectDeleteIndex() ||
            index === ""
          }
          isLoader={loader && action === Action.DeleteByIndex}
          extraClass={styles.botButton}
        />
      </div>
      <ul className={styles.letters}>
        {result.length > 0 &&
          result.map((item, index) => {
            const currentState =
              changedIndex === index
                ? ElementStates.Modified
                : changingIndex >= index
                ? ElementStates.Changing
                : ElementStates.Default;
            const head = composeHeadProperty(index);
            const tail = composeTailProperty(index);
            return (
              <li key={index} className={styles.item}>
                <Circle
                  index={index}
                  state={currentState}
                  letter={`${item}`}
                  head={head}
                  tail={tail}
                />
                {index !== result.length - 1 && (
                  <ArrowIcon
                    fill={changingIndex - 1 >= index ? "#d252e1" : undefined}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};