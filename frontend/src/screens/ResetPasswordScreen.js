import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormCotainer'
// import Loading from '../components/Loading'
import Message from '../components/Message'
import axios from 'axios'
// import { Resetpassword } from '../actions/userActions'

const ResetPasswordScreen = ({ location, match }) => {
  // Component Level State
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  //   Redirect
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // submitHandler
  const submitHandler = async (e) => {
    e.preventDefault()

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    }

    if (password !== passwordConfirm) {
      setPassword('')
      setPasswordConfirm('')
      setTimeout(() => {
        setError('')
      }, 5000)
      return setError("Passwords don't match")
    }

    try {
      const { data } = await axios.put(
        `/api/v1/auth/resetpassword/${match.params.resettoken}`,
        {
          password,
        },
        config
      )

      setSuccess('Password Reset Successful')
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => {
        setError('')
      }, 5000)
      return setError('Password Reset Unsuccessful')
    }
  }
  return (
    <FormContainer>
      <h1>RESET PASSWORD</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {success && (
        <Message variant='success'>
          {success}{' '}
          <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
            Sign in
          </Link>
        </Message>
      )}
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
