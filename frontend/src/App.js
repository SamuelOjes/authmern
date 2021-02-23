import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Screens
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'

// Coomponents
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/signin' component={LoginScreen} />
          <Route path='/signup' component={RegisterScreen} />
          <Route path='/forgotpassword' component={ForgotPasswordScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
