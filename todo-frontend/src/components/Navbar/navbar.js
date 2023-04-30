import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { signout, userInfo, isAuthenticated } from '../../utils/auth'
import { withRouter } from 'react-router-dom'

function Navabr({ history }) {
    //const { name } = userInfo()
    let uName=''
    if(isAuthenticated()){
        const { name } = userInfo()
        uName=name
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">Todo App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {isAuthenticated() ?
                        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                            <Nav style={{ marginRight: "20px" }}>
                                <NavDropdown title={uName} id="collasible-nav-dropdown" >
                                    <NavDropdown.Item href="#action/3.1" onClick={() => {
                                        signout(() => {
                                            history.push('/')
                                        })
                                    }}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse> : ''
                    }

                </Container>
            </Navbar>
        </div>
    );
}

export default withRouter(Navabr);