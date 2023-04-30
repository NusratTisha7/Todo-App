import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
// import {shareMeme} from '../../api/memesApi';
import { userInfo } from '../../utils/auth';
import { Message } from '../../utils/alert';
import { createTodo } from '../../Api/todo'

const TodoModal = ({ open, modalOpen }) => {
   
    const [todo, setTodo] = useState({
        title: '',
        description: ''
    });


    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        const { token } = userInfo()
        createTodo(token, todo).then(res => {
            Message(true,'Todo created successfully!')
            setTodo({
                title: '',
                description: ''
            })
            modalOpen()
        }).catch(err=>{
            Message(false,'Something went wrong!')
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
                    <Modal.Title>Create Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control name='title' type="text" placeholder='Todo Title' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control name='description' as="textarea" placeholder='Write description here...' rows={3} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-start'>
                    <Button variant="dark" onClick={handleSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default TodoModal;