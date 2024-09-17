import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center -mt-28'>
        <div>
          <h1 className='text-4xl font-bold text-center my-8'>
            About
            <span className='ml-3'> Innovate&Develop</span>
          </h1>
          <div className='text-lg text-gray-600 flex flex-col gap-6'>
            <p>
              Welcome to Innovate&Inspire! This blog is designed to ignite creativity and drive innovation through insightful content on technology, development, and more. Our goal is to inspire thinkers and doers alike by sharing fresh perspectives and practical advice.
            </p>

            <p>
              Here, you'll find carefully crafted articles and tutorials focused on web development, software engineering, and the latest technology trends. We're passionate about continuous learning and growth, making Innovate&Inspire the perfect place for developers and tech enthusiasts.
            </p>

            <p>
              Join the conversation! Feel free to leave comments, like, and engage with others in the community. By collaborating and sharing knowledge, we can all contribute to a future where innovation thrives.
            </p>
            <p className='text-xl'>
              Plaese Have Fun!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default About