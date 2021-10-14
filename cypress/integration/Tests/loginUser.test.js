/// <reference types="cypress" />

describe("Login User", () => {
  it("test one", () => {
    // 1. Login Page
    cy.visit("http://localhost:3000/");
    cy.contains("SERVING CENTRAL FLORIDA");
    cy.contains("LOGIN");
    cy.get("button[data-testid=loginButton]").should("exist");
    cy.get("[data-testid=email]").type("jane@gmail.com");
    cy.get("[data-testid=password]").type("123DAN");
    cy.get("button[data-testid=loginButton]").click();

    // 2. Home Page
    cy.url().should("include", "/home");
    cy.get("a[data-testid=requestService]").should("exist");
    cy.get("a[data-testid=requestQuote]").should("exist");

    // 3. Request Quote/Estimate & Service Check
    cy.get("a[data-testid=requestQuote]").click();
    cy.get("a[data-testid=homeNav]").click();
    cy.get("a[data-testid=requestService]").click();

    // 4. Blue Bucks
    cy.get("a[data-testid=blueBucksNav]").click();

    // 4. Profile
    cy.get("a[data-testid=profileNav]").click();

    // Logout
    cy.get("a[data-testid=logoutNav]").click();
    cy.url().should("include", "/login");

    // 2. Go to Sign Up Page
    // cy.log("Click SIGN UP");
    // cy.contains("SIGN UP").click();
    // cy.url().should("include", "/signUp");
  });
});
