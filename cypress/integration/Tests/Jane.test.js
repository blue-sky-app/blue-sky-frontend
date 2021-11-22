/// <reference types="cypress" />

describe("Login User", () => {
  it("Login Page Display", () => {
    // Login Page displayed correctly
    cy.visit("http://localhost:3000/");
    cy.contains("SERVING CENTRAL FLORIDA");
    cy.contains("LOGIN");
    cy.get("button[data-testid=loginButton]").should("exist");
    cy.get("a[data-testid=signupButton]").should("exist");
    cy.get("input[data-testid=email]").should("exist");
    cy.get("input[data-testid=password]").should("exist");
  });

  it("Test Failed Login", () => {
    // Testing the messaging and failed login
    cy.get("[data-testid=email]").type("dane@gmail.com");
    cy.get("[data-testid=password]").type("123DAN");
    cy.get("button[data-testid=loginButton]").click();
    cy.contains(
      "The Email or Passcode you entered does not match our records."
    );
  });

  it("Login Correct", () => {
    // Testing the correct login and message
    cy.get("[data-testid=email]").clear();
    cy.get("[data-testid=password]").clear();
    cy.get("[data-testid=email]").type("jane@gmail.com");
    cy.get("[data-testid=password]").type("123DAN");
    cy.get("button[data-testid=loginButton]").click();
    cy.contains("Login successful");
    cy.url().should("include", "/home");
    cy.get("a[data-testid=requestService]").should("exist");
    cy.get("a[data-testid=requestQuote]").should("exist");
    cy.get("div[data-testid=news]").should("exist");
  });
});

describe("Basic Page Flow", () => {
  it("Home Page", () => {
    // Testing the Home Page
    cy.get("a[data-testid=requestQuote]").click();
    cy.get("a[data-testid=homeNav]").click();
    cy.get("a[data-testid=requestService]").click();
  });

  it("Estimates Page", () => {
    // Testing the Estimates Page
    cy.get("a[data-testid=estimateNav]").click();
    cy.url().should("include", "/estimates");
    cy.contains("Jane's Estimate");
    cy.contains("Commercial Services");
    cy.get("button[data-testid=estimateSubmit]").click();
    cy.contains("Please make at least one selection.");
    cy.get('[type="checkbox"]').not("[disabled]").check().should("be.checked");
    cy.get("button[data-testid=estimateSubmit]").click();

    // pass to thank you page
    cy.url().should("include", "/thankYou");
    cy.contains("We Appreciate Your Business, Jane!");
    cy.contains(
      "Your estimate will be reviewed by one of our technicians and you will receive a quote via email to jane@gmail.com"
    );
    cy.contains("Thank You!");
    cy.contains("We will contact you shortly...");
  });

  it("Services Page", () => {
    // Testing the Services Page
    cy.get("a[data-testid=servicesNav]").click();
    cy.contains("Jane's Service History");
    cy.get("table[data-testid=servicesTable]").should("exist");
    cy.contains("New Estimate");
    cy.contains("Repeat");
    //TODO: Add in repeat service test
  });

  it("Blue Bucks Page", () => {
    // Testing the Blue Bucks Page
    cy.get("a[data-testid=blueBucksNav]").click();
    cy.contains("Jane's Blue Bucks History");
    cy.get("div[data-testid=currentBalance]").should("exist");
    cy.get("div[data-testid=referralBalance]").should("exist");
    cy.get("table[data-testid=blueBucksTable]").should("exist");
  });

  it("Profile Page Page", () => {
    // Testing the Profile Page
    cy.get("a[data-testid=profileNav]").click();
    cy.contains("Jane's Profile");
    cy.contains("UPDATE");
  });

  it("Logout", () => {
    // Logout Successful
    cy.get("a[data-testid=logoutNav]").click();
  });
});
