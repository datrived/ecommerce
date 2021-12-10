import FormContainer from '../components/FormContainer'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/UserAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1]: '/'
 
    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        } 
    }, [userInfo, redirect, navigate])
    
    const submitHandler = (e) => {
        e.preventDefault()
        
        if(password != confirmPassword){
            setMessage("Password does not match with Confirm Password")
        } else {
            dispatch(register(name, email, password))
        }
        
    }

    return (
        <FormContainer>
            <h1> Register</h1>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label> 
                        Name
                    </Form.Label>
                    <Form.Control 
                       required
                       type="name"
                       placeholder="Enter Name"
                       onChange = {(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label> 
                        Email Address
                    </Form.Label>
                    <Form.Control 
                       required
                       type="email"
                       placeholder="Enter Email"
                       onChange = {(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label> 
                        Password
                    </Form.Label>
                    <Form.Control 
                       required
                       type="password"
                       placeholder="Enter Password"
                       onChange = {(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label> 
                        Confirm Password
                    </Form.Label>
                    <Form.Control 
                       required
                       type="password"
                       placeholder="Enter Confirm Password"
                       onChange = {(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <br/>
                <Button type="submit" variant="primary" >Register</Button>

                <Row className="py-3">
                    <Col> 
                     Have an Account? 
                     <Link to={redirect? `/login?redirect=${redirect}`: '/login'}>
                     Sign In
                     </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterPage
