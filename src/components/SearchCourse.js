import React, { useContext } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  Input,
  Button,
  Search,
  IconButton,
} from '@material-tailwind/react'
import { Context } from './App'

const SearchCourse = () => {
  const [searchText, setSearchText] = useContext(Context)
  const handleSearch = (e) => {
    setSearchText(() => e.target.value)
  }
  return (
    <div className="search h-40 w-200px min-w-200px">
      <div className="relative w-100px">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={handleSearch}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for courses..."
          required
        />
      </div>
    </div>
  )
}

export default SearchCourse
