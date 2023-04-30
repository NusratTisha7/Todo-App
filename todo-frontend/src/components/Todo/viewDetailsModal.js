import { Modal } from 'react-bootstrap';

const TodoModal = ({ open, modalOpen, todo }) => {

    return (
        <div>
            <Modal show={open} className='mt-5'>
                <Modal.Header closeButton onClick={modalOpen}>
                    <Modal.Title>{todo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {todo.description}
                </Modal.Body>

            </Modal>
        </div>
    )
}
export default TodoModal;