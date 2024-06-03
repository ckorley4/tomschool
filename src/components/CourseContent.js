import React from 'react'

const CourseContent = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen p-4">
      <div className="w-2/3 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Download the Starting Project
        </h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>Download the starting .zip files from this lesson.</li>
          <li>
            Unzip and open the project in PyCharm. PyCharm may prompt you to
            <span className="font-bold">
              {' '}
              create a new virtual environment{' '}
            </span>
            and install the dependencies listed in the
            <span className="font-bold"> requirements.txt</span>. Agree and
            click OK.
            <img
              src="/path/to/your/image.png"
              alt="PyCharm setup"
              className="my-2 border rounded"
            />
          </li>
          <li>
            (Troubleshooting) If you don't get prompted to set up a virtual
            environment, set one up manually by adding a new Python interpreter.
          </li>
        </ol>
      </div>
      <div className="w-1/3 p-4 ml-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-4">Course content</h3>
        <ul className="space-y-2">
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step1" />
              <label htmlFor="step1">Download the Starting Project</label>
            </div>
            <span className="text-gray-500 text-sm">1min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step2" />
              <label htmlFor="step2">Register New Users</label>
            </div>
            <span className="text-gray-500 text-sm">1min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step3" />
              <label htmlFor="step3">Downloading Files</label>
            </div>
            <span className="text-gray-500 text-sm">1min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step4" />
              <label htmlFor="step4">Encryption and Hashing</label>
            </div>
            <span className="text-gray-500 text-sm">15min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step5" />
              <label htmlFor="step5">How to Hack Passwords 101</label>
            </div>
            <span className="text-gray-500 text-sm">12min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step6" />
              <label htmlFor="step6">Salting Passwords</label>
            </div>
            <span className="text-gray-500 text-sm">7min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step7" />
              <label htmlFor="step7">
                Hashing and Salting Passwords using Werkzeug
              </label>
            </div>
            <span className="text-gray-500 text-sm">1min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step8" />
              <label htmlFor="step8">
                Authenticating Users with Flask-Login
              </label>
            </div>
            <span className="text-gray-500 text-sm">1min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step9" />
              <label htmlFor="step9">Flask Flash Messages</label>
            </div>
            <span className="text-gray-500 text-sm">1min</span>
          </li>
          <li>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="step10" />
              <label htmlFor="step10">
                Passing Authentication Status to Templates
              </label>
            </div>
            <span className="text-gray-500 text-sm">1min</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CourseContent
