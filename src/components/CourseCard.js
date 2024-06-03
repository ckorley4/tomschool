import React, { useContext, useEffect, useState } from 'react'
import SingleCard from './SingleCard'
import { Context } from './App'

const CourseCard = () => {
  const [courseList, setCourseList] = useState([])
  const [searchText, setSearchText] = useContext(Context)
  const [filteredResults, setFilteredResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 30

  useEffect(() => {
    fetch('/courses')
      .then((resp) => resp.json())
      .then((data) => {
        setCourseList(data)
        setFilteredResults(data) // Initialize filtered results with full course list
      })
  }, [])

  useEffect(() => {
    const newList = courseList.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    setFilteredResults(newList)
    setCurrentPage(1) // Reset to first page when search text changes
  }, [searchText, courseList])

  // Calculate the current items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((courseItem) => (
              <SingleCard
                key={courseItem.id}
                image={courseItem.image}
                CardTitle={courseItem.title}
                CardDescription={courseItem.description}
                Button="Enroll"
                titleHref={courseItem.title}
                btnHref={`/courses/${courseItem.id}`}
                recID={courseItem.id}
              />
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .page-button {
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          padding: 5px 10px;
          margin: 0 5px;
          cursor: pointer;
        }
        .page-button.active {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </>
  )
}

export default CourseCard
