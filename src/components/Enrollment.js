import React, { useState } from 'react'

function Enrollment(recID) {
  const [courseDetails, setCourseDetails] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0)

  const handleCardClick = async () => {
    try {
      const response = await fetch('enrollments/3')
        .then((resp) => resp.json())
        .then((data) => console.log(data))
      if (!response.ok) {
        throw new Error('Failed to fetch course details')
      }
      const details = await response.json()
      setCourseDetails(details)
      setIsModalOpen(true)
      //me
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return <div> This is my Modal</div>
}

export default Enrollment
