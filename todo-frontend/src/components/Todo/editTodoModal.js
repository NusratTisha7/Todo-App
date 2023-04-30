import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
// import {shareMeme} from '../../api/memesApi';
import { userInfo } from '../../utils/auth';
import { Message } from '../../utils/alert';
import { editTodo } from '../../Api/todo'

const EditTodoModal = ({ open, modalOpen, item }) => {

    const [todo, setTodo] = useState({
        id:'',
        title:  '',
        description:  ''
    });
    let { title, description } = todo

    useEffect(() => {
        setTodo({
            id:item._id?item._id:'',
            title: item.title ? item.title : '',
            description: item.description ? item.description : ''
        })
    }, [item])

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        const { token } = userInfo()
        editTodo(token, todo).then(res => {
            Message(true, 'Todo updated successfully!')
            setTodo({
                title: '',
                description: ''
            })
            modalOpen()
        }).catch(err => {
            Message(false, 'Something went wrong!')
            setTodo({
                title: '',
                description: ''
            })
            modalOpen()
        })
    }

    return (
        <div>
            <Modal show={open} className='mt-5'>
                <Modal.Header closeButton onClick={modalOpen}>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control name='title' value={title} type="text" placeholder='Todo Title' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control value={description} name='description' as="textarea" placeholder='Write description here...' rows={3} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-start'>
                    <Button variant="dark" onClick={handleSubmit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default EditTodoModal;