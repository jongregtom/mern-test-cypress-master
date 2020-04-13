/// <reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // https://on.cypress.io/interacting-with-elements

  it("Get header text", () => {
    cy.get(".container > div > h3").should("have.text", "Todos List");
  });

  it("should be able to add a todo", () => {
    cy.get(".navbar-item").contains("Create Todo").click();
    cy.get(".form-group").contains("Description: ").parent().find("input").type("first todo");
    cy.get(".form-group").contains("Responsible: ").parent().find("input").type("responsible");
    cy.get("#priorityLow").click();
    cy.get(".form-group").contains("Create Todo").click();
  })
});
