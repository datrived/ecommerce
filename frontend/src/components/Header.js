import { Container, Navbar, Nav, Row, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/UserAction'
import { Link } from 'react-router-dom'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
              <Container fluid>
                
                  <Navbar.Brand as={Link} to="/">DevShop</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                      <Nav
                        className="mr-auto my-2 my-lg-0"
                          style={{ maxHeight: '100px' }}
                            navbarScroll
                      >
                      
                        <Nav.Link as={Link} to="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                         
                        {userInfo ? 
                        <NavDropdown title={userInfo.name} id="username">
                          <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown> : (
                              <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i>Login</Nav.Link>
                          )}
                        
                      
       
                       </Nav>
     
                  </Navbar.Collapse>
                </Container>
              </Navbar>
        </header>
    )
}

export default Header
