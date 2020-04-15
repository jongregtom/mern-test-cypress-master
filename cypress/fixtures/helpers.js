const getTodos = (cb) => {
    cy.request("/todos")
        .then((res) => {
            cb(res.body);
            
        })
}

const clickEditButton = () => {
    cy.contains("Edit").click();
}

const fillOutTodoForm = (description, responsible, priority) => {
    cy.get(".form-group").contains("Description: ").parent().find("input").type(description);
    cy.get(".form-group").contains("Responsible: ").parent().find("input").type(responsible);
    cy.get(`#priority${priority}`).click();
}

module.exports = {
    getTodos: getTodos,
    clickEditButton: clickEditButton,
    fillOutTodoForm: fillOutTodoForm
}