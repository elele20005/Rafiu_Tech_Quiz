describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show a button with Start Quiz on page load", () => {
    cy.get("button").contains("Start Quiz").should("be.visible");
  });

  it("should start the quiz when i click the start button", () => {
    //act
    //assert
    cy.get("button").contains("Start Quiz").click();

    cy.get("h2").should("be.visible");
  });

  it("should display 4 anwsers for the first question", () => {
    cy.get("button").contains("Start Quiz").click();
    cy.get("button")
      .contains(/1|2|3|4/)
      .should("be.visible");
  });

  it("should display the score when i finish the quiz", () => {
    //arrange
    cy.get("button").contains("Start Quiz").click();

    //act
    for (let i = 0; i < 10; i++) {
      cy.get("button").contains("1").click();
    }
    //assert
    cy.get(".alert-success").should("be.visible").and("contain", "Your score");
  });
});
