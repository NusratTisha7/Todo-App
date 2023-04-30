import { Button, Modal } from 'react-bootstrap';
import { userInfo } from '../../utils/auth';
import { Message } from '../../utils/alert';
import { deleteTodo } from '../../Api/todo'
import { DeleteForeverRounded } from '@material-ui/icons';

const DeleteTodoModal = ({ open, modalOpen, item }) => {

    const todoDelete = () =>  {
        const { token } = userInfo()
        deleteTodo(token, item._id).then(res => {
            modalOpen()
        }).catch(err => {
            Message(false, 'Something went wrong!')
            modalOpen()
        })
    }
    return (
        <div>
            <Modal show={open} className='mt-5'>
                <Modal.Header closeButton onClick={modalOpen}>
                    <Modal.Title>Delete Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this todo?
                </Modal.Body>
                <Modal.Footer className='justify-content-start'>
                    <Button variant="dark" onClick={todoDelete}>
                        Yes
                    </Button>
                    <Button variant="dark" onClick={modalOpen}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default DeleteTodoModal;