/// <reference types="cypress" />

describe("New User", () => {
  it("test one", () => {
    // 1. Login Page confirmation
    cy.visit("https://blueskyapp-dev.herokuapp.com/");
    cy.contains("SERVING CENTRAL FLORIDA");
    cy.contains("LOGIN");
    cy.get("button[id=loginButton").should("exist");

    // 2. Go to Sign Up Page
    cy.log("Click SIGN UP");
    cy.contains("SIGN UP").click();
    cy.url().should("include", "/signUp");

    // data-testid for specific areas
  });
});
