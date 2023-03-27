import {
  stringInput,
  stringButton,
  ElementStates,
  circleClass,
} from "../constants/constants";

describe("Проверка корректного разворота строки", () => {
  beforeEach(() => {
    cy.visit("recursion");
  });

  it("Проверяем недоступность кнопки при пустом поле ввода", () => {
    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
  });

  it("Проверка корректного разворота строки", () => {
    cy.clock();
    cy.get(stringInput).type("hello");
    cy.get(stringButton).should("not.be.disabled").click();

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("h")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("e")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(3))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(4))
        .to.have.text("o")
        .attr("class")
        .to.match(ElementStates.Default);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("h")
        .attr("class")
        .to.match(ElementStates.Changing);
      expect(item.eq(1))
        .to.have.text("e")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(3))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(4))
        .to.have.text("o")
        .attr("class")
        .to.match(ElementStates.Changing);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("o")
        .attr("class")
        .to.match(ElementStates.Modified);
      expect(item.eq(1))
        .to.have.text("e")
        .attr("class")
        .to.match(ElementStates.Changing);
      expect(item.eq(2))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(3))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Changing);
      expect(item.eq(4))
        .to.have.text("h")
        .attr("class")
        .to.match(ElementStates.Modified);
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("o")
        .attr("class")
        .to.match(ElementStates.Modified);
      expect(item.eq(1))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Modified);
      expect(item.eq(2))
        .to.have.text("l")
        .attr("class")
        .to.match(ElementStates.Modified);
      expect(item.eq(3))
        .to.have.text("e")
        .attr("class")
        .to.match(ElementStates.Modified);
      expect(item.eq(4))
        .to.have.text("h")
        .attr("class")
        .to.match(ElementStates.Modified);
    });

    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
  });
});