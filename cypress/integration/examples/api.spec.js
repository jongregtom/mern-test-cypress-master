/// <reference types="Cypress" />
import { newTodo, updatedTodo } from '../../fixtures/todos';
import { getTodos } from '../../fixtures/helpers';

context("API", () => {

    it("create todo", () => {
        //call API to create new todo
        cy.request("POST", "/todos/add", newTodo)
        .then((res) => {
            expect(res.body).to.have.property('todo', 'todo added successfully');
            expect(res.status).to.equal(200);
        });
    })

    it("Get todo by ID", () => {
        getTodos((todos) => {
            //get id of created todo
            const id = todos[0]._id;
            //call API to get todo
            cy.request(`/todos/${id}`)
            .then((res) => {
                //verify created todo in DB is same as mock todo
                const { _id, todo_description } = res.body;
                expect(_id).to.equal(id);
                expect(todo_description).to.equal(newTodo.todo_description);
            })
        })
    })

    it("update todo", () => {
        getTodos((todos) => {
            //get ID of created todo
            const id = todos[0]._id;
            cy.request('POST', `/todos/update/${id}`, updatedTodo)
            .then((res) => {
                //verify todo was updated in DB
                expect(res.body).to.equal('Todo updated');
                //get updated todo
                getTodos((todos) => {
                    expect(todos[0].todo_description).to.equal(updatedTodo.todo_description);
                })
            });
        })
    })

    it("delete todo", () => {
        getTodos((todos) => {
            //get ID of updated todo
            const id = todos[0]._id;
            cy.request('DELETE', `/todos/delete/${id}`)
            .then((res) => {
                expect(res.body).to.equal('Todo deleted');
                getTodos((todos) => {
                    //verify todo no longer exists
                    expect(todos.length).to.equal(0);

                })
            });
        })
    })
})