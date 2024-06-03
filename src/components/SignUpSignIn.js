import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import GoogleLogin from 'react-google-login'
import GitHubLogin from 'react-github-login'
import { LinkedIn } from 'react-linkedin-login-oauth2'
import '../index.css'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
})

const SignUpSignIn = () => {
  const history = useHistory()
  const [isSignUp, setIsSignUp] = useState(true)
  const googleClientId =
    '759186532719-mc213ffg5qpj54u772nm108cibbcku4s.apps.googleusercontent.com'
  const githubClientId = 'Ov23liI8zvyd2KimM2IE'

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values', values)
      // Add your form submission logic here
      // On successful form submission, navigate to /courses
      history.push('/courses')
    },
  })

  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response)
    history.push('/courses')
    // Handle Google login success, e.g., send the response to your server
  }
  const handleGoogleFailure = (response) => {
    console.log('Google login failed: ', response)

    // Handle Google login success, e.g., send the response to your server
  }
  const handleGitHubSuccess = (response) => {
    console.log('GitHub login successful:', response)
    fetch('/github/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: response.code }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User data:', data)
        history.push('/courses')
      })
      .catch((error) => console.error('Error:', error))
  }
  const handleGitHubFailure = (response) => {
    console.log('GitHub login failed :', response)
  }
  const handleLinkedInSuccess = (code) => {
    console.log('LinkedIn login successful:', code)
    history.push('/courses')
    // Handle LinkedIn login success, e.g., exchange the code for an access token
  }

  const handleLinkedInFailure = (error) => {
    console.log('LinkedIn login failed:', error)
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>

        <div className="social-login-buttons">
          <div>
            <GoogleLogin
              clientId={googleClientId}
              buttonText="Continue with Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={'single_host_origin'}
              className="mb-3 flex w-full items-center justify-center rounded bg-danger px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
              style={{ backgroundColor: '#db4437' }}
            />

            <GitHubLogin
              clientId={githubClientId}
              onSuccess={handleGitHubSuccess}
              onFailure={(response) =>
                console.error('GitHub login failed:', response)
              }
              redirectUri="/"
              buttonText="Continue with GitHub"
              className="mb-3 flex w-full items-center justify-center rounded bg-dark px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
              style={{ backgroundColor: '#333' }}
            />

            <a
              className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
              style={{ backgroundColor: '#3b5998' }}
              href="#!"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              Continue with Facebook
            </a>

            <a
              className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
              style={{ backgroundColor: '#55acee' }}
              href="#!"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              Continue with Twitter
            </a>
          </div>
        </div>

        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}

export default SignUpSignIn
