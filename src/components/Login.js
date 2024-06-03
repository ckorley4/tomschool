import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory, Redirect } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

const Login = ({ onLogin, isLoggedIn }) => {
  const history = useHistory()
  const clientId =
    '759186532719-mc213ffg5qpj54u772nm108cibbcku4s.apps.googleusercontent.com'
  const onSuccess = (resp) => {
    console.log(resp)
  }
  const validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email is required'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }
    return errors
  }
  const onFailure = (resp) => {
    console.log('Login Failed', resp)
  }

  if (isLoggedIn) {
    // Inside the handleLogin function
  }

  return (
    <div className="login-container">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse)
        }}
        onError={() => {
          console.log('Login Failed')
        }}
        useOneTap
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Login
