const { Schema, model } = require('mongoose')

const todoSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    isDone: {
        type: String
    }
}, { timestamps: true })


module.exports.Todo = model('Todo', todoSchema);
