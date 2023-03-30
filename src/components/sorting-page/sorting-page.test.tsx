import { ElementStates } from "../../types/element-states";
import { getSortingArray, getBubbleSorting } from "./utils";
import { IColumnItem } from "../../types/sorting-element";

let commonTestArray: IColumnItem[];
let checkAscArray: IColumnItem[];
let checkDescArray: IColumnItem[];

describe("Проверка функции сортировки выбором", () => {
  beforeEach(() => {
    commonTestArray = [
      { number: 1, state: ElementStates.Modified },
      { number: 7, state: ElementStates.Modified },
      { number: 9, state: ElementStates.Modified },
      { number: 8, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
    ];
    checkAscArray = [
      { number: 1, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 7, state: ElementStates.Modified },
      { number: 8, state: ElementStates.Modified },
      { number: 9, state: ElementStates.Modified },
    ];
    checkDescArray = [
      { number: 9, state: ElementStates.Modified },
      { number: 8, state: ElementStates.Modified },
      { number: 7, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 1, state: ElementStates.Modified },
    ];
  });
  it("пустого массива по возрастанию", async () => {
    const arrNumber = [{}];
    const testArray: IColumnItem[] = [{ state: ElementStates.Modified }];
    const arr = await getSortingArray(arrNumber, "ascending");
    expect(arr).toEqual(testArray);
  });
  it("пустого массива по убыванию", async () => {
    const arrNumber = [{}];
    const testArray: IColumnItem[] = [{ state: ElementStates.Modified }];
    const arr = await getSortingArray(arrNumber, "descending");
    expect(arr).toEqual(testArray);
  });
  it("массива с одним элементом по возрастанию", async () => {
    const arrNumber = [{ number: 1 }];
    const testArray: IColumnItem[] = [
      { number: 1, state: ElementStates.Modified },
    ];
    const arr = await getSortingArray(arrNumber, "ascending");
    expect(arr).toEqual(testArray);
  });
  it("массива с одним элементом по убыванию", async () => {
    const arrNumber = [{ number: 1 }];
    const testArray: IColumnItem[] = [
      { number: 1, state: ElementStates.Modified },
    ];
    const arr = await getSortingArray(arrNumber, "descending");
    expect(arr).toEqual(testArray);
  });
  it("массива с несколькими элементами по возрастанию", async () => {
    const arr = await getSortingArray(commonTestArray, "ascending");
    expect(arr).toEqual(checkAscArray);
  });
  it("массива с несколькими элементами по убыванию", async () => {
    const arr = await getSortingArray(commonTestArray, "descending");
    expect(arr).toEqual(checkDescArray);
  });
});

describe("Проверка функции сортировки пузырьком", () => {
  beforeEach(() => {
    commonTestArray = [
      { number: 1, state: ElementStates.Modified },
      { number: 7, state: ElementStates.Modified },
      { number: 9, state: ElementStates.Modified },
      { number: 8, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
    ];
    checkAscArray = [
      { number: 1, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 7, state: ElementStates.Modified },
      { number: 8, state: ElementStates.Modified },
      { number: 9, state: ElementStates.Modified },
    ];
    checkDescArray = [
      { number: 9, state: ElementStates.Modified },
      { number: 8, state: ElementStates.Modified },
      { number: 7, state: ElementStates.Modified },
      { number: 3, state: ElementStates.Modified },
      { number: 1, state: ElementStates.Modified },
    ];
  });
  it("пустого массива по возрастанию", async () => {
    const arrNumber = [{}];
    const testArray: IColumnItem[] = [{ state: ElementStates.Modified }];
    const arr = await getBubbleSorting(arrNumber, "ascending");
    expect(arr).toEqual(testArray);
  });
  it("пустого массива по убыванию", async () => {
    const arrNumber = [{}];
    const testArray: IColumnItem[] = [{ state: ElementStates.Modified }];
    const arr = await getBubbleSorting(arrNumber, "descending");
    expect(arr).toEqual(testArray);
  });
  it("массива с одним элементом по возрастанию", async () => {
    const arrNumber = [{ number: 1 }];
    const testArray: IColumnItem[] = [
      { number: 1, state: ElementStates.Modified },
    ];
    const arr = await getBubbleSorting(arrNumber, "ascending");
    expect(arr).toEqual(testArray);
  });
  it("массива с одним элементом по убыванию", async () => {
    const arrNumber = [{ number: 1 }];
    const testArray: IColumnItem[] = [
      { number: 1, state: ElementStates.Modified },
    ];
    const arr = await getBubbleSorting(arrNumber, "descending");
    expect(arr).toEqual(testArray);
  });
  it("массива с несколькими элементами по возрастанию", async () => {
    const arr = await getBubbleSorting(commonTestArray, "ascending");
    expect(arr).toEqual(checkAscArray);
  });
  it("массива с несколькими элементами по убыванию", async () => {
    const arr = await getBubbleSorting(commonTestArray, "descending");
    expect(arr).toEqual(checkDescArray);
  });
});