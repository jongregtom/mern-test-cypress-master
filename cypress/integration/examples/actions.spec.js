/// <reference types="Cypress" />
import { newTodo, updatedTodo } from '../../fixtures/todos';
delete newTodo.todo_completed;
delete updatedTodo.todo_completed;

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // https://on.cypress.io/interacting-with-elements

  it("Get header text", () => {
    cy.get(".container > div > h3").should("have.text", "Todos List");
  });

  it("should be able to add a todo", () => {
    //create todo
    cy.log('newTodo: newTodo')
    cy.get(".navbar-item").contains("Create Todo").click();
    cy.get(".form-group").contains("Description: ").parent().find("input").type(newTodo.todo_description);
    cy.get(".form-group").contains("Responsible: ").parent().find("input").type(newTodo.todo_responsible);
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
    cy.contains("Edit").click();
    cy.get(".form-group").contains("Description: ").parent().find("input").clear().type(updatedTodo.todo_description);
    cy.get(".form-group").contains("Responsible: ").parent().find("input").clear().type(updatedTodo.todo_responsible);
    cy.get("#priorityHigh").click();
    cy.get("input").contains("Update Todo").click();
    cy.get("td").should(($td) => {
      for (const prop in updatedTodo) {
        expect($td).to.contain(updatedTodo[prop])
      }
    });
  })

  it("should be able to mark a todo completed", () => {
    cy.contains("Edit").click();
    cy.get('input[name="completedCheckbox"]').click();
    cy.get("input").contains("Update Todo").click();
    cy.get("td").contains(updatedTodo.todo_description).should('have.class', 'completed');
  })

  it("should be able to delete a todo", () => {
    cy.contains("Edit").click();
    cy.get('input[value="Delete Todo"]').click();
    cy.get("tbody").should('not.have.descendants');
  })
});
