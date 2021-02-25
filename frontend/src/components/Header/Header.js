import React from 'react'
import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// Styles from React-Bootstrap
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Signout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  // Use selector to get redux state
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const history = useHistory()

  const signOutHandler = () => {
    dispatch(Signout())
    history.push('/signin')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>AUTH MERN BOILERPLATE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.username} id='name'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signOutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/signin'>
                  <Nav.Link>SIGN IN</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
