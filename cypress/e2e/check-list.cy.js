import {
  itemInput,
  addHead,
  addTail,
  deleteHead,
  deleteTail,
  indexInput,
  addIndex,
  deleteIndex,
  ElementStates,
  circleClass,
  circleHead,
  circleTail,
  circleSmall,
} from "../constants/constants";

describe("Проверка корректной работы страницы очереди", () => {
  const addItemHead = (item) => {
    cy.get(itemInput).type(item);
    cy.get(addHead).click();
    cy.tick(1000);
    cy.tick(1000);
  };

  const addItemTail = (item) => {
    cy.get(itemInput).type(item);
    cy.get(addTail).click();
    cy.tick(1000);
    cy.tick(1000);
  };

  const addItemByIndex = (item, index) => {
    cy.get(itemInput).type(item);
    cy.get(indexInput).type(index);
    cy.get(addIndex).click();
    cy.tick(1000);
    cy.tick(1000);
    cy.tick(1000);
    cy.tick(1000);
  };

  beforeEach(() => {
    cy.visit("list");
  });

  it("Проверяем недоступность кнопок при пустых полях ввода", () => {
    cy.get(itemInput).should("have.value", "");
    cy.get(indexInput).should("have.value", "");
    cy.get(addHead).should("be.disabled");
    cy.get(addTail).should("be.disabled");
    cy.get(addIndex).should("be.disabled");
    cy.get(deleteIndex).should("be.disabled");
    cy.get(circleClass).should("have.length", 4);
    cy.get(deleteHead).should("not.be.disabled");
    cy.get(deleteTail).should("not.be.disabled");
  });

  it("Проверяем корректность отрисовки дефолтного списка", () => {
    cy.get(circleClass)
      .should("have.length", 4)
      .then((item) => expect(item[0].textContent).to.not.equal(""));
    cy.get(circleHead).should((item) =>
      expect(item.eq(0)).to.have.text("head")
    );
    cy.get(circleTail).should((item) =>
      expect(item.eq(3)).to.have.text("tail")
    );
  });

  it("Проверяем корректность добавления элемента в head", () => {
    cy.clock();
    cy.get(itemInput).type("5");
    cy.get(addHead).click();
    cy.get(circleSmall).then((item) => {
      expect(item.eq(0))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 5)
      .then((item) => {
        expect(item.eq(0))
          .to.have.text("5")
          .attr("class")
          .to.match(ElementStates.Modified);
      });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 5)
      .then((item) => {
        expect(item.eq(0))
          .to.have.text("5")
          .attr("class")
          .to.match(ElementStates.Default);
      });
    cy.get(circleHead).then((item) => expect(item.eq(0)).to.have.text("head"));
    cy.get(circleTail).then((item) => expect(item.eq(4)).to.have.text("tail"));
  });

  it("Проверяем корректность добавления элемента в tail", () => {
    cy.clock();
    cy.get(itemInput).type("9");
    cy.get(addTail).click();
    cy.get(circleSmall).then((item) => {
      expect(item.eq(0))
        .to.have.text("9")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 5)
      .then((item) => {
        expect(item.eq(4))
          .to.have.text("9")
          .attr("class")
          .to.match(ElementStates.Modified);
      });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 5)
      .then((item) => {
        expect(item.eq(4))
          .to.have.text("9")
          .attr("class")
          .to.match(ElementStates.Default);
      });
    cy.get(circleHead).then((item) => expect(item.eq(0)).to.have.text("head"));
    cy.get(circleTail).then((item) => expect(item.eq(4)).to.have.text("tail"));
  });

  it("Проверяем корректность добавления элемента по индексу", () => {
    cy.clock();
    cy.get(itemInput).type("3");
    cy.get(indexInput).type("2");
    cy.get(addIndex).click();
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(4)).attr("class").to.match(ElementStates.Default);
    });
    cy.get(circleSmall).then((item) => {
      expect(item.eq(0))
        .to.have.text("3")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.tick(1000);
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Modified);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(4)).attr("class").to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(4)).attr("class").to.match(ElementStates.Default);
    });
  });

  it("Проверяем корректность удаления элемента из head", () => {
    cy.clock();
    addItemHead("5");
    cy.get(deleteHead).click();
    cy.get(circleSmall).then((item) => {
      expect(item.eq(0))
        .to.have.text("5")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.get(circleClass).then((item) => {
      expect(item.eq(0))
        .to.have.text("")
        .attr("class")
        .to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 4)
      .then((item) => {
        expect(item.eq(0)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(1)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      });
    cy.get(circleHead).then((item) => expect(item.eq(0)).to.have.text("head"));
    cy.get(circleTail).then((item) => expect(item.eq(3)).to.have.text("tail"));
  });

  it("Проверяем корректность удаления элемента из tail", () => {
    cy.clock();
    addItemTail("7");
    cy.get(deleteTail).click();
    cy.get(circleSmall).then((item) => {
      expect(item.eq(0))
        .to.have.text("7")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.get(circleClass).then((item) => {
      expect(item.eq(4))
        .to.have.text("")
        .attr("class")
        .to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 4)
      .then((item) => {
        expect(item.eq(0)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(1)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      });
    cy.get(circleHead).then((item) => expect(item.eq(0)).to.have.text("head"));
    cy.get(circleTail).then((item) => expect(item.eq(3)).to.have.text("tail"));
  });

  it("Проверяем корректность удаления элемента из tail", () => {
    cy.clock();
    addItemTail("7");
    cy.get(deleteTail).click();
    cy.get(circleSmall).then((item) => {
      expect(item.eq(0))
        .to.have.text("7")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.get(circleClass).then((item) => {
      expect(item.eq(4))
        .to.have.text("")
        .attr("class")
        .to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 4)
      .then((item) => {
        expect(item.eq(0)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(1)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      });
    cy.get(circleHead).then((item) => expect(item.eq(0)).to.have.text("head"));
    cy.get(circleTail).then((item) => expect(item.eq(3)).to.have.text("tail"));
  });

  it("Проверяем корректность удаления элемента по индексу", () => {
    cy.clock();
    addItemByIndex("10", 1);
    cy.get(indexInput).type(1);
    cy.get(deleteIndex).click();
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(4)).attr("class").to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleClass).then((item) => {
      expect(item.eq(0)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(1)).attr("class").to.match(ElementStates.Changing);
      expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      expect(item.eq(4)).attr("class").to.match(ElementStates.Default);
    });
    cy.tick(1000);
    cy.get(circleSmall).then((item) => {
      expect(item.eq(0))
        .to.have.text("10")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.get(circleClass).then((item) => {
      expect(item.eq(1))
        .to.have.text("")
        .attr("class")
        .to.match(ElementStates.Changing);
    });
    cy.tick(1000);
    cy.get(circleClass)
      .should("have.length", 4)
      .then((item) => {
        expect(item.eq(0)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(1)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(2)).attr("class").to.match(ElementStates.Default);
        expect(item.eq(3)).attr("class").to.match(ElementStates.Default);
      });
    cy.get(circleHead).then((item) => expect(item.eq(0)).to.have.text("head"));
    cy.get(circleTail).then((item) => expect(item.eq(3)).to.have.text("tail"));
  });
});