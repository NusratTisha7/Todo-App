const { Todo } = require('../models/todoModel')
const _ = require('lodash');

module.exports.createTodo = async (req, res) => {
    let createTodo = new Todo(_.pick(req.body, ['title', 'description']))
    createTodo.user = req.user._id
    createTodo.save()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

module.exports.getTodosByUser = async (req, res) => {
    await Todo.find({ user: req.user._id }).sort({ createdAt: -1 })
        .then(todos => {
            res.status(200).send(todos)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

module.exports.getTodoDetails = async (req, res) => {
    let todoId = req.params.id
    await Todo.findById(todoId)
        .then(todo => {
            res.status(200).send(todo)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}


module.exports.editTodo = async (req, res) => {
    let todoId = req.params.id
    let todo = await Todo.findById(todoId)
    if (todo) {
        const updatedFields = _.pick(req.body, ["title", "description"]);
        _.assignIn(todo, updatedFields);
        console.log(todo)
        todo.save()
            .then(result => {
                return res.status(200).send({
                    message: "Todo Updated Successfully!"
                })
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });
    }
}


module.exports.deleteTodo = async (req, res) => {
    const _id = req.params.id
    await Todo.deleteOne({ _id: _id }).then(result => { return res.status(200).send("Deleted!") }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        });
    });
}

