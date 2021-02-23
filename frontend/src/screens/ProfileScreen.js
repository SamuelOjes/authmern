import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
  // Component Level State
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')

  // Dispatch
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  //   useEffect
  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else {
      if (!user.username) {
        dispatch(getUserDetails('profile'))
      } else {
        setUsername(user.username)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  // submitHandler
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      setMessage('Passwords do not Match')
    } else {
      //   Dispatch Update Profile
      dispatch(updateUserProfile({ id: user._id, username, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='username'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Your Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            UPDATE
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h1>My Requests</h1>
      </Col>
    </Row>
  )
}

export default ProfileScreen
