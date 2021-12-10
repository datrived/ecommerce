import FormContainer from '../components/FormContainer'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail, updateUserProfile } from '../actions/UserAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/UserConstants'

function ProfilePage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)

    const { loading, error, user} = userDetail

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const { success} = userUpdateProfile



    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetail('profile'))
                
            } else {
                
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, navigate, dispatch, user, success])
    
    const submitHandler = (e) => {
        e.preventDefault()
        
        if(password != confirmPassword){
            setMessage("Password does not match with Confirm Password")
        } else {
            dispatch(updateUserProfile(user.id, name, email, password))
            setMessage("")
        }
        
    }
    return (
        <Row>
            <Col md={3}>
            <h1> My Profile</h1>
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
                       value={name}
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
                       value={email}
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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label> 
                        Confirm Password
                    </Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Enter Confirm Password"
                       onChange = {(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <br/>
                <Button type="submit" variant="primary" >Update</Button>
                </Form>
            </Col>

            <Col md={9}>
               <h1> My Orders</h1>
            </Col>
            
        </Row>
    )
}

export default ProfilePage
