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

    it("Get todo by ID", () => {
        cy.request("/todos")
        .then((res) => {
            const id = res.body[0]._id;
            cy.request(`/todos/${id}`)
            .then((res) => {
                const { _id, todo_description } = res.body;
                expect(_id).to.equal(id);
                expect(todo_description).to.equal(newTodo.todo_description);
            })
        })
    })

    it("update todo", () => {
        //get todo id
        cy.request("/todos/")
        .then((res) => {
            const id = res.body[0]._id;
            //update todo
            cy.request('POST', `/todos/update/${id}`, updatedTodo)
            .then((res) => {
                expect(res.body).to.equal('Todo updated')
            });
        })
    })

    it("delete todo", () => {
        //get todo id
        cy.request("/todos/")
        .then((res) => {
            const id = res.body[0]._id;
            //delete todo
            cy.request('DELETE', `/todos/delete/${id}`)
            .then((res) => {
                expect(res.body).to.equal('Todo deleted')
            });
        })
    })
})