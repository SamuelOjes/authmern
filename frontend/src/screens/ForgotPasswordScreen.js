import React, { useState } from 'react'
import FormContainer from '../components/FormCotainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Forgotpassword } from '../actions/userActions'

const ForgotPasswordScreen = ({ location }) => {
  // @Desc Component Level State
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')

  const dispatch = useDispatch()

  const userForgotPassword = useSelector((state) => state.userForgotPassword)
  const { loading, error } = userForgotPassword

  // Redirect
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // UseEffect

  //  SubmitHandler Function
  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH FORGOTPASSWORD
    if (!email) {
      setMessage(`Email Doesn't Exist`)
    } else {
      dispatch(Forgotpassword(email))
      setSuccess('Reset Password Email Sent')
    }
  }
  return (
    <FormContainer>
      <h2>Forgot Password?</h2>
      {/* <p>Enter the email address associated with your account.</p> */}
      <p>A password reset link would be sent to your email.</p>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>{success}</Message>}
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

        <Button type='submit' variant='primary'>
          RECOVER PASSWORD
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

export default ForgotPasswordScreen
