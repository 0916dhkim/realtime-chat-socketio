/// <reference types="cypress" />

describe("Auth Screens", () => {
  it("Loads signup page", () => {
    cy.visit("http://localhost:3000/");

    // Check expected UI elements.
    cy.contains("Create an account");
    cy.contains("button", "Create");
  });

  it("Loads login page", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("button", "Login").click();

    // Check expected UI elements.
    cy.contains("Welcome back");
    cy.contains("button", "Login");

    // Check URL.
    cy.url().should("include", "/login");
  });

  it("can be logged in as Thomas", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[name=username]").type("thomas");
    cy.get("input[name=password]").type("123456");

    cy.contains("button", "Login").click();

    // Check expected UI elements.
    cy.contains("Chats");
    cy.contains("thomas");

    // Check URL.
    cy.url().should("include", "/home");
  });
});
