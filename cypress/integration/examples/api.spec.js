/// <reference types="Cypress" />

context("API", () => {
    const newTodo = {
        todo_description: "Make Kessel Run in less than 12 parsecs",
        todo_responsible: "Han Solo",
        todo_priority: "Medium",
        todo_completed: false
      };
    it("create todo", () => {
        cy.request("POST", "/todos/add", newTodo)
        .then((res) => {
            expect(res.body).to.have.property('todo', 'todo added successfully');
            expect(res.status).to.equal(200);
        });
    })
})