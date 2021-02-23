import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormCotainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loading from '../components/Loading'

const ForgotPasswordScreen = ({ location, history }) => {
  // @Desc Component Level State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Redirect
  const redirect = location.search ? location.search.split('=')[1] : '/'

  //  Submit Function
  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <FormContainer>
      <h2>Forgot Password?</h2>
      <p>Enter the email address associated with your account.</p>
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
