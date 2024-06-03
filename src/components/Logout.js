import React from 'react'
import { GoogleLogout } from 'react-google-login'

function Logout() {
  const clientId =
    '24506488688-5g6uemi5j7tvt4q90uoi3qprvd56bs5s.apps.googleusercontent.com'
  const onSuccess = (resp) => {
    console.log('Logout Sucess', resp)
  }

  return (
    <div id="signInButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout
