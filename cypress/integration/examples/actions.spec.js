/// <reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const todos = [
    {
      description: "Make Kessel Run in less than 12 parsecs",
      responsible: "Han Solo",
      priority: "Medium"
    },
    {
      description: "Wash hands, wear mask, stay safe",
      responsible: "Everyone",
      priority: "High"
    }
  ]

  // https://on.cypress.io/interacting-with-elements

  it("Get header text", () => {
    cy.get(".container > div > h3").should("have.text", "Todos List");
  });

  it("should be able to add a todo", () => {
    const newTodo = todos[0];
    //create todo
    cy.get(".navbar-item").contains("Create Todo").click();
    cy.get(".form-group").contains("Description: ").parent().find("input").type(newTodo.description);
    cy.get(".form-group").contains("Responsible: ").parent().find("input").type(newTodo.responsible);
    cy.get("#priorityMedium").click();
    cy.get(".form-group").contains("Create Todo").click();
    //verify todo is displayed with all user inputs and priority level
    cy.get("td").should(($td) => {
      for (const prop in newTodo) {
        expect($td).to.contain(newTodo[prop])
      }
    });
  })

  it("should be able to update a todo", () => {
    const originalTodo = todos[0];
    const updatedTodo = todos[1];
    cy.contains("Edit").click();
    cy.get(".form-group").contains("Description: ").parent().find("input").clear().type(updatedTodo.description);
    cy.get(".form-group").contains("Responsible: ").parent().find("input").clear().type(updatedTodo.responsible);
    cy.get("#priorityHigh").click();
    cy.get("input").contains("Update Todo").click();
    cy.get("td").should(($td) => {
      for (const prop in updatedTodo) {
        expect($td).to.contain(updatedTodo[prop])
      }
    });
  })

  it("should be able to delete a todo", () => {
    const updatedTodo = todos[1];
    cy.contains("Edit").click();
    cy.get('input[value="Delete Todo"]').click();
    cy.get("tbody").should('not.have.descendants');
  })
});
