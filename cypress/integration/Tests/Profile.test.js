/// <reference types="cypress" />

describe("Profile Update", () => {
  it("User is Logged In", () => {
    // Login User
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=email]").type("profile@gmail.com");
    cy.get("[data-testid=password]").type("1234");
    cy.get("button[data-testid=loginButton]").click();
  });

  it("Navigate to Profile Page", () => {
    cy.get("a[data-testid=profileNav]").click();
  });

  it("Update User Info", () => {
    // First Name Update
    cy.get("[data-testid=firstName").clear();
    cy.get("[data-testid=firstName").type("Test");

    // Last Name Update
    cy.get("[data-testid=lastName").clear();
    cy.get("[data-testid=lastName").type("Profile");

    // Change Customer Type
    cy.get("[data-testid=customerType").select("Residential");

    // Email Update
    cy.get("[data-testid=email").clear();
    cy.get("[data-testid=email").type("test@gmail.com");

    // Chenge Password and Confirm
    cy.get("[data-testid=password").type("4321");
    cy.get("[data-testid=confirmPassword").type("4321");

    // Submit
    cy.get("button[data-testid=profileUpdate]").click();
  });

  it("Logout", () => {
    cy.get("a[data-testid=logoutNav]").click();
  });
});

describe("Confirm and Revert", () => {
  it("User is Logged In", () => {
    // Login User
    cy.get("[data-testid=email]").type("test@gmail.com");
    cy.get("[data-testid=password]").type("4321");
    cy.get("button[data-testid=loginButton]").click();
  });

  it("Navigate to Profile Page", () => {
    cy.get("a[data-testid=profileNav]").click();
  });

  it("Confirm User Info", () => {
    cy.contains("Test's Profile");
    cy.contains("Test");
    cy.contains("Profile");
    cy.contains("Residential");
  });

  it("Update User Info", () => {
    // First Name Update
    cy.get("[data-testid=firstName").clear();
    cy.get("[data-testid=firstName").type("Profile");

    // Last Name Update
    cy.get("[data-testid=lastName").clear();
    cy.get("[data-testid=lastName").type("Test");

    // Change Customer Type
    cy.get("[data-testid=customerType").select("Commercial");

    // Email Update
    cy.get("[data-testid=email").clear();
    cy.get("[data-testid=email").type("profile@gmail.com");

    // Chenge Password and Confirm
    cy.get("[data-testid=password").type("1234");
    cy.get("[data-testid=confirmPassword").type("1234");

    // Submit
    cy.get("button[data-testid=profileUpdate]").click();
  });

  it("Logout", () => {
    cy.get("a[data-testid=logoutNav]").click();
  });
});
