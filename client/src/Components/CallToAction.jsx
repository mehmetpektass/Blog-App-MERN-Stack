import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-300 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center max-w-3xl mx-auto mb-8'>
    <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
            Want to learn more about the projects?
        </h2>
        <p className='text-gray-500 my-2'>
            Checkout these resources with my projects
        </p>
        <Button gradientDuoTone='cyanToBlue' className='rounded-tl-xl rounded-bl-none' outline>
            <a href="https://github.com/mehmetpektass" target='_blank' rel='noopener noreferrer'>
                For More Projects
            </a>
        </Button>
    </div>
    <div className="ml-10 p-7 flex-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrFu1VJGAtWReroeGyo5bxb5L0zD9rI2HtoA&s" />
    </div>
</div>
  )
}

export default CallToAction