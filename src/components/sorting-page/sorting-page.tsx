import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ColumnItem, ButtonState } from "../../types/sorting-element";
import { ElementStates } from "../../types/element-states";
import { useState, useMemo, useEffect } from "react";
import { SortingMethod } from "../../types/sorting-element";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./sorting-page.module.css";
import { randomNumber } from "./utils";
import {
  minValue,
  maxValue,
  minSize,
  maxSize,
} from "../../constants/element-values";

export const SortingPage: React.FC = () => {
  const [arrNumbers, setArrNumbers] = useState<ColumnItem[]>([]);
  const [buttonState, setButtonState] = useState<ButtonState>({
    ascending: {
      isDisabled: false,
      isLoading: false,
    },
    descending: {
      isDisabled: false,
      isLoading: false,
    },
    createArray: {
      isDisabled: false,
      isLoading: false,
    },
  });
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

  const toggleButton = (toggle: boolean) => {
    for (let name in buttonState) {
      buttonState[name].isDisabled = toggle;
      !toggle && (buttonState[name].isLoading = toggle);
      setButtonState(buttonState);
    }
  };

  const selection = (
    arr: ColumnItem[],
    direction: boolean,
    nextNumber: number,
    min: { number: number; index: number; indexStart: number }
  ) => {
    nextNumber <= arr.length - 1 &&
      (arr[nextNumber].state = ElementStates.Changing);
    min.indexStart + 1 < nextNumber &&
      (arr[nextNumber - 1].state = ElementStates.Default);
    setArrNumbers([...arr]);
    if (
      nextNumber <= arr.length - 1 &&
      direction === arr[nextNumber].number < min.number
    ) {
      min.number = arr[nextNumber].number;
      min.index = nextNumber;
    }
    if (nextNumber <= arr.length - 1) {
      setTimeout(() => {
        nextNumber++;
        selection(arr, direction, nextNumber, min);
      }, DELAY_IN_MS / 2);
    } else {
      let index = min.indexStart;
      if (direction === arr[index].number > min.number) {
        arr[min.index].number = arr[index].number;
        arr[index].number = min.number;
        arr[index].state = ElementStates.Modified;
        if (index >= arr.length - 1) {
          toggleButton(false);
          setArrNumbers([...arr]);
          return;
        }
        min = {
          number: arr[index + 1].number,
          index: index + 1,
          indexStart: index + 1,
        };
        min.index = index + 1;

        selection(arr, direction, index + 1, min);
      } else {
        arr[index].state = ElementStates.Modified;
        if (index >= arr.length - 1) {
          toggleButton(false);
          setArrNumbers([...arr]);
          return;
        }
        min = {
          number: arr[index + 1].number,
          index: index + 1,
          indexStart: index + 1,
        };
        selection(arr, direction, index + 1, min);
      }
    }
  };

  const bubble = (
    arr: ColumnItem[],
    direction: boolean,
    nextNumber: number,
    min: { indexFinish: number }
  ) => {
    const i = nextNumber - 1;
    nextNumber <= min.indexFinish &&
      (arr[nextNumber].state = ElementStates.Changing);
    arr[i].state = ElementStates.Changing;
    i > 0 && (arr[i - 1].state = ElementStates.Default);
    setArrNumbers([...arr]);
    if (
      nextNumber <= arr.length - 1 &&
      direction === arr[i].number > arr[nextNumber].number
    ) {
      const temp = arr[i].number;
      arr[i].number = arr[nextNumber].number;
      arr[nextNumber].number = temp;
      setTimeout(() => {
        setArrNumbers([...arr]);
      }, DELAY_IN_MS);
    }
    if (nextNumber < min.indexFinish) {
      setTimeout(() => {
        nextNumber++;
        bubble(arr, direction, nextNumber, min);
      }, DELAY_IN_MS / 2);
    } else {
      if (nextNumber > 1) {
        setTimeout(() => {
          arr[nextNumber].state = ElementStates.Modified;
          arr[i].state = ElementStates.Default;
          min.indexFinish--;
          bubble(arr, direction, 1, min);
        }, DELAY_IN_MS / 2);
      } else {
        setTimeout(() => {
          arr[nextNumber].state = ElementStates.Modified;
          arr[i].state = ElementStates.Modified;
          toggleButton(false);
          setArrNumbers([...arr]);
        }, DELAY_IN_MS / 2);
      }
    }
  };

  const sort = (
    direction: boolean,
    arr: ColumnItem[],
    currNumber: number,
    nextNumber: number
  ) => {
    if (nextNumber > arr.length - 1) return;
    arr[currNumber].state = ElementStates.Changing;
    arr[nextNumber].state = ElementStates.Changing;
    let min = {
      number: arr[currNumber].number,
      index: currNumber,
      indexStart: currNumber,
    };
    let minMax = { indexFinish: arr.length - 1 };
    if (sortingMetod === SortingMethod.Selection) {
      selection(arr, direction, nextNumber, min);
    } else {
      bubble(arr, direction, nextNumber, minMax);
    }
  };

  const sortArray = (direction: Direction) => {
    toggleButton(true);
    setButtonState({
      ...buttonState,
      [direction]: { ...buttonState[direction], isLoading: true },
    });
    sort(direction === "ascending" ? true : false, arrNumbers, 0, 1);
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
          disabled={buttonState.ascending.isDisabled}
          isLoader={buttonState.ascending.isLoading}
          onClick={() => sortArray(Direction.Ascending)}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.decrease}
          disabled={buttonState.descending.isDisabled}
          isLoader={buttonState.descending.isLoading}
          onClick={() => sortArray(Direction.Descending)}
        />
        <Button
          text="Новый массив"
          extraClass={styles.newArray}
          disabled={buttonState.createArray.isDisabled}
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