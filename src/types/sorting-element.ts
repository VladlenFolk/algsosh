import { ElementStates } from "./element-states";

export enum SortingMethod {
  Selection = "selection",
  Bubble = "bubble",
}

export interface IColumnItem {
  number?: number;
  state?: ElementStates;
}