import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormCotainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { Resetpassword } from '../actions/userActions'

const ResetPasswordScreen = ({ location, history }) => {
  // Component Level State
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

  // Dispatch
  const dispatch = useDispatch()
  const userResetPassword = useSelector((state) => state.userResetPassword)
  const { loading, error } = userResetPassword

  //   Redirect
  const redirect = location.search ? location.search.split('=')[1] : '/'

  //   useEffect
  //   useEffect(() => {
  //     if (userInfo) {
  //       history.push(redirect)
  //     }
  //   }, [history, userInfo, redirect])

  // submitHandler
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      setMessage('Passwords do not Match')
    } else {
      // Dispatch Reset Password
      dispatch(Resetpassword(password))
    }
  }
  return (
    <FormContainer>
      <h1>RESET PASSWORD</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
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
          RESET PASSWORD
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Member?{' '}
          <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
            Sign up
          </Link>
        </Col>
        <Col md={12}>
          Have an Account?{' '}
          <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
            Sign in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default ResetPasswordScreen
