import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'

function Completion(props) {
  const navigate=useNavigate()

  setTimeout(()=>{
    navigate("/")
  },6000)
  const { width, height } = useWindowSize()
  return (
    <>
      <h1 className='text-4xl w-screen h-screen text-center pt-52   '>Thank you! 🎉</h1> 
      <Confetti
        width={width}
        height={height}
      />
    </>
  )
}

export default Completion
