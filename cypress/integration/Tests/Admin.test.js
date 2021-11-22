/// <reference types="cypress" />

describe("Admin", () => {
  it("Admin Test", () => {
    // Login Page displayed correctly
    cy.visit("http://localhost:3000/adminz");
  });
});
