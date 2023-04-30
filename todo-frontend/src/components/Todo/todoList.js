import Navbar from '../Navbar/navbar';
import { isAuthenticated } from '../../utils/auth';
import { Redirect, Link } from 'react-router-dom';
import TodoModal from "./todoModal"
import ViewDetailsModal from "./viewDetailsModal"
import EditTodoModal from "./editTodoModal"
import DeleteTodoModal from "./deleteModal"
import { useEffect, useState } from 'react';
import { getTodos } from '../../Api/todo'
import { userInfo } from '../../utils/auth';
import Card from 'react-bootstrap/Card';
import './todo.css'

const TodoList = () => {
    let [open, setOpen] = useState(false)
    let [detailsModal, setDetailsModal] = useState(false)
    let [editModal, setEditModal] = useState(false)
    let [deleteModal, setDeleteModal] = useState(false)

    let [todos, setTodos] = useState([])
    let [todo, setTodo] = useState({})
    const modalOpen = () => {
        setOpen(!open)
    }

    const detailsModalOpen = () => {
        setDetailsModal(!detailsModal)
    }

    const editModalOpen = () => {
        setEditModal(!editModal)
    }

    const deleteModalOpen = () => {
        setDeleteModal(!deleteModal)
    }

    const viewDetails = (item) => () => {
        detailsModalOpen()
        setTodo(item)
    }

    const editTodoModal = (item) => () => {
        editModalOpen()
        setTodo(item)
    }

    const deleteTodoModal = (item) => () => {
        deleteModalOpen()
        setTodo(item)
    }

    useEffect(() => {
        if (isAuthenticated()) {
            const { token } = userInfo()
            getTodos(token).then(res => {
                setTodos(res.data)
            })
        }

    }, [todos])

   


    const Todo = () => (
        <div className='todo'>
            <button onClick={modalOpen} className='btnDesign'><i class="fa fa-plus" style={{ margin: '5px' }}></i> Create a new todo</button>
            <div className='m-5'>
                {
                    todos && todos.map((item, index) => {
                        console.log(item.description.length)
                        return (
                            <Card style={{ width: '600px' }} className='m-auto mb-5'>
                                <Card.Header>
                                    <span className='font-weight-bold'>{item.title}</span> <br />
                                </Card.Header>
                                <Card.Body style={{ textAlign: 'justify' }} >
                                    <Card.Text>
                                        {item.description.slice(0,150)}{item.description.length>150?'.............':''}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'justify' }}>
                                    <button className='fotterBtn' onClick={viewDetails(item)}><i class="fa fa-eye"></i></button>
                                    <button className='fotterBtn' onClick={editTodoModal(item)}><i class="fa fa-edit"></i></button>
                                    <button className='fotterBtn' onClick={deleteTodoModal(item)}><i class="fa fa-trash-o"></i></button>

                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
    return (
        <div>
            {!isAuthenticated() ? <Redirect to="/login" /> : ""}
            <TodoModal open={open} modalOpen={modalOpen} />
            <ViewDetailsModal open={detailsModal} modalOpen={detailsModalOpen} todo={todo} />
            <EditTodoModal open={editModal} modalOpen={editModalOpen} item={todo} />
            <DeleteTodoModal open={deleteModal} modalOpen={deleteModalOpen} item={todo} />
            <Navbar />
            {Todo()}
        </div>
    )
}

export default TodoList;