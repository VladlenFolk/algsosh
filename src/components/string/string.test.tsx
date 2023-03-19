import { reverseString } from "./utils";
import { ElementStates } from "../../types/element-states";

describe("Тест разворота строки", () => {
  it("разворот с четным колличеством символов", () => {
    const testArray = [
      { item: "h", state: ElementStates.Default },
      { item: "e", state: ElementStates.Default },
      { item: "l", state: ElementStates.Default },
      { item: "l", state: ElementStates.Default },
      { item: "o", state: ElementStates.Default },
    ];
    const result = reverseString(0, testArray.length - 1, testArray);
    expect(result).toEqual([
      { item: "o", state: ElementStates.Modified },
      { item: "l", state: ElementStates.Modified },
      { item: "l", state: ElementStates.Modified },
      { item: "e", state: ElementStates.Modified },
      { item: "h", state: ElementStates.Modified },
    ]);
  });
  it("разворот с нечетным колличеством символов", () => {
    const testArray = [
      { item: "y", state: ElementStates.Default },
      { item: "a", state: ElementStates.Default },
      { item: "n", state: ElementStates.Default },
      { item: "d", state: ElementStates.Default },
      { item: "e", state: ElementStates.Default },
      { item: "x", state: ElementStates.Default },
    ];
    const result = reverseString(0, testArray.length - 1, testArray);
    expect(result).toEqual([
      { item: "x", state: ElementStates.Modified },
      { item: "e", state: ElementStates.Modified },
      { item: "d", state: ElementStates.Modified },
      { item: "n", state: ElementStates.Modified },
      { item: "a", state: ElementStates.Modified },
      { item: "y", state: ElementStates.Modified },
    ]);
  });
  it("разворот с одним символом", () => {
    const testArray = [{ item: "y", state: ElementStates.Default }];
    const result = reverseString(0, testArray.length - 1, testArray);
    expect(result).toEqual([{ item: "y", state: ElementStates.Modified }]);
  });
  it("разворот без символа", () => {
    const result = reverseString();
    expect(result).toEqual([{ item: "", state: ElementStates.Modified }]);
  });
});
