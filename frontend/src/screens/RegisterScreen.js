import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loading from '../components/Loading'
import FormContainer from '../components/FormCotainer'
import { Signup } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  // Component Level State
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

  // Dispatch
  const dispatch = useDispatch()
  const userSignup = useSelector((state) => state.userSignup)
  const { loading, error, userInfo } = userSignup

  //   Redirect
  const redirect = location.search ? location.search.split('=')[1] : '/'

  //   useEffect
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  // submitHandler
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      setMessage('Passwords do not Match')
    } else {
      dispatch(Signup(email, username, password))
    }
  }

  return (
    <FormContainer>
      <h1>SIGN UP</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='username'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Your Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Your Password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          SIGN UP
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{'  '}
          <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
            Sign In
          </Link>
        </Col>
        <Col md={12}>
          <Link
            to={
              redirect
                ? `/forgotpassword?redirect=${redirect}`
                : '/forgotpassword'
            }
          >
            Forgot Password?{' '}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
