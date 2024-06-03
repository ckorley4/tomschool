import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { GitHub, Google } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'

function NavbarMain() {
  const [user, setUser] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const history = useHistory()

  const handleGoogleLoginSuccess = async (response) => {
    const profile = response.profileObj
    try {
      const res = await axios.post(
        'http://localhost:5000/auth/google',
        profile,
        {
          withCredentials: true,
        },
      )
      console.log('Google Login Success:', res.data)
      setUser({ ...profile, provider: 'google' })
      history.push('/courses')
    } catch (error) {
      console.log('Google Login Failure:', error)
    }
  }

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Failure:', error)
  }

  const handleGitHubLoginSuccess = async (code) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/auth/github',
        { code },
        { withCredentials: true },
      )
      const profile = res.data
      console.log('GitHub Login Success:', profile)
      setUser({ ...profile, provider: 'github' })
      history.push('/courses')
    } catch (error) {
      console.log('GitHub Login Failure:', error)
    }
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleLogout = () => {
    setUser(null)
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    history.push('/home')
  }

  const handleProfileClick = () => {
    history.push('/profile')
    handleCloseUserMenu()
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleOpenUserMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={anchorElUser}
            keepMounted
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user ? user.name : 'Bonnie Green'}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user ? user.email : 'name@flowbite.com'}
              </span>
            </div>
            <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/courses"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Courses
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarMain
