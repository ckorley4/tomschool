import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    fetch(`/courses/${id}`)
      .then((resp) => resp.json())
      .then(setCourse)
  }, [id])

  const handleEnroll = () => {
    fetch('/enrollment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Enrollment successful:', data)
        alert('Enrollment successful!')
      })
      .catch((error) => {
        console.error('Error during enrollment:', error)
        alert('Enrollment failed.')
      })
  }

  if (!course) {
    return <div className="text-center mt-20">Loading...</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {course.title}
        </h1>
        <img
          src={course.image}
          alt={course.title}
          className="mb-6 rounded-lg"
        />
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {course.description}
        </p>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Category: <span className="font-normal">{course.category}</span>
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Instructor:{' '}
            <span className="font-normal">{course.instructor_id}</span>
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Venue: <span className="font-normal">{course.venue_id}</span>
          </p>
        </div>
        <button
          onClick={handleEnroll}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Enroll Now
        </button>
      </div>
    </div>
  )
}

export default CourseDetail
