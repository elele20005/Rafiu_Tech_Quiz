import React from "react";
import Quiz from "../../client/src/components/Quiz";

describe("<Quiz />", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/questions/random",
      },
      {
        fixture: "questions.json",
        statusCode: 200,
      }
    );
  });

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />);
  });

  it("mounts and displays the start quiz button", () => {
    //arrange
    cy.mount(<Quiz />);
    //act
    //assert
    cy.get("button").contains("Start Quiz").should("be.visible");
  });

  it("should display the first question when the start button is clicked", () => {
    //arrange
    cy.mount(<Quiz />);
    //act
    cy.get("button").contains("Start Quiz").click();
    //assert
    cy.get("h2").contains("question 1").should("be.visible");
  });

  it("should have a score when the test is finished", () => {
    //arrange
    cy.mount(<Quiz />);
    //act
    cy.get("button").contains("Start Quiz").click();
    cy.get("button").contains("1").click();
    cy.get("button").contains("1").click();
    //assert
    cy.get(".alert-success").should("be.visible").and("contain", "Your score");
  });
});
