import React, { useState, useEffect } from 'react'

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('Enrollment')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newItem, setNewItem] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let endpoint = ''

      switch (selectedCategory) {
        case 'Enrollment':
          endpoint = '/enrollments'
          break
        case 'Student':
          endpoint = '/students'
          break
        case 'Courses':
          endpoint = '/courses'
          break
        default:
          break
      }

      try {
        const response = await fetch(endpoint)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory])

  const handleAddNew = () => {
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/${selectedCategory}/${id}`, {
        method: 'DELETE',
      })

      setData(data.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/${selectedCategory}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
      const result = await response.json()
      setData([...data, result])
      setShowModal(false)
    } catch (error) {
      console.error('Error adding new item:', error)
    }
  }

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li
            className={`cursor-pointer mb-2 p-2 ${
              selectedCategory === 'Enrollment' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setSelectedCategory('Enrollment')}
          >
            Enrollment
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 ${
              selectedCategory === 'Student' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setSelectedCategory('Student')}
          >
            Student
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 ${
              selectedCategory === 'Courses' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setSelectedCategory('Courses')}
          >
            Courses
          </li>
        </ul>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full absolute top-4 right-4"
          onClick={handleAddNew}
        >
          Add New
        </button>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : data ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-2">
                      {key}
                    </th>
                  ))}
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, i) => (
                      <td key={i} className="border px-4 py-2">
                        {value}
                      </td>
                    ))}
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded shadow-lg p-8 w-1/2">
              <h2 className="text-2xl mb-4">Add New {selectedCategory}</h2>
              <form onSubmit={handleSubmit}>
                {Object.keys(data[0]).map((key, index) => (
                  <div className="mb-4" key={index}>
                    <label className="block mb-1" htmlFor={key}>
                      {key}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      className="border rounded px-4 py-2 w-full"
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
