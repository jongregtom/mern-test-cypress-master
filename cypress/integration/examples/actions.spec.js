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
    const todo = {
      description: "Find Millennium Falcon",
      responsible: "Make Kessel Run in less than 12 parsecs",
      priority: "High"
    }
    //create todo
    cy.get(".navbar-item").contains("Create Todo").click();
    cy.get(".form-group").contains("Description: ").parent().find("input").type(todo.description);
    cy.get(".form-group").contains("Responsible: ").parent().find("input").type(todo.responsible);
    cy.get("#priorityHigh").click();
    cy.get(".form-group").contains("Create Todo").click();
    //verify todo is displayed with all user inputs and priority level
    cy.get("td").should(($td) => {
      for (const prop in todo) {
        expect($td).to.contain(todo[prop])
      }
      // expect($td).to.contain("first todo")
      // expect($td).to.contain("responsible")
      // expect($td).to.contain("Low")
    });
    // cy.get("td").should(($td) => {
    //   expect($td).to.have.length(3)
    // })
  })
});
