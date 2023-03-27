import {
  stringInput,
  stringButton,
  ElementStates,
  circleClass,
  deleteButton,
  clearButton,
  circleHead,
} from "../constants/constants";

describe("Проверка корректной работы страницы стека", () => {
  const addItem = (item) => {
    cy.get(stringInput).type(item);
    cy.get(stringButton).should("not.be.disabled").click();
    cy.tick(1000);
  };

  beforeEach(() => {
    cy.visit("stack");
  });

  it("Проверяем недоступность кнопок при пустом поле ввода", () => {
    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
    cy.get(deleteButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });

  it("Проверка корректного добавления элементов", () => {
    cy.clock();
    cy.get(stringInput).type("3");
    cy.get(stringButton).should("not.be.disabled").click();
    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.get(circleHead).should("have.text", "top");

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
    });
    cy.get(circleHead).should("have.text", "top");

    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");

    cy.get(stringInput).type("5");
    cy.get(stringButton).should("not.be.disabled").click();
    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.get(circleHead).then((item) => {
      expect(item.eq(0)).to.have.text("");
      expect(item.eq(1)).to.have.text("top");
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Default);
    });
    cy.get(circleHead).then((item) => {
      expect(item.eq(0)).to.have.text("");
      expect(item.eq(1)).to.have.text("top");
    });

    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");

    cy.get(stringInput).type("9");
    cy.get(stringButton).should("not.be.disabled").click();
    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("9")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.get(circleHead).then((item) => {
      expect(item.eq(0)).to.have.text("");
      expect(item.eq(1)).to.have.text("");
      expect(item.eq(2)).to.have.text("top");
    });

    cy.tick(1000);

    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(1))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Default);
      expect(item.eq(2))
        .to.have.text("9")
        .attr("class")
        .to.match(ElementStates.Default);
    });
    cy.get(circleHead).then((item) => {
      expect(item.eq(0)).to.have.text("");
      expect(item.eq(1)).to.have.text("");
      expect(item.eq(2)).to.have.text("top");
    });

    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");
  });

  it("Проверяем коректное удаление элемента", () => {
    cy.clock();
    addItem("3");
    addItem("5");
    cy.get(deleteButton).click();
    cy.get(circleClass)
      .should("have.length", 2)
      .then((item) => {
        expect(item.eq(0))
          .to.have.text("3")
          .attr("class")
          .to.match(ElementStates.Default);
        expect(item.eq(1))
          .to.have.text("5")
          .attr("class")
          .to.match(ElementStates.Changing);
      });
    cy.get(circleHead)
      .should("have.length", 2)
      .then((item) => {
        expect(item.eq(0)).to.have.text("");
        expect(item.eq(1)).to.have.text("top");
      });

    cy.tick(1000);

    cy.get(circleClass)
      .should("have.length", 1)
      .then((item) => {
        expect(item.eq(0))
          .to.have.text("3")
          .attr("class")
          .to.match(ElementStates.Default);
      });
    cy.get(circleHead).should("have.text", "top");

    cy.tick(1000);

    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");
  });

  it("Проверяем коректную очистку элементов", () => {
    cy.clock();
    addItem("3");
    addItem("5");
    addItem("7");
    addItem("10");
    cy.get(circleClass).should("have.length", 4);
    cy.get(clearButton).click();
    cy.get(circleClass).should("have.length", 0);
    cy.get(stringInput).should("have.value", "");
    cy.get(stringButton).should("be.disabled");
    cy.get(deleteButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });
});