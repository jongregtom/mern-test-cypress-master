/// <reference types="Cypress" />
import { newTodo, updatedTodo } from '../../fixtures/todos';

context("API", () => {

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