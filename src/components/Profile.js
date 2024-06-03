import React, { useEffect, useState } from 'react'

function Profile({ userId }) {
  const [list, setList] = useState([])
  useEffect(() => {
    fetch('/enrollments/student/1')
      .then((resp) => resp.json())
      .then((data) => setList(data))
  }, [])
  console.log(list)
  function handleDelete(e) {
    e.preventDefault()
    fetch('/courses/10', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(JSON.stringify(err)))
  }
  return (
    <div class="m-auto relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Coures Title
            </th>
            <th scope="col" class="px-6 py-3">
              Color
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              View
            </th>
            <th scope="col" class="px-6 py-3">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((courseItem) => (
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {courseItem.title}
              </th>
              <td class="px-6 py-4"></td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
              <td class="px-6 py-4" onClick={handleDelete}>
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Profile
