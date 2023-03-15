import { ElementStates } from "./element-states";

export enum SortingMethod {
  Selection = "selection",
  Bubble = "bubble",
}

export interface ColumnItem {
  number: number;
  state: ElementStates;
}

export interface ButtonState {
  [name: string]: {
    isDisabled: boolean;
    isLoading?: boolean;
  };
}
