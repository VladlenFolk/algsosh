import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import renderer from "react-test-renderer";

describe("Корректность отрисовки элемента", () => {
  it("без буквы", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("с буквами", () => {
    const circle = renderer.create(<Circle letter={"Q"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("с head", () => {
    const circle = renderer.create(<Circle head={"head"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("с react-элементом в head", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("с tail", () => {
    const circle = renderer.create(<Circle tail={"tail"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("с react-элементом в tail", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("с index", () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("с пропcом isSmall ===  true", () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("в состоянии default", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("в состоянии changing", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("в состоянии modified", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});