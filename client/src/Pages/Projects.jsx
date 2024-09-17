import React from 'react'
import CallToAction from '../Components/CallToAction'

const Projects = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3 -mt-28'>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className='text-md text-gray-500'>Explore the World of Web Development: Craft Exciting and Interactive Projects While Mastering HTML, CSS, and JavaScript!</p>
      <CallToAction />
    </div>
  )
}

export default Projects