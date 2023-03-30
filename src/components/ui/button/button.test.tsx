import { Button } from "./button";
import {render, screen, fireEvent} from "@testing-library/react";
import renderer from "react-test-renderer";


describe("Отрисовка кнопки", () => {
  it("с текстом", () => {
    const buttonSnapshot = renderer.create(<Button text="Добавить" />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
  it("без текста", () => {
    const buttonSnapshot = renderer.create(<Button />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
  it("с блокировкой", () => {
    const buttonSnapshot = renderer.create(<Button disabled={true} />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
  it("с загрузкой", () => {
    const buttonSnapshot = renderer.create(<Button isLoader={true} />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
  it("вызов коллбека при клике на кнопку",()=>{
    const onClick = jest.fn();
    render (<Button onClick={onClick}>Button</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1)
  })
});