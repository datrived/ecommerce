import FormContainer from '../components/FormContainer'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/UserAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1]: '/'
 
    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        } 
    }, [userInfo, redirect, navigate])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1> Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label> 
                        Email Address
                    </Form.Label>
                    <Form.Control 
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
                       type="password"
                       placeholder="Enter Password"
                       onChange = {(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit" variant="primary" >Sign In</Button>

                <Row className="py-3">
                    <Col> 
                     New Customer? 
                     <Link to={redirect? `/register?redirect=${redirect}`: '/redirect'}>
                     Register
                     </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginPage
