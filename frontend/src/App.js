import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// Screens

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'

// Coomponents
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/'>
            <Redirect to='/signin' />
          </Route>
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/signin' component={LoginScreen} />
          <Route path='/signup' component={RegisterScreen} />
          <Route path='/forgotpassword' component={ForgotPasswordScreen} />
          <Route
            path='/resetpassword/:resetToken'
            component={ResetPasswordScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
