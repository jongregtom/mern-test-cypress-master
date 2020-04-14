/// <reference types="Cypress" />

context("API", () => {
    const newTodo = {
        todo_description: "Make Kessel Run in less than 12 parsecs",
        todo_responsible: "Han Solo",
        todo_priority: "Medium",
        todo_completed: false
      };
      const updatedTodo = {
        todo_description: "Wash hands, wear mask, stay safe",
        todo_responsible: "Everyone",
        todo_priority: "High",
        todo_completed: false
      };

    it("create todo", () => {
        cy.request("POST", "/todos/add", newTodo)
        .then((res) => {
            expect(res.body).to.have.property('todo', 'todo added successfully');
            expect(res.status).to.equal(200);
        });
    })

    it("update todo", () => {
        cy.request("/todos/")
        .then((res) => {
            //get todo id
            const id = res.body[0]._id;
            //update todo
            cy.request('POST', `/todos/update/${id}`, updatedTodo)
            .then((res) => {
                expect(res.body).to.equal('Todo updated')
            });
        })
    })

    it("delete todo", () => {
        cy.request("/todos/")
        .then((res) => {
            //get todo id
            const id = res.body[0]._id;
            //delete todo
            cy.request('DELETE', `/todos/delete/${id}`)
            .then((res) => {
                expect(res.body).to.equal('Todo deleted')
            });
        })
    })
})