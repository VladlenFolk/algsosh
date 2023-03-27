import {
  stringInput,
  stringButton,
  ElementStates,
  circleClass,
} from "../constants/constants";

describe("Проверка корректного вывода последовательности Фиббоначи", () => {
  beforeEach(() => {
    cy.visit("fibonacci");
  });

  it("Проверяем недоступность кнопки при пустом поле ввода", () => {
    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
  });

  it("Проверка корректной генерации чисел", () => {
    cy.clock();
    cy.get(stringInput).type("5");
    cy.get(stringButton).should("not.be.disabled").click();
    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("2")
        .attr("class")
        .to.match(ElementStates.Default);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("2")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(3))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("2")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(3))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(4))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Default);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("1")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("2")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(3))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(4))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(5))
        .to.have.text("8")
        .attr("class")
        .to.match(ElementStates.Default);
    });

    cy.tick(1000);

    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
  });
});