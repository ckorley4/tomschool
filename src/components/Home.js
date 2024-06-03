import '../index.css'
import React, { useState, useEffect } from 'react'
import SignUpSignIn from './SignUpSignIn'

import b1 from '../backgrounds/Background1.png'
import b2 from '../backgrounds/Background2.png'
import b3 from '../backgrounds/Background3.png'
import b4 from '../backgrounds/Background4.png'
import b5 from '../backgrounds/Background5.png'
import b6 from '../backgrounds/Background6.png'
import b7 from '../backgrounds/Background7.png'
import b8 from '../backgrounds/Background8.png'
import b9 from '../backgrounds/Background9.png'
import b10 from '../backgrounds/Background10.png'

const images = [b1, b2, b3, b4, b5, b6, b7, b8, b10]

function Home() {
  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(images[Math.floor(Math.random() * images.length)])
    }, 8000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="home">
      <div
        style={{
          backgroundImage: `url(${currentImage})`,
          objectFit: 'cover',
          width: '40vw',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div>
        <SignUpSignIn />
      </div>
    </div>
  )
}

export default Home
