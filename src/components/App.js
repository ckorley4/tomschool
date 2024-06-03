import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import NavbarMain from './NavbarMain'
import CourseCard from './CourseCard'
import Register from './Register'
import SearchCourse from './SearchCourse'
import Home from './Home'
import Login from './Login'
import CourseDetail from './CourseDetail'
import Profile from './Profile'
import SignUp from './SignUp'
import Enrollment from './Enrollment'
import SuccessfulLogin from './SuccessfulLogin'
import UserAccount from './UserAccount'
import Logout from './Logout'
import AdminDashboard from './AdminDashboard' // Import AdminDashboard component

import { createContext, useContext } from 'react'
import CourseContent from './CourseContent'

export const Context = React.createContext()

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userId') || localStorage.getItem('username')
      ? true
      : false,
  )
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null)
  const [username, setUsername] = useState(
    localStorage.getItem('username') || '',
  )
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    // Syncing isLoggedIn state with localStorage
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true')
    } else {
      localStorage.removeItem('isLoggedIn')
    }
  }, [isLoggedIn])

  function handleCallbackResp(response) {
    console.log('Encoded JWT ID Token: ' + response.credentials)
  }

  const handleLogin = (userIdParam, usernameParam) => {
    setIsLoggedIn(true)
    setUserId(userIdParam)
    setUsername(usernameParam)
    localStorage.setItem('userId', userIdParam)
    localStorage.setItem('username', usernameParam)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserId(null)
    setUsername('')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('isLoggedIn')
  }

  const handleSignUp = (userIdParam, usernameParam) => {
    setIsLoggedIn(true)
    setUserId(userIdParam)
    setUsername(usernameParam)
    localStorage.setItem('userId', userIdParam)
    localStorage.setItem('username', usernameParam)
  }

  return (
    <>
      {
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/courses/:id" component={CourseDetail} />
            <Route exact path="/courses">
              <Context.Provider value={[searchText, setSearchText]}>
                <SearchCourse />
                <CourseCard />
              </Context.Provider>
            </Route>
            <Route exact path="/admin">
              <AdminDashboard />
              {/* Protect the admin route }
            <AdminDashboard />
            {/*isLoggedIn && isAdmin() ? <AdminDashboard /> : <Redirect to="/" />*/}
            </Route>
          </Switch>
        </Router>
      }
    </>
  )
}

export default App
