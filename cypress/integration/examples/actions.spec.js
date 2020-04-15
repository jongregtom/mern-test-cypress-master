/// <reference types="Cypress" />
import { newTodo, updatedTodo } from '../../fixtures/todos';
import { clickEditButton, fillOutTodoForm } from '../../fixtures/helpers';
//remove todo_completed key from todo fixures, interferes with test functionality
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

  it("add todo", () => {
    //create todo
    cy.get(".navbar-item").contains("Create Todo").click();
    fillOutTodoForm(newTodo.todo_description, newTodo.todo_responsible, 'Medium');
    cy.get(".form-group").contains("Create Todo").click();
    //get displayed todo
    cy.get("td").should(($td) => {
      for (const prop in newTodo) {
        //verify displayed todo matches mock todo data
        expect($td).to.contain(newTodo[prop])
      }
    });
  })

  it("update existing todo", () => {
    clickEditButton();
    fillOutTodoForm(updatedTodo.todo_description, updatedTodo.todo_responsible, 'High');
    cy.get("input").contains("Update Todo").click();
    //get displayed updated todo
    cy.get("td").should(($td) => {
      for (const prop in updatedTodo) {
        //verify displayed updated todo matches mock todo data
        expect($td).to.contain(updatedTodo[prop])
      }
    });
  })

  it("mark todo completed", () => {
    clickEditButton();
    //mark todo completed
    cy.get('input[name="completedCheckbox"]').click();
    cy.get("input").contains("Update Todo").click();
    cy.get("td").contains(updatedTodo.todo_description).should('have.class', 'completed');
  })

  it("delete todo", () => {
    clickEditButton();
    cy.get('input[value="Delete Todo"]').click();
    //verify todo is no longer displayed
    cy.get("tbody").should('not.have.descendants');
  })
});
