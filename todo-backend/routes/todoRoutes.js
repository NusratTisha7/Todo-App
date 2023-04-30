const router = require('express').Router();
const { createTodo, getTodosByUser, getTodoDetails, editTodo, deleteTodo } = require('../controllers/todoController')
const authorize = require('../middlewares/authorize');

router.route('/create')
    .post([authorize], createTodo)

router.route('/getAll')
    .get([authorize], getTodosByUser)

router.route('/getOne/:id')
    .get([authorize], getTodoDetails)

router.route('/edit/:id')
    .put([authorize], editTodo)

router.route('/delete/:id')
    .delete([authorize], deleteTodo)


module.exports = router;