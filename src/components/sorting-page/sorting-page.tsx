import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { IColumnItem } from "../../types/sorting-element";
import { ElementStates } from "../../types/element-states";
import { useState, useMemo, useEffect } from "react";
import { SortingMethod } from "../../types/sorting-element";
import styles from "./sorting-page.module.css";
import { randomNumber } from "./utils";
import {
  minValue,
  maxValue,
  minSize,
  maxSize,
} from "../../constants/element-values";
import { getBubbleSorting, getSortingArray } from "./utils";

export const SortingPage: React.FC = () => {
  const [arrNumbers, setArrNumbers] = useState<IColumnItem[]>([]);
  const [isLoaderAscent, setIsLoaderAscent] = useState<boolean>(false);
  const [isLoaderDescent, setIsLoaderDescent] = useState<boolean>(false);
  const [sortingMetod, setSortingMethod] = useState<SortingMethod>(
    SortingMethod.Selection
  );

  const getNewArray = useMemo(
    () => () => {
      const lengthArr = randomNumber(minSize, maxSize);
      const arr = [];
      for (let i = 0; i <= lengthArr - 1; i++) {
        arr[i] = {
          number: randomNumber(minValue, maxValue),
          state: ElementStates.Default,
        };
      }
      setArrNumbers(arr);
    },
    [setArrNumbers]
  );

  useEffect(() => {
    getNewArray();
  }, []);

  const onClickSortDescending = () => {
    if (sortingMetod === "selection") {
      getSortingArray(
        arrNumbers,
        "descending",
        setArrNumbers,
        setIsLoaderDescent
      );
    }
    if (sortingMetod === "bubble") {
      getBubbleSorting(
        arrNumbers,
        "descending",
        setArrNumbers,
        setIsLoaderDescent
      );
    }
  };

  const onClickSortAscending = () => {
    if (sortingMetod === "selection") {
      getSortingArray(
        arrNumbers,
        "ascending",
        setArrNumbers,
        setIsLoaderAscent
      );
    }

    if (sortingMetod === "bubble") {
      getBubbleSorting(
        arrNumbers,
        "ascending",
        setArrNumbers,
        setIsLoaderDescent
      );
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttonContainer}>
        <RadioInput
          label="Выбор"
          extraClass={styles.sample}
          checked={sortingMetod === SortingMethod.Selection}
          onChange={() => setSortingMethod(SortingMethod.Selection)}
        />
        <RadioInput
          label="Пузырёк"
          extraClass={styles.bubble}
          checked={sortingMetod === SortingMethod.Bubble}
          onChange={() => setSortingMethod(SortingMethod.Bubble)}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.increase}
          disabled={isLoaderDescent || arrNumbers.length === 0}
          isLoader={isLoaderAscent}
          onClick={onClickSortAscending}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.decrease}
          disabled={isLoaderAscent || arrNumbers.length === 0}
          isLoader={isLoaderDescent}
          onClick={onClickSortDescending}
        />
        <Button
          text="Новый массив"
          extraClass={styles.newArray}
          disabled={isLoaderAscent || isLoaderDescent}
          onClick={getNewArray}
        />
      </div>
      <ul className={styles.gradation}>
        {arrNumbers.map((el, index) => (
          <li key={index} className={styles.gradationItem}>
            {el.number && <Column index={el.number} state={el.state} />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};